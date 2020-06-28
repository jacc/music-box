import { Response } from "node-fetch";
export declare class musicBoxClient {
    gistID: string | undefined;
    lfmKey: string | undefined;
    lfmUsername: string | undefined;
    baseUrl: string | undefined;
    gist_id: string | undefined;
    constructor();
    resolveFetch<T>(x: Response): Promise<T | boolean>;
    getGist(gist_id: string): Promise<any | false>;
    getLfm(): Promise<void>;
    main(): Promise<void>;
}
