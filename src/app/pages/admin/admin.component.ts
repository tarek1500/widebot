import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, merge, takeUntil } from 'rxjs';
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
export class AdminComponent implements OnInit, OnDestroy {
    componentAlive$ = new Subject;
    users?: User[];
    isEdit = false;
    createForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required])
    });
    error$?: Observable<string>;

    constructor(private store: Store<fromApp.State>, private modalService: NgbModal) { }

    ngOnInit(): void {
        this.store.pipe(
            takeUntil(this.componentAlive$),
            select(fromApp.getUsers)
        ).subscribe(users => {
            this.store.dispatch(new appActions.Hide);

            this.users = users;
        });
        this.error$ = merge(
            this.store.pipe(select(fromApp.getLoadError)),
            this.store.pipe(select(fromApp.getCreateError)),
            this.store.pipe(select(fromApp.getUpdateError)),
            this.store.pipe(select(fromApp.getDeleteError))
        );

        this.store.dispatch(new appActions.Show);
        this.store.dispatch(new appActions.Load);
    }

    ngOnDestroy(): void {
        this.componentAlive$.next(null);
        this.componentAlive$.complete();
    }

    buildUserQuery(user: User) {
        let query = `name=${user.name}&email=${user.email}&username=${user.username}&phone=${user.phone}`;

        return `/?${query}`;
    }

    openCreateModal(content: TemplateRef<any>) {
        this.isEdit = false;
        this.createForm.patchValue({
            name: '',
            email: '',
            username: '',
            phone: ''
        });

        this.modalService.open(content)
            .result
            .then(
                result => {
                    this.store.dispatch(new appActions.Show);
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

    openUpdateModal(content: TemplateRef<any>, user: User) {
        this.isEdit = true;
        this.createForm.patchValue({
            name: user?.name,
            email: user?.email,
            username: user?.username,
            phone: user?.phone
        });

        this.modalService.open(content)
            .result
            .then(
                result => {
                    this.store.dispatch(new appActions.Show);
                    this.store.dispatch(new appActions.Update({
                        id: user.id,
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

    openDeleteModal(content: TemplateRef<any>, id: number) {
        this.modalService.open(content)
            .result
            .then(
                result => {
                    this.store.dispatch(new appActions.Show);
                    this.store.dispatch(new appActions.Delete(id))
                },
                reason => { }
            );
    }
}
