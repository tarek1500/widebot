import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import * as fromApp from '../../state';
import * as appActions from '../../state/app.actions';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
    componentAlive$ = new Subject;
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
    error$?: Observable<string>;

    constructor(private store: Store<fromApp.State>, private router: Router) { }

    ngOnInit(): void {
        this.store.pipe(
            takeUntil(this.componentAlive$),
            select(fromApp.getAuthCurrentUser)
        ).subscribe(user => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                this.router.navigate(['/']);
            }
        });
        this.error$ = this.store.pipe(select(fromApp.getAuthError));
    }

    ngOnDestroy(): void {
        this.componentAlive$.next(null);
        this.componentAlive$.complete();
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.store.dispatch(new appActions.Login({
                email: this.loginForm.value.email!,
                password: this.loginForm.value.password!
            }));
        }
    }
}
