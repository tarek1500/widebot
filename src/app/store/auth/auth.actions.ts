import { createAction, props } from '@ngrx/store';
import { User } from '../../data/user';

export const login = createAction(
    '[Auth] Login',
    props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: User }>()
);

export const loginFail = createAction(
    '[Auth] Login Fail',
    props<{ message: string }>()
);

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

export const updateUser = createAction(
    '[Auth] Update User',
    props<{ user: User }>()
);
