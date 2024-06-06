import { createReducer, on } from '@ngrx/store';
import * as SpinnerActions from './spinner.actions';

export interface State {
    show: boolean
}

export const initialState: State = {
    show: false
};

export const reducer = createReducer(
    initialState,

    on(SpinnerActions.showSpinner, (state, action) => {
        return {
            ...state,
            show: true
        };
    }),

    on(SpinnerActions.hideSpinner, (state, action) => {
        return {
            ...state,
            show: false
        };
    })
);
