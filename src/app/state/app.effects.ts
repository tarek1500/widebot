import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as appActions from './app.actions';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private authService: AuthService) { }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appActions.AuthActionTypes.Login),
            map((action: appActions.Login) => action.payload),
            mergeMap(payload => {
                return this.authService.login(payload.email, payload.password).pipe(
                    map(user => new appActions.LoginSuccess(user)),
                    catchError(err => of(new appActions.LoginFail(err.message)))
                );
            })
        )
    );
}
