import { AuthActionTypes, AuthActions } from './app.actions';
import { User } from '../data/user';

export interface AuthState {
    currentUser: User | null;
    error: string;
}

const authInitialState: AuthState = {
    currentUser: null,
    error: ''
};

export function authReducer(state = authInitialState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.LoginSuccess:
            return {
                ...state,
                currentUser: action.payload,
                error: ''
            };
        case AuthActionTypes.LoginFail:
            return {
                ...state,
                currentUser: null,
                error: action.payload
            };
        case AuthActionTypes.LogoutSuccess:
            return {
                ...state,
                currentUser: null
            }
        default:
            return state;
    }
}
