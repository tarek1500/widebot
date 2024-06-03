import { Action } from '@ngrx/store';
import { User } from '../data/user';

export enum AuthActionTypes {
    Login = '[Auth] Login',
    LoginSuccess = '[Auth] Login Success',
    LoginFail = '[Auth] Login Fail'
}

export class Login implements Action {
    readonly type = AuthActionTypes.Login;

    constructor(public payload: { email: string, password: string }) { }
}

export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LoginSuccess;

    constructor(public payload: User) { }
}

export class LoginFail implements Action {
    readonly type = AuthActionTypes.LoginFail;

    constructor(public payload: string) { }
}

export type UserActions = Login |
    LoginSuccess |
    LoginFail;
