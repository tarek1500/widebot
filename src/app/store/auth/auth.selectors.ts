import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './auth.reducer';

const selectFeatureState = createFeatureSelector<State>('auth');

export const selectCurrentUser = createSelector(
    selectFeatureState,
    state => state.currentUser
);

export const selectError = createSelector(
    selectFeatureState,
    state => state.error
);
