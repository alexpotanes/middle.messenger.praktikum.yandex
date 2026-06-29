import HTTPTransport from "./request.ts";

export const BASE_URL: string = "https://ya-praktikum.tech/api/v2";
export const TRANSPORT = new HTTPTransport(`${BASE_URL}`);

