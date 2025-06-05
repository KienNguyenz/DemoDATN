export interface AuthResponse {
    accessToken(arg0: string, accessToken: any): unknown;
    refreshToken(arg0: string, refreshToken: any): unknown;
    accountInfo(accountInfo: any): unknown;
    token: string;
    isSuccess: true;
    message: string;
}
