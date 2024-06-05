import { Action } from '@ngrx/store';
import { User } from '../data/user';

export enum AuthActionTypes {
    Login = '[Auth] Login',
    LoginSuccess = '[Auth] Login Success',
    LoginFail = '[Auth] Login Fail',
    Logout = '[Auth] Logout',
    LogoutSuccess = '[Auth] Logout Success',
    UpdateUser = '[Auth] Update User'
}

export enum UserActionTypes {
    Load = '[User] Load',
    LoadSuccess = '[User] Load Success',
    LoadFail = '[User] Load Fail',
    Create = '[User] Create',
    CreateSuccess = '[User] Create Success',
    CreateFail = '[User] Create Fail',
    Update = '[User] Update',
    UpdateSuccess = '[User] Update Success',
    UpdateFail = '[User] Update Fail',
    Delete = '[User] Delete',
    DeleteSuccess = '[User] Delete Success',
    DeleteFail = '[User] Delete Fail'
}

export enum SpinnerActionTypes {
    Show = '[Spinner] Show',
    Hide = '[Spinner] Hide'
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

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export class LogoutSuccess implements Action {
    readonly type = AuthActionTypes.LogoutSuccess;
}

export class UpdateUser implements Action {
    readonly type = AuthActionTypes.UpdateUser;

    constructor(public payload: User) { }
}

export class Load implements Action {
    readonly type = UserActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = UserActionTypes.LoadSuccess;

    constructor(public payload: User[]) { }
}

export class LoadFail implements Action {
    readonly type = UserActionTypes.LoadFail;

    constructor(public payload: string) { }
}

export class Create implements Action {
    readonly type = UserActionTypes.Create;

    constructor(public payload: User) { }
}

export class CreateSuccess implements Action {
    readonly type = UserActionTypes.CreateSuccess;

    constructor(public payload: User) { }
}

export class CreateFail implements Action {
    readonly type = UserActionTypes.CreateFail;

    constructor(public payload: string) { }
}

export class Update implements Action {
    readonly type = UserActionTypes.Update;

    constructor(public payload: User) { }
}

export class UpdateSuccess implements Action {
    readonly type = UserActionTypes.UpdateSuccess;

    constructor(public payload: User) { }
}

export class UpdateFail implements Action {
    readonly type = UserActionTypes.UpdateFail;

    constructor(public payload: string) { }
}

export class Delete implements Action {
    readonly type = UserActionTypes.Delete;

    constructor(public payload: number) { }
}

export class DeleteSuccess implements Action {
    readonly type = UserActionTypes.DeleteSuccess;

    constructor(public payload: number) { }
}

export class DeleteFail implements Action {
    readonly type = UserActionTypes.DeleteFail;

    constructor(public payload: string) { }
}

export class Show implements Action {
    readonly type = SpinnerActionTypes.Show;
}

export class Hide implements Action {
    readonly type = SpinnerActionTypes.Hide;
}

export type AuthActions = Login |
    LoginSuccess |
    LoginFail |
    Logout |
    LogoutSuccess |
    UpdateUser;

export type UserActions = Load |
    LoadSuccess |
    LoadFail |
    Create |
    CreateSuccess |
    CreateFail |
    Update |
    UpdateSuccess |
    UpdateFail |
    Delete |
    DeleteSuccess |
    DeleteFail;

export type SpinnerActions = Show |
    Hide;
