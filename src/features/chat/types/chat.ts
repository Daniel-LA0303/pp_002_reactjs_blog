

export interface ChatUserInfo {
    chatId: string;
    lastMessage: string;
    lastMessageTime: string;
    name: string;
    receiverId: number;
    senderId: number;
    recipientOnline: boolean;
    unreadCount: number
}