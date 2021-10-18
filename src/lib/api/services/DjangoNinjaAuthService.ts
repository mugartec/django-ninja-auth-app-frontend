/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangePasswordIn } from '../models/ChangePasswordIn';
import type { LoginIn } from '../models/LoginIn';
import type { RequestPasswordResetIn } from '../models/RequestPasswordResetIn';
import type { SetPasswordIn } from '../models/SetPasswordIn';
import type { User } from '../models/User';
import { request as __request } from '../core/request';

export class DjangoNinjaAuthService {

    /**
     * Login
     * @param requestBody
     * @returns User OK
     * @throws ApiError
     */
    public static async login(
        requestBody: LoginIn,
    ): Promise<User> {
        const result = await __request({
            method: 'POST',
            path: `/api/auth/`,
            body: requestBody,
            errors: {
                403: `Error`,
            },
        });
        return result.body;
    }

    /**
     * Logout
     * @returns void
     * @throws ApiError
     */
    public static async logout(): Promise<void> {
        const result = await __request({
            method: 'DELETE',
            path: `/api/auth/`,
        });
        return result.body;
    }

    /**
     * Me
     * @returns User OK
     * @throws ApiError
     */
    public static async me(): Promise<User> {
        const result = await __request({
            method: 'GET',
            path: `/api/auth/me`,
        });
        return result.body;
    }

    /**
     * Request Password Reset
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static async requestPasswordReset(
        requestBody: RequestPasswordResetIn,
    ): Promise<void> {
        const result = await __request({
            method: 'POST',
            path: `/api/auth/request_password_reset`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * Reset Password
     * @param requestBody
     * @returns User OK
     * @throws ApiError
     */
    public static async resetPassword(
        requestBody: SetPasswordIn,
    ): Promise<User> {
        const result = await __request({
            method: 'POST',
            path: `/api/auth/reset_password`,
            body: requestBody,
            errors: {
                403: `Error`,
                422: `Error`,
            },
        });
        return result.body;
    }

    /**
     * Change Password
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static async changePassword(
        requestBody: ChangePasswordIn,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/api/auth/change_password`,
            body: requestBody,
            errors: {
                403: `Error`,
            },
        });
        return result.body;
    }

}