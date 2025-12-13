

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

export interface UserSearchChatDTO {
    userId: number;
    username: string;
    profileImage: string;
}