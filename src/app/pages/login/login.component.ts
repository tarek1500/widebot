import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../state';
import * as appActions from '../../state/app.actions';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });

    constructor(private store: Store<fromApp.State>) { }

    onSubmit() {
        if (this.loginForm.valid) {
            this.store.dispatch(new appActions.Login({
                email: this.loginForm.value.email!,
                password: this.loginForm.value.password!
            }));
        }
    }
}
