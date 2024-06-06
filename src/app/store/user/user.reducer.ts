import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '../../data/user';

export interface State {
    users: User[];
    loadError: string;
    createError: string;
    updateError: string;
    deleteError: string;
}

export const initialState: State = {
    users: [],
    loadError: '',
    createError: '',
    updateError: '',
    deleteError: ''
};

export const reducer = createReducer(
    initialState,

    on(UserActions.loadUsersSuccess, (state, action) => {
        return {
            ...state,
            users: action.users,
            loadError: ''
        };
    }),

    on(UserActions.loadUsersFail, (state, action) => {
        return {
            ...state,
            users: [],
            loadError: action.message
        };
    }),

    on(UserActions.createUserSuccess, (state, action) => {
        return {
            ...state,
            users: [
                ...state.users,
                action.user
            ],
            createError: ''
        };
    }),

    on(UserActions.createUserFail, (state, action) => {
        return {
            ...state,
            createError: action.message
        };
    }),

    on(UserActions.updateUserSuccess, (state, action) => {
        const users = state.users.map(user => action.user.id === user.id ? action.user : user);

        return {
            ...state,
            users: users,
            updateError: ''
        };
    }),

    on(UserActions.updateUserFail, (state, action) => {
        return {
            ...state,
            updateError: action.message
        };
    }),

    on(UserActions.deleteUserSuccess, (state, action) => {
        const users = state.users.filter(user => action.id !== user.id);

        return {
            ...state,
            users: users,
            deleteError: ''
        };
    }),

    on(UserActions.deleteUserFail, (state, action) => {
        return {
            ...state,
            deleteError: action.message
        };
    })
);
