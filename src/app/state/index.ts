import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, UserState } from './app.reducer';

export interface State {
    auth: AuthState,
    user: UserState
}

const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

export const getAuthCurrentUser = createSelector(
    getAuthFeatureState,
    state => state.currentUser
);

export const getAuthError = createSelector(
    getAuthFeatureState,
    state => state.error
);

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getUsers = createSelector(
    getUserFeatureState,
    state => state.users
);

export const getLoadError = createSelector(
    getUserFeatureState,
    state => state.loadError
);

export const getCreateError = createSelector(
    getUserFeatureState,
    state => state.createError
);

export const getUpdateError = createSelector(
    getUserFeatureState,
    state => state.updateError
);
