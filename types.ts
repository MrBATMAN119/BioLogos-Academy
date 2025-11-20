export enum LiveStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR'
}

export interface AudioVolume {
  input: number;
  output: number;
}

export interface LogMessage {
  role: 'user' | 'system' | 'assistant';
  text: string;
  timestamp: Date;
}
