import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './user.reducer';

const selectFeatureState = createFeatureSelector<State>('user');

export const selectUsers = createSelector(
    selectFeatureState,
    state => state.users
);

export const selectLoadError = createSelector(
    selectFeatureState,
    state => state.loadError
);

export const selectCreateError = createSelector(
    selectFeatureState,
    state => state.createError
);

export const selectUpdateError = createSelector(
    selectFeatureState,
    state => state.updateError
);

export const selectDeleteError = createSelector(
    selectFeatureState,
    state => state.deleteError
);
