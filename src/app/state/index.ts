import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './app.reducer';

export interface State {
    auth: AuthState
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
