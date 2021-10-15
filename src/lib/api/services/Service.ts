/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HelloWorldIn } from '../models/HelloWorldIn';
import type { HelloWorldOut } from '../models/HelloWorldOut';
import type { HelloWorldSchema } from '../models/HelloWorldSchema';
import { request as __request } from '../core/request';

export class Service {

    /**
     * Set Csrf Cookie
     * @returns any OK
     * @throws ApiError
     */
    public static async setCsrfCookie(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/api/csrf`,
        });
        return result.body;
    }

    /**
     * Hello World
     * @param param
     * @returns HelloWorldSchema OK
     * @throws ApiError
     */
    public static async helloWorld(
        param?: number,
    ): Promise<HelloWorldSchema> {
        const result = await __request({
            method: 'GET',
            path: `/api/`,
            query: {
                'param': param,
            },
        });
        return result.body;
    }

    /**
     * Post Hello World
     * @param requestBody
     * @returns HelloWorldOut OK
     * @throws ApiError
     */
    public static async postHelloWorld(
        requestBody: HelloWorldIn,
    ): Promise<HelloWorldOut> {
        const result = await __request({
            method: 'POST',
            path: `/api/`,
            body: requestBody,
        });
        return result.body;
    }

}