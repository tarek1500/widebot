import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import * as appActions from './app.actions';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private authService: AuthService, private userService: UserService) { }

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

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appActions.AuthActionTypes.Logout),
            mergeMap(action => {
                return this.authService.logout().pipe(
                    map(res => new appActions.LogoutSuccess)
                );
            })
        )
    );

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appActions.UserActionTypes.Load),
            mergeMap(action => {
                return this.userService.getUsers().pipe(
                    map(users => new appActions.LoadSuccess(users)),
                    catchError(err => of(new appActions.LoadFail(err.message)))
                );
            })
        )
    );

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appActions.UserActionTypes.Create),
            map((action: appActions.Create) => action.payload),
            mergeMap(payload => {
                return this.userService.createUser(payload).pipe(
                    map(user => new appActions.CreateSuccess(user)),
                    catchError(err => of(new appActions.CreateFail(err.message)))
                );
            })
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appActions.UserActionTypes.Update),
            map((action: appActions.Update) => action.payload),
            mergeMap(payload => {
                return this.userService.updateUser(payload).pipe(
                    map(user => new appActions.UpdateSuccess(user)),
                    catchError(err => of(new appActions.UpdateFail(err.message)))
                );
            })
        )
    );

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appActions.UserActionTypes.Delete),
            map((action: appActions.Delete) => action.payload),
            mergeMap(payload => {
                return this.userService.deleteUser(payload).pipe(
                    map(user => new appActions.DeleteSuccess(payload)),
                    catchError(err => of(new appActions.DeleteFail(err.message)))
                );
            })
        )
    );
}
