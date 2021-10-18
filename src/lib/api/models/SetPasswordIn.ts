/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SetPasswordIn = {
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    username: string;
    new_password1: string;
    new_password2: string;
    token: string;
}
