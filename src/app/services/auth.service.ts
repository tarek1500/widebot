import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../data/user'
import { Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(protected http: HttpClient) { }

    login(email: string, password: string): Observable<User> {
        let user: User | null = null;

        if (email === 'user@domain.com') {
            user = {
                name: 'User',
                email: 'user@domain.com',
                phone: '01112345',
                role: 'user'
            };
        }
        else if (email === 'admin@domain.com') {
            user = {
                name: 'Admin',
                email: 'admin@domain.com',
                phone: '01167890',
                role: 'admin'
            };
        }

        if (user) {
            return of(user);
        }

        return throwError(() => new Error("Credential doesn't match our records"));
    }

    logout(): Observable<any> {
        return of(true);
    }
}
