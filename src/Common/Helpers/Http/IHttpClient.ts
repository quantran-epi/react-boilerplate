import { IHttpConfig } from "./IHttpConfig";
import { IHttpResponse } from "./IHttpResponse";

export interface IHttpClient {
    apiUrl: string;
    defaultConfigs: IHttpConfig;
    get: <T>(url: string, configs?: IHttpConfig) => Promise<IHttpResponse<T>>;
    post: <T>(url: string, body: any, configs?: IHttpConfig) => Promise<IHttpResponse<T>>;
    put: <T>(url: string, body: any, configs?: IHttpConfig) => Promise<IHttpResponse<T>>;
    delete: <T>(url: string, configs?: IHttpConfig) => Promise<IHttpResponse<T>>;
}