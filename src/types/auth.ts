

export interface AuthLoginRequestI {
    email: string;
    password: string;
}

export interface AuthTokenInfoI {
    accessToken: string | null;
    tokenType: string | null;
}

export interface AuthSuccessResponseI {
    userId: number;
    username: string;
    email: string;
    tokenInfo: AuthTokenInfoI;
    password: string; // <-- this should be removed but resolve a warning in login
}

export interface AuthUserSessionI {
    id: number;
    username: string;
    role: string;
}

export interface SignUpRequestI {
    username: string;
    email: string;
    password: string;
}
