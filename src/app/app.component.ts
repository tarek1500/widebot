import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject, skip, takeUntil } from 'rxjs';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import * as AuthActions from './store/auth/auth.actions';
import * as AuthSelectors from './store/auth/auth.selectors';
import * as SpinnerActions from './store/spinner/spinner.actions';
import * as SpinnerSelectors from './store/spinner/spinner.selectors';
import { User } from './data/user';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterModule, NgxSpinnerModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
    componentAlive$ = new Subject;
    user?: User | null;

    constructor(private store: Store, private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { }

    ngOnInit(): void {
        this.store.pipe(
            takeUntil(this.componentAlive$),
            select(SpinnerSelectors.selectShow)
        ).subscribe(show => {
            if (show) {
                this.spinner.show();
            }
            else {
                this.spinner.hide();
            }
        });

        this.route.queryParamMap.pipe(takeUntil(this.componentAlive$)).subscribe(params => {
            const name = params.get('name');
            const email = params.get('email');
            const username = params.get('username');
            const phone = params.get('phone');

            if (name && email && username && phone) {
                const user = {
                    id: 1,
                    name: name,
                    email: email,
                    username: username,
                    phone: phone,
                    role: 'user'
                };
                this.store.dispatch(AuthActions.loginSuccess({ user }));
                this.router.navigate(['/profile'], {
                    queryParams: {
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        phone: user.phone,
                    }
                });
            }
        });

        this.store.pipe(
            takeUntil(this.componentAlive$),
            skip(1),
            select(AuthSelectors.selectCurrentUser)
        ).subscribe(user => {
            this.user = user;

            if (!user) {
                this.store.dispatch(SpinnerActions.hideSpinner());

                this.router.navigate(['login']);
            }
        });
    }

    ngOnDestroy(): void {
        this.componentAlive$.next(null);
        this.componentAlive$.complete();
    }

    logout(event: MouseEvent) {
        event.preventDefault();

        this.store.dispatch(SpinnerActions.showSpinner());
        this.store.dispatch(AuthActions.logout());
    }
}
