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
}

export interface UserInfoCard{
    userId: number;
    username: string;
    profilePicture: string; 
    city: string;
    blogsByUser: number;
    followers: number;
    following: number;
}


export interface UserUpdateInfoRequest{
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
}

export interface UserUpdateInfoI{
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
}

export interface UserSimpleInfoI{
    userId: number;
    username: string;
    email: string;
    profilePicture: string;
    createdAt: string;
}

export interface UserTop{
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
