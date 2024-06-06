import { createAction, props } from '@ngrx/store';
import { User } from '../../data/user';

export const loadUsers = createAction('[User] Load');

export const loadUsersSuccess = createAction(
    '[User] Load Success',
    props<{ users: User[] }>()
);

export const loadUsersFail = createAction(
    '[User] Load Fail',
    props<{ message: string }>()
);

export const createUser = createAction(
    '[User] Create',
    props<{ user: User }>()
);

export const createUserSuccess = createAction(
    '[User] Create Success',
    props<{ user: User }>()
);

export const createUserFail = createAction(
    '[User] Create Fail',
    props<{ message: string }>()
);

export const updateUser = createAction(
    '[User] Update',
    props<{ user: User }>()
);

export const updateUserSuccess = createAction(
    '[User] Update Success',
    props<{ user: User }>()
);

export const updateUserFail = createAction(
    '[User] Update Fail',
    props<{ message: string }>()
);

export const deleteUser = createAction(
    '[User] Delete',
    props<{ id: number }>()
);

export const deleteUserSuccess = createAction(
    '[User] Delete Success',
    props<{ id: number }>()
);

export const deleteUserFail = createAction(
    '[User] Delete Fail',
    props<{ message: string }>()
);
