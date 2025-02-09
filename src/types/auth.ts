

export interface AuthLoginRequestI {
    email: string;
    password: string;
}

export interface AuthLoginResponseI {
    accessToken: string | null;
    tokenType: string | null;
}

export interface AuthUserSessionI {
    id: number;
    username: string;
    role: string;
}