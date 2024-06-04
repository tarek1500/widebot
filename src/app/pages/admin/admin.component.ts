import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as fromApp from '../../state';
import * as appActions from '../../state/app.actions';
import { User } from '../../data/user';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
    users$?: Observable<User[]>;
    createForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required])
    });
    error$?: Observable<string>;

    constructor(private store: Store<fromApp.State>, private modalService: NgbModal) { }

    ngOnInit(): void {
        this.users$ = this.store.pipe(select(fromApp.getUsers));
        this.error$ = this.store.pipe(select(fromApp.getLoadError));

        this.store.dispatch(new appActions.Load);
    }

    openCreateModal(content: TemplateRef<any>) {
        this.modalService.open(content)
            .result
            .then(
                result => {
                    this.store.dispatch(new appActions.Create({
                        id: 0,
                        name: this.createForm.value.name!,
                        email: this.createForm.value.email!,
                        username: this.createForm.value.username!,
                        phone: this.createForm.value.phone!,
                        role: 'user'
                    }));
                },
                reason => { }
            );
    }
}
