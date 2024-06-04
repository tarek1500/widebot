import { AuthActionTypes, AuthActions, UserActionTypes, UserActions } from './app.actions';
import { User } from '../data/user';

export interface AuthState {
    currentUser: User | null;
    error: string;
}

const authInitialState: AuthState = {
    currentUser: null,
    error: ''
};

export interface UserState {
    users: User[];
    loadError: string;
    createError: string;
    getError: string;
    updateError: string;
    deleteError: string;
}

const userInitialState: UserState = {
    users: [],
    loadError: '',
    createError: '',
    getError: '',
    updateError: '',
    deleteError: ''
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
        case AuthActionTypes.UpdateUser:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export function userReducer(state = userInitialState, action: UserActions): UserState {
    switch (action.type) {
        case UserActionTypes.LoadSuccess:
            return {
                ...state,
                users: action.payload,
                loadError: ''
            };
        case UserActionTypes.LoadFail:
            return {
                ...state,
                users: [],
                loadError: action.payload
            };
        case UserActionTypes.CreateSuccess:
            const createUsers = [
                ...state.users,
                action.payload
            ];

            return {
                ...state,
                users: createUsers,
                createError: ''
            };
        case UserActionTypes.CreateFail:
            return {
                ...state,
                createError: action.payload
            };
        case UserActionTypes.UpdateSuccess:
            const updatedUsers = state.users.map(user => action.payload.id === user.id ? action.payload : user);

            return {
                ...state,
                users: updatedUsers,
                updateError: ''
            };
        case UserActionTypes.UpdateFail:
            return {
                ...state,
                updateError: action.payload
            };
        case UserActionTypes.DeleteSuccess:
            const newUsers = state.users.filter(user => action.payload !== user.id);

            return {
                ...state,
                users: newUsers,
                deleteError: ''
            };
        case UserActionTypes.DeleteFail:
            return {
                ...state,
                deleteError: action.payload
            };
        default:
            return state;
    }
}
