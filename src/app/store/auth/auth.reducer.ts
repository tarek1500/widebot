import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../data/user';

export interface State {
    currentUser: User | null;
    error: string;
}

export const initialState: State = {
    currentUser: null,
    error: ''
};

export const reducer = createReducer(
    initialState,

    on(AuthActions.loginSuccess, (state, action) => {
        return {
            ...state,
            currentUser: action.user,
            error: ''
        };
    }),

    on(AuthActions.loginFail, (state, action) => {
        return {
            ...state,
            currentUser: null,
            error: action.message
        };
    }),

    on(AuthActions.logoutSuccess, (state, action) => {
        return {
            ...state,
            currentUser: null
        };
    }),

    on(AuthActions.updateUser, (state, action) => {
        return {
            ...state,
            currentUser: action.user
        };
    })
);
