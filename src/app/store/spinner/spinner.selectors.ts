import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './spinner.reducer';

const selectFeatureState = createFeatureSelector<State>('spinner');

export const selectShow = createSelector(
    selectFeatureState,
    state => state.show
);
