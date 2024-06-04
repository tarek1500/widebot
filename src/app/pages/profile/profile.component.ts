import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import * as fromApp from '../../state';
import * as appActions from '../../state/app.actions';
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

    constructor(private store: Store<fromApp.State>) { }

    ngOnInit(): void {
        this.store.pipe(
            takeUntil(this.componentAlive$),
            select(fromApp.getAuthCurrentUser)
        ).subscribe(user => {
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
            this.store.dispatch(new appActions.UpdateUser({
                id: this.user?.id!,
                name: this.profileForm.value.name!,
                email: this.profileForm.value.email!,
                username: this.profileForm.value.username!,
                phone: this.profileForm.value.phone!,
                role: this.user?.role!
            }));
        }
    }
}
