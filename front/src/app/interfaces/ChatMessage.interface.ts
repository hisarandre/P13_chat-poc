export enum MessageType {
  CHAT = 'CHAT',
  JOIN = 'JOIN',
  LEAVE = 'LEAVE'
}

export interface ChatMessage {
  id?: string;
  sender: string | null;
  content: string;
  type: MessageType;
  timestamp?: Date;
}
