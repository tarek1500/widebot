import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import * as fromApp from './state';
import * as appActions from './state/app.actions';
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

    constructor(private store: Store<fromApp.State>, private router: Router, private spinner: NgxSpinnerService) { }

    ngOnInit(): void {
        this.store.pipe(
            takeUntil(this.componentAlive$),
            select(fromApp.getShow)
        ).subscribe(show => {
            if (show) {
                this.spinner.show();
            }
            else {
                this.spinner.hide();
            }
        });

        this.store.pipe(
            takeUntil(this.componentAlive$),
            select(fromApp.getAuthCurrentUser)
        ).subscribe(user => {
            this.user = user;

            if (!user) {
                this.store.dispatch(new appActions.Hide);

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

        this.store.dispatch(new appActions.Show);
        this.store.dispatch(new appActions.Logout);
    }
}
