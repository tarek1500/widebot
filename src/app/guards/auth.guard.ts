import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';
import * as AuthSelectors from '../store/auth/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
    const store = inject(Store);
    const router = inject(Router);

    return store.pipe(
        select(AuthSelectors.selectCurrentUser),
        map(user => {
            if (user) {
                return true;
            }
            else {
                return router.createUrlTree(['/login']);
            }
        }));
};
