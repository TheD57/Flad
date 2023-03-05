import axios, { AxiosError } from "axios";

export type Methods = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export interface FetchOptions {
    /** The headers to apply. */
    headers?: Record<string, string>;
    /** The method type. */
    method?: Methods;
    /** Search query parameters. */
    params?: Record<string, any>;
    /** The json body to send if available. */
    body?: Record<string, string | boolean | number | (string | boolean | number)[]>;
}

export class RequestHandler{
    private _version: `v${number}` = 'v1';
    get version(): string {
        return this._version;
    }
    
    public async spotifyFetch(url: string, options: FetchOptions = {}, token: string) {
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
        // console.log(resp);
        return resp;
        // if (
        //     // @ts-ignore
        //     error.response.data?.error?.message == "Invalid access token" ||
        //     // @ts-ignore
        //     error.response.data?.error?.message == "The access token expired" &&
        //     this.refreshMeta
        // ) await this.refreshFromMeta();
    }
}