import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private userService: UserService) { }

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            exhaustMap(action => {
                return this.userService.getUsers()
                    .pipe(
                        map(users => UserActions.loadUsersSuccess({ users })),
                        catchError(err => of(UserActions.loadUsersFail({ message: err.message })))
                    );
            })
        )
    );

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.createUser),
            concatMap(action => {
                return this.userService.createUser(action.user)
                    .pipe(
                        map(user => UserActions.createUserSuccess({ user })),
                        catchError(err => of(UserActions.createUserFail({ message: err.message })))
                    );
            })
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.updateUser),
            concatMap(action => {
                return this.userService.updateUser(action.user)
                    .pipe(
                        map(user => UserActions.updateUserSuccess({ user })),
                        catchError(err => of(UserActions.updateUserFail({ message: err.message })))
                    );
            })
        )
    );

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.deleteUser),
            mergeMap(action => {
                return this.userService.deleteUser(action.id)
                    .pipe(
                        map(user => UserActions.deleteUserSuccess({ id: action.id })),
                        catchError(err => of(UserActions.deleteUserFail({ message: err.message })))
                    );
            })
        )
    );
}
