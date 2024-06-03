import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from './state';
import { User } from './data/user';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    user$?: Observable<User | null>;

    constructor(private store: Store<fromApp.State>) { }

    ngOnInit(): void {
        this.user$ = this.store.pipe(select(fromApp.getCurrentUser));
    }
}
