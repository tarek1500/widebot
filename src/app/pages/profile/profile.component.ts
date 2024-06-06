import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import * as AuthActions from '../../store/auth/auth.actions';
import * as AuthSelectors from '../../store/auth/auth.selectors';
import * as SpinnerActions from '../../store/spinner/spinner.actions';
import { User } from '../../data/user';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
    componentAlive$ = new Subject;
    user?: User;
    profileForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required])
    });

    constructor(private store: Store) { }

    ngOnInit(): void {
        this.store.pipe(
            takeUntil(this.componentAlive$),
            select(AuthSelectors.selectCurrentUser)
        ).subscribe(user => {
            this.store.dispatch(SpinnerActions.hideSpinner());

            this.user = user!;
            this.profileForm.patchValue({
                name: user?.name,
                email: user?.email,
                username: user?.username,
                phone: user?.phone
            });
        });
    }

    ngOnDestroy(): void {
        this.componentAlive$.next(null);
        this.componentAlive$.complete();
    }

    onSubmit() {
        if (this.profileForm.valid) {
            this.store.dispatch(SpinnerActions.showSpinner());
            this.store.dispatch(AuthActions.updateUser({
                user: {
                    id: this.user?.id!,
                    name: this.profileForm.value.name!,
                    email: this.profileForm.value.email!,
                    username: this.profileForm.value.username!,
                    phone: this.profileForm.value.phone!,
                    role: this.user?.role!
                }
            }));
        }
    }
}
