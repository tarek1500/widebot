import { AuthActionTypes, UserActions } from './app.actions';
import { User } from '../data/user';

export interface UserState {
    currentUser: User | null;
    error: string;
}

const initialState: UserState = {
    currentUser: null,
    error: ''
};

export function userReducer(state = initialState, action: UserActions): UserState {
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
        default:
            return state;
    }
}
