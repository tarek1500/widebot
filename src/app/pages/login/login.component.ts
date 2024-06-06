import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import * as AuthActions from '../../store/auth/auth.actions';
import * as AuthSelectors from '../../store/auth/auth.selectors';
import * as SpinnerActions from '../../store/spinner/spinner.actions';

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

    constructor(private store: Store, private router: Router) { }

    ngOnInit(): void {
        this.store.pipe(
            takeUntil(this.componentAlive$),
            select(AuthSelectors.selectCurrentUser)
        ).subscribe(user => {
            if (user) {
                this.store.dispatch(SpinnerActions.hideSpinner());

                if (user.role === 'admin') {
                    this.router.navigate(['/admin']);
                }
                else {
                    this.router.navigate(['/profile']);
                }
            }
        });
        this.error$ = this.store.pipe(select(AuthSelectors.selectError));
    }

    ngOnDestroy(): void {
        this.componentAlive$.next(null);
        this.componentAlive$.complete();
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.store.dispatch(SpinnerActions.showSpinner());
            this.store.dispatch(AuthActions.login({
                email: this.loginForm.value.email!,
                password: this.loginForm.value.password!
            }));
        }
    }
}
