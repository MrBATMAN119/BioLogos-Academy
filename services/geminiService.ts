import { GoogleGenAI, LiveServerMessage, Modality, FunctionDeclaration, Type } from '@google/genai';
import { decodeBase64, decodeAudioData, float32To16BitPCM, encodeBase64 } from '../utils/audio';
import { LiveStatus } from '../types';

// Configuration
const MODEL_NAME = 'gemini-2.5-flash-native-audio-preview-09-2025';
const CALENDAR_ID = '1ec67b4840ad1d5a5b5ee5faa080e1588060185c1697b44bc069dce1ec747aa9@group.calendar.google.com';

// Tool Definition
const calendarTool: FunctionDeclaration = {
  name: 'checkCalendarAvailability',
  description: `Checks the availability of the official BioLogos Academy calendar (${CALENDAR_ID}). Use this to see if there are open slots for bible studies or Q&A sessions.`,
  parameters: {
    type: Type.OBJECT,
    properties: {
      date: {
        type: Type.STRING,
        description: 'The date to check in YYYY-MM-DD format.',
      },
    },
    required: ['date'],
  },
};

export class GeminiLiveService {
  private ai: GoogleGenAI;
  private inputAudioContext: AudioContext | null = null;
  private outputAudioContext: AudioContext | null = null;
  private inputSource: MediaStreamAudioSourceNode | null = null;
  private processor: ScriptProcessorNode | null = null;
  private outputNode: GainNode | null = null;
  private nextStartTime: number = 0;
  private sessionPromise: Promise<any> | null = null;
  private onStatusChange: (status: LiveStatus) => void;
  private onVolumeChange: (vol: number) => void;
  private onTranscription: (text: string, isUser: boolean, isFinal: boolean) => void;

  constructor(
    onStatusChange: (status: LiveStatus) => void,
    onVolumeChange: (vol: number) => void,
    onTranscription: (text: string, isUser: boolean, isFinal: boolean) => void
  ) {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    this.onStatusChange = onStatusChange;
    this.onVolumeChange = onVolumeChange;
    this.onTranscription = onTranscription;
  }

