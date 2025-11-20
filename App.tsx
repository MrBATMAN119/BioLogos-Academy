import React, { useState, useEffect, useRef } from 'react';
import { LiveStatus } from './types';
import { GeminiLiveService } from './services/geminiService';
import Visualizer from './components/Visualizer';
import Transcript from './components/Transcript';
import { Mic, MicOff, Radio } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<LiveStatus>(LiveStatus.DISCONNECTED);
  const [volume, setVolume] = useState<number>(0);
  const [transcription, setTranscription] = useState<{text: string, source: 'User' | 'BioLogos AI'} | null>(null);
  const serviceRef = useRef<GeminiLiveService | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  useEffect(() => {
    // Check for API key implicitly by attempting to instantiate the service later
    // In a real scenario, we rely on process.env.API_KEY.
    if (process.env.API_KEY) {
      setHasApiKey(true);
    }
  }, []);

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
  };

  const handleTranscription = (text: string, isUser: boolean, isFinal: boolean) => {
    setTranscription({
      text,
      source: isUser ? 'User' : 'BioLogos AI'
    });
  };

  const toggleConnection = async () => {
    if (status === LiveStatus.CONNECTED || status === LiveStatus.CONNECTING) {
      serviceRef.current?.disconnect();
      serviceRef.current = null;
      return;
    }

    const service = new GeminiLiveService(
      setStatus,
      handleVolumeChange,
      handleTranscription
    );
    serviceRef.current = service;
    await service.connect();
  };

  return (
    <div className="min-h-screen bg-bio-dark text-bio-parchment font-sans selection:bg-bio-gold selection:text-bio-dark flex flex-col overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-20">
         <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-bio-accent blur-[100px] animate-pulse-slow"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-bio-gold blur-[120px]"></div>
      </div>

      {/* Header */}
      <header className="w-full p-6 z-10 flex justify-between items-center border-b border-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bio-gold to-bio-accent flex items-center justify-center shadow-lg shadow-bio-gold/20">
            <Radio className="text-bio-dark w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-serif font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-bio-gold to-bio-parchment">
              BIO LOGOS ACADEMY
            </h1>
            <p className="text-[10px] text-bio-accent tracking-widest uppercase opacity-80">
              biologosacademy.com
            </p>
          </div>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
          status === LiveStatus.CONNECTED 
            ? 'border-green-500/50 text-green-400 bg-green-900/20' 
            : status === LiveStatus.CONNECTING
            ? 'border-yellow-500/50 text-yellow-400 bg-yellow-900/20'
            : 'border-red-500/50 text-red-400 bg-red-900/20'
        }`}>
          <span className={`w-2 h-2 rounded-full ${
             status === LiveStatus.CONNECTED ? 'bg-green-400 animate-pulse' : 
             status === LiveStatus.CONNECTING ? 'bg-yellow-400 animate-bounce' : 'bg-red-400'
          }`}></span>
          {status}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center z-10 px-4 py-8 relative">
        
        {/* Visualizer Area */}
        <div className="w-full max-w-3xl mb-8 min-h-[300px] flex flex-col items-center justify-center">
           {status === LiveStatus.DISCONNECTED ? (
             <div className="text-center space-y-6 max-w-lg animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-serif text-bio-parchment mb-2">
                  First Century Perspective
                </h2>
                <p className="text-lg text-gray-400 font-light">
                  Explore science, apologetics, and scripture through conversation with BioLogos Academy.
                </p>
             </div>
           ) : (
             <Visualizer isActive={status === LiveStatus.CONNECTED} volume={volume} />
           )}
        </div>

        {/* Dynamic Transcript */}
        <div className="w-full h-32 flex items-center justify-center mb-8">
          {transcription ? (
            <Transcript text={transcription.text} source={transcription.source} />
          ) : status === LiveStatus.CONNECTED ? (
             <p className="text-gray-500 italic animate-pulse">Listening...</p>
          ) : null}
        </div>
        
        {/* Controls */}
        <div className="mt-auto pb-12">
          <button
            onClick={toggleConnection}
            disabled={status === LiveStatus.CONNECTING || !hasApiKey}
            className={`
              relative group px-8 py-4 rounded-full flex items-center gap-4 
              transition-all duration-300 transform hover:scale-105 active:scale-95
              shadow-[0_0_40px_-10px_rgba(251,191,36,0.3)]
              ${status === LiveStatus.CONNECTED 
                ? 'bg-red-500/10 border border-red-500/50 hover:bg-red-500/20' 
                : 'bg-white/5 border border-bio-gold/30 hover:border-bio-gold hover:bg-white/10'
              }
            `}
          >
            <div className={`p-3 rounded-full ${
              status === LiveStatus.CONNECTED ? 'bg-red-500 text-white' : 'bg-bio-gold text-bio-dark'
            }`}>
              {status === LiveStatus.CONNECTED ? <MicOff size={24} /> : <Mic size={24} />}
            </div>
            <div className="text-left">
              <span className="block text-xs uppercase tracking-widest opacity-60">
                {status === LiveStatus.CONNECTED ? 'End Session' : 'Start Conversation'}
              </span>
              <span className={`font-serif text-lg ${status === LiveStatus.CONNECTED ? 'text-red-200' : 'text-bio-parchment'}`}>
                {status === LiveStatus.CONNECTED ? 'Disconnect' : 'Speak Now'}
              </span>
            </div>
          </button>
          
          {!hasApiKey && (
            <p className="text-red-400 mt-4 text-sm text-center">
              API Key missing in environment variables.
            </p>
          )}
        </div>

        {/* Calendar ID Info (Subtle) */}
        <div className="absolute bottom-2 right-4 text-[10px] text-gray-600 font-mono">
          Cal ID: 1ec6...7aa9
        </div>
      </main>
    </div>
  );
};

export default App;