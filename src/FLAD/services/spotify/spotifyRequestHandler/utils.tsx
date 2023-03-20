import axios, { AxiosResponse } from "axios";

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
    
    get version(): string {
        return this._version;
    }
    public async spotifyFetch(url: string, options: FetchOptions = {}, token: string): Promise<AxiosResponse<any, any>> {
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
                throw new Error;
            }
            else{
                throw new Error;
            }
        }
    }
}

export class AuthHandler{}
