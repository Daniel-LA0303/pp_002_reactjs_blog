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
}