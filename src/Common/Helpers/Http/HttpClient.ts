import axios from "axios";
import { IHttpClient } from "./IHttpClient";
import { IHttpConfig } from "./IHttpConfig";
import { IHttpResponse } from "./IHttpResponse";

export class HttpClient implements IHttpClient {
    private _apiUrl: string = "";
    private _defaultConfigs: IHttpConfig = {};

    constructor(apiUrl?: string, defaultConfigs?: IHttpConfig) {
        if (apiUrl) this._apiUrl = apiUrl;
        if (defaultConfigs) this._defaultConfigs = defaultConfigs;
    }

    get apiUrl() {
        return this._apiUrl;
    }

    get defaultConfigs() {
        return this._defaultConfigs;
    }

    updateUrl(url: string): string {
        if (url.startsWith("http:")) return url;
        return this.apiUrl.concat(url);
    }

    updateBody(body?: any, configs?: IHttpConfig): IHttpConfig | undefined {
        if (!body) return configs;
        if (!configs) configs = {};
        configs.data = body;
        return configs;
    }

    appendConfigs(configs?: IHttpConfig): IHttpConfig {
        if (!configs) return this._defaultConfigs;
        return Object.assign(this._defaultConfigs, configs);
    }

    get<T>(url: string, configs?: IHttpConfig): Promise<IHttpResponse<T>> {
        return axios.get(this.updateUrl(url), this.appendConfigs(configs));
    }

    post<T>(url: string, body: any, configs?: IHttpConfig): Promise<IHttpResponse<T>> {
        configs = this.updateBody(body, configs);
        return axios.post(this.updateUrl(url), this.appendConfigs(configs));
    }

    put<T>(url: string, body: any, configs?: IHttpConfig): Promise<IHttpResponse<T>> {
        configs = this.updateBody(body, configs);
        return axios.put(this.updateUrl(url), this.appendConfigs(configs));
    }

    delete<T>(url: string, configs?: IHttpConfig): Promise<IHttpResponse<T>> {
        return axios.delete(this.updateUrl(url), this.appendConfigs(configs));
    }
}