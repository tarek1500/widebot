import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AdminHomeComponent } from '../../components/admin-home/admin-home.component';
import { UserHomeComponent } from '../../components/user-home/user-home.component';
import * as AuthSelectors from '../../store/auth/auth.selectors';
import { User } from '../../data/user';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, AdminHomeComponent, UserHomeComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    user$?: Observable<User | null>;

    constructor(private store: Store) { }

    ngOnInit(): void {
        this.user$ = this.store.pipe(select(AuthSelectors.selectCurrentUser));
    }
}
