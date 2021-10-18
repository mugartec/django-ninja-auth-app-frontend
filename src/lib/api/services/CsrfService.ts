/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class CsrfService {

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

}