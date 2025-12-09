export interface UserProfile {
    userId: number;
    username: string;
    email: string;
    bio: string | null;
    work: string | null;
    education: string | null;
    city: string | null;
    profilePicture: string | null;
    skills: string | null;
    blogsNumber: number;
    likesNumber: number;
    followers: number;
    createdAt: string | null;
    webSite: string;
    categoryFollows: number;
    usersFollowers: number[];
}

export interface UserInfoCard {
    userId: number;
    username: string;
    profilePicture: string;
    city: string;
    blogsByUser: number;
    followers: number;
    following: number;
    usersFollowers: number[];
}

export interface UserUpdateInfoRequest {
    name: string;
    lastName: string;
    work: string;
    education: string;
    pronouns: string;
    website: string;
    address: string;
    city: string;
    skills: string;
    bio: string;
    blogImage?: File;
}

export interface UserUpdateInfoI {
    name: string;
    lastName: string;
    work: string;
    education: string;
    pronouns: string;
    website: string;
    address: string;
    city: string;
    skills: string;
    bio: string;
    profilePicture: string;
}

export interface UserSimpleInfoI {
    userId: number;
    username: string;
    email: string;
    profilePicture: string;
    createdAt: string;
}

export interface UserTop {
    userId: number;
    name: string;
    profilePicture: string;
    blogsCounts: number
}

export interface UserFullEngagementDTO {
    blogCount: number;
    likesCount: number;
    readBlogsCount: number;
    commentCount: number;
    followingUserCount: number;
    followersUserCount: number;
    followingCategoryCount: number;
}

export interface UserCardI {
    userId: number;
    username: string;
    city?: string;
    followers: number;
    following: number;
    usersFollowers?: number[];
    joinedDate: string;
    profilePicture?: string;
    blogsByUser: number;
}

export interface NotificationReceivedI {
    content: string;
    createdAt: string;
    delivered: boolean;
    notificationId: number;
    notificationType: string;
    notificationUserInfo: NotificationUserInfoI;
    read: boolean;
    userFromId: number
    userToId: number;
}

export interface NotificationUserInfoI {
    profileImage: string;
    userId: number;
    username: string;
}