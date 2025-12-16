// messages
export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO'
}

export enum MessageState {
  SENT = 'SENT',
  SEEN = 'SEEN'
}

export interface MessageResponseDTO {
  id: number;
  content: string;
  type: MessageType;
  state: MessageState;
  senderId: number;
  receiverId: number;
  createdAt: string;
  media: Uint8Array | null;
}

export interface MessageRequestDTO {
  content: string;
  senderId: number;
  receiverId: number;
  type: MessageType;
  chatId: string;
}