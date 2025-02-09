

export interface AuthLoginRequestI {
    email: string;
    password: string;
}

export interface AuthTokenInfoI {
    accessToken: string | null;
    tokenType: string | null;
}

export interface AuthLoginResponseI {
    userId: number;
    username: string;
    email: string;
    tokenInfo: AuthTokenInfoI;
}

export interface AuthUserSessionI {
    id: number;
    username: string;
    role: string;
}