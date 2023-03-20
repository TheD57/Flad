import axios, { AxiosError, AxiosResponse } from "axios";

export type Methods = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export interface FetchOptions {
    /** The headers that will be applied to the request when sent. */
    headers?: Record<string, string>;
    /** The type of HTTP method being used. */
    method?: Methods;
    /** Parameters used for search queries.*/
    params?: Record<string, any>;
    /**If present, this refers to the JSON data that will be included in the request body. */
    body?: Record<string, string | boolean | number | (string | boolean | number)[]>;
}

export class RequestHandler {
    private _version: `v${number}` = 'v1';
    private count = 0;
    // private token: string;
    
    get version(): string {
        return this._version;
    }
    public async spotifyFetch(url: string, options: FetchOptions = {}, token: string): Promise<AxiosResponse<any, any>> {
        console.log(options + "sds=============");
        try {
            const resp = await axios({
                url: `https://api.spotify.com/${this.version}${url}`,
                method: options.method || 'GET',
                params: options.params,
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: 'application/json',
                    ...options.headers
                },
                data: options.body
            });
        return resp;
        }
        catch(error : any){
            const errorMessage = error.response.data?.error?.message;
            if (errorMessage === "Invalid access token" || errorMessage === "The access token expired") {
                // if (this.refrechData) {
                //     await this.refreshToken();
                //     this.count+=1;
                //     if (this.count >= 4){
                //         throw new Error;
                //     }
                //     return this.spotifyFetch(url, options,token);
                //   }
                throw new Error;
            }
            else{
                throw new Error;
            }
        }
    }

    // public async refreshFromMeta() {
    //     if ('refreshToken' in this.refreshMeta!) {
    //         this.auth.getUserToken(this.refreshMeta as GetUserTokenOptions)
    //             .then(context => {
    //                 this.token = context.accessToken;
    //                 if (context.refreshToken) this.refreshMeta!.refreshToken = context.refreshToken;

    //                 new UserClient(this).patchInfo().then(x => {
    //                     this.user = x;
    //                     this.onRefresh();
    //                 });
    //             });
    //     } else {
    //         this.auth.getApiToken(this.refreshMeta!.clientID, this.refreshMeta!.clientSecret)
    //             .then(token => {
    //                 this.token = token;
    //                 this.onRefresh();
    //             });
    //     }

    //     this.auth = new AuthManager(this.token);
    // }
}

export class AuthHandler{

}
