import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './app.reducer';

export interface State {
    users: UserState
}

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getCurrentUser = createSelector(
    getUserFeatureState,
    state => state.currentUser
);

export const getError = createSelector(
    getUserFeatureState,
    state => state.error
);
