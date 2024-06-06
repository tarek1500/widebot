import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService) { }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            concatMap(action => {
                return this.authService.login(action.email, action.password)
                    .pipe(
                        map(user => AuthActions.loginSuccess({ user })),
                        catchError(err => of(AuthActions.loginFail({ message: err.message })))
                    );
            })
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            concatMap(action => {
                return this.authService.logout()
                    .pipe(
                        map(res => AuthActions.logoutSuccess())
                    );
            })
        )
    );
}
