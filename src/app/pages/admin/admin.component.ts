import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from '../../state';
import * as appActions from '../../state/app.actions';
import { User } from '../../data/user';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
    users$?: Observable<User[]>;
    error$?: Observable<string>;

    constructor(private store: Store<fromApp.State>) { }

    ngOnInit(): void {
        this.users$ = this.store.pipe(select(fromApp.getUsers));
        this.error$ = this.store.pipe(select(fromApp.getLoadError));

        this.store.dispatch(new appActions.Load);
    }
}
