import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, merge, takeUntil } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as UserActions from '../../store/user/user.actions';
import * as UserSelectors from '../../store/user/user.selectors';
import * as SpinnerActions from '../../store/spinner/spinner.actions';
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
    users: User[] = [];
    isEdit = false;
    createForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required])
    });
    error$?: Observable<string>;

    constructor(private store: Store, private modalService: NgbModal) { }

    ngOnInit(): void {
        this.store.pipe(
            takeUntil(this.componentAlive$),
            select(UserSelectors.selectUsers)
        ).subscribe(users => {
            this.store.dispatch(SpinnerActions.hideSpinner());

            this.users = users;
        });
        this.error$ = merge(
            this.store.pipe(select(UserSelectors.selectLoadError)),
            this.store.pipe(select(UserSelectors.selectCreateError)),
            this.store.pipe(select(UserSelectors.selectUpdateError)),
            this.store.pipe(select(UserSelectors.selectDeleteError))
        );

        this.store.dispatch(SpinnerActions.showSpinner());
        this.store.dispatch(UserActions.loadUsers());
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
                    this.store.dispatch(SpinnerActions.showSpinner());
                    this.store.dispatch(UserActions.createUser({
                        user: {
                            id: 0,
                            name: this.createForm.value.name!,
                            email: this.createForm.value.email!,
                            username: this.createForm.value.username!,
                            phone: this.createForm.value.phone!,
                            role: 'user'
                        }
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
                    this.store.dispatch(SpinnerActions.showSpinner());
                    this.store.dispatch(UserActions.updateUser({
                        user: {
                            id: user.id,
                            name: this.createForm.value.name!,
                            email: this.createForm.value.email!,
                            username: this.createForm.value.username!,
                            phone: this.createForm.value.phone!,
                            role: 'user'
                        }
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
                    this.store.dispatch(SpinnerActions.showSpinner());
                    this.store.dispatch(UserActions.deleteUser({ id }))
                },
                reason => { }
            );
    }
}
