import {Api} from "./api/Api.ts";

export const baseUrl = 'http://localhost:5000';

export const http = new Api({
    baseUrl: baseUrl
});
