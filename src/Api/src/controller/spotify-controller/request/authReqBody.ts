export type AuthReqBody = {
    grant_type: string,  
    redirect_uri?: string,
    code?: string,
    refresh_token?: string,
}