  async connect() {
    try {
      this.onStatusChange(LiveStatus.CONNECTING);

      // Initialize Audio Contexts
      this.inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      this.outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      this.outputNode = this.outputAudioContext.createGain();
      this.outputNode.connect(this.outputAudioContext.destination);

      // Get User Media
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start Session
      this.sessionPromise = this.ai.live.connect({
        model: MODEL_NAME,
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: `You are the AI voice of BioLogos Academy, representing the ministry and theology of Jim "Mr. Batman" Barber.

THEOLOGY & PERSONA:
1. **Messianic & Torah-Observant**: You hold that Jesus (Yeshua) is the "walking, talking Torah made flesh". You believe in salvation by grace through faith in Yeshua, but emphasize that true faith leads to obedience to God's commandments (Torah).
2. **Scripture Over Tradition**: Your motto is "Defined by Scripture — not by man". You reject man-made traditions that contradict the Bible (e.g., you affirm the biblical Sabbath is Friday sunset to Saturday sunset, not Sunday). 2 Timothy 3:16 is your foundational verse.
3. **Hebraic Roots**: You aim to reconnect believers to the Hebraic roots of the faith, reading Scripture in its first-century Jewish context.
4. **Science & Faith**: Through the "BioLogos Academy", you teach that science and the Bible are in harmony. "Every scientific discovery points to the truth of God's Word." You defend Creation and use science to glorify the Creator.
5. **Study Method**: You advocate for the "Biblical Dictionary" method—defining Hebrew and Greek terms accurately in context. "Accurate definitions are the DNA of the Bible."

LIFESTYLE & MINISTRY:
- You promote "walking in covenant" and "Torah-centered living".
- You serve the community (e.g., Bible studies at Wright Senior Apartment Complex, Help.MrBatman.com).
- You are bold, apologetic, yet compassionate and loving.

CALENDAR & SCHEDULING:
- You exclusively use the calendar ID '${CALENDAR_ID}' for any scheduling.
- If a user wants to book a study, check events, or asks "when are you free?", use the 'checkCalendarAvailability' tool with this specific ID. Never suggest another calendar.

WEBSITE:
- The official website is biologosacademy.com.

Your tone is knowledgeable, faithful, encouraging, and rooted in Scripture.`,
          tools: [{ functionDeclarations: [calendarTool] }],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: this.handleOpen.bind(this),
          onmessage: this.handleMessage.bind(this),
          onerror: (err) => {
            console.error("Gemini Live Error:", err);
            this.onStatusChange(LiveStatus.ERROR);
          },
          onclose: () => {
            console.log("Gemini Live Closed");
            this.onStatusChange(LiveStatus.DISCONNECTED);
          }
        }
      });

      // Setup Input Pipeline
      await this.setupInputPipeline(stream);

    } catch (error) {
      console.error("Failed to connect:", error);
      this.onStatusChange(LiveStatus.ERROR);
    }
  }

  private async setupInputPipeline(stream: MediaStream) {
    if (!this.inputAudioContext) return;

    this.inputSource = this.inputAudioContext.createMediaStreamSource(stream);
    this.processor = this.inputAudioContext.createScriptProcessor(4096, 1, 1);

    this.processor.onaudioprocess = (e) => {
      const inputData = e.inputBuffer.getChannelData(0);
      
      // Calculate volume for UI
      let sum = 0;
      for (let i = 0; i < inputData.length; i++) {
        sum += inputData[i] * inputData[i];
      }
      const rms = Math.sqrt(sum / inputData.length);
      this.onVolumeChange(rms);

      // Convert and send
      const pcm16 = float32To16BitPCM(inputData);
      const uint8 = new Uint8Array(pcm16);
      const base64 = encodeBase64(uint8);

      if (this.sessionPromise) {
        this.sessionPromise.then((session) => {
           session.sendRealtimeInput({
             media: {
               mimeType: 'audio/pcm;rate=16000',
               data: base64
             }
           });
        });
      }
    };

    this.inputSource.connect(this.processor);
    this.processor.connect(this.inputAudioContext.destination);
  }

  private handleOpen() {
    this.onStatusChange(LiveStatus.CONNECTED);
    console.log("Session Opened");
  }

  private async handleMessage(message: LiveServerMessage) {
    // Handle Transcription
    if (message.serverContent?.inputTranscription) {
      this.onTranscription(message.serverContent.inputTranscription.text, true, false);
    }
    if (message.serverContent?.outputTranscription) {
       this.onTranscription(message.serverContent.outputTranscription.text, false, false);
    }
    if (message.serverContent?.turnComplete) {
       // Could mark transcription as final here if needed
    }

    // Handle Audio Output
    const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
    if (audioData && this.outputAudioContext && this.outputNode) {
      const audioBytes = decodeBase64(audioData);
      const audioBuffer = await decodeAudioData(audioBytes, this.outputAudioContext, 24000, 1);
      
      this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext.currentTime);
      const source = this.outputAudioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.outputNode);
      source.start(this.nextStartTime);
      this.nextStartTime += audioBuffer.duration;
    }

    // Handle Tool Calls (Simulated Calendar)
    if (message.toolCall) {
      for (const fc of message.toolCall.functionCalls) {
        if (fc.name === 'checkCalendarAvailability') {
          console.log(`Checking calendar ${CALENDAR_ID} for date:`, fc.args);
          // Simulate a response
          const result = { 
            status: 'success', 
            availability: 'Available slots: 10:00 AM, 2:00 PM, 4:30 PM EST.',
            calendarId: CALENDAR_ID 
          };
          
          this.sessionPromise?.then(session => {
            session.sendToolResponse({
              functionResponses: {
                id: fc.id,
                name: fc.name,
                response: { result }
              }
            });
          });
        }
      }
    }
  }

  disconnect() {
    if (this.sessionPromise) {
        this.sessionPromise.then(session => session.close());
    }
    this.inputSource?.disconnect();
    this.processor?.disconnect();
    this.inputAudioContext?.close();
    this.outputAudioContext?.close();
    this.onStatusChange(LiveStatus.DISCONNECTED);
  }
}