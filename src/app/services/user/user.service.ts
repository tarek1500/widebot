import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../data/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
    }

    createUser(user: User) {
        return this.http.post<User>('https://jsonplaceholder.typicode.com/users', user);
    }

    updateUser(user: User) {
        return this.http.put<User>(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
    }

    deleteUser(id: number) {
        return this.http.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    }
}
