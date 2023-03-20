interface IspotifyAuthHandler {
    abstract async getUserToken(): Promise<string>;
    abstract async getUserTokenFromRefreshToken(): Promise<string>;
}