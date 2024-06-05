import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';
import * as fromApp from '../state';

export const authGuard: CanActivateFn = (route, state) => {
    const store = inject(Store<fromApp.State>);
    const router = inject(Router);

    return store.pipe(
        select(fromApp.getAuthCurrentUser),
        map(user => {
            if (user) {
                return true;
            }
            else {
                return router.createUrlTree(['/login']);
            }
        }));
};
