import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, SpinnerState, UserState } from './app.reducer';

export interface State {
    auth: AuthState,
    user: UserState,
    spinner: SpinnerState
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

export const getDeleteError = createSelector(
    getUserFeatureState,
    state => state.deleteError
);

const getSpinnerFeatureState = createFeatureSelector<SpinnerState>('spinner');

export const getShow = createSelector(
    getSpinnerFeatureState,
    state => state.show
);
