import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import * as fromApp from './state';
import * as appActions from './state/app.actions';
import { User } from './data/user';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
    componentAlive$ = new Subject;
    user?: User | null;

    constructor(private store: Store<fromApp.State>, private router: Router) { }

    ngOnInit(): void {
        this.store.pipe(
            takeUntil(this.componentAlive$),
            select(fromApp.getAuthCurrentUser)
        ).subscribe(user => {
            this.user = user;

            if (!user) {
                localStorage.removeItem('user');
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

        this.store.dispatch(new appActions.Logout);
    }
}
