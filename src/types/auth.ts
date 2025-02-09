

export interface AuthLoginRequestI {
    email: string;
    password: string;
}

export interface AuthLoginResponseI {
    accessToken: string | null;
    tokenType: string | null;
}