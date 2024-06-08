import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from './user.service';
import { of } from 'rxjs';
import { User } from '../../data/user';

describe('UserService', () => {
    let service: UserService;

    const users: User[] = [
        {
            id: 1,
            name: 'Tarek',
            email: 'tarek@domain.com',
            username: 'tarek',
            phone: '12345',
            role: 'user'
        },
        {
            id: 2,
            name: 'ahmed',
            email: 'ahmed@domain.com',
            username: 'ahmed',
            phone: '23456',
            role: 'user'
        },
        {
            id: 3,
            name: 'Mohammed',
            email: 'mohammed@domain.com',
            username: 'mohammed',
            phone: '34567',
            role: 'user'
        }
    ];
    const user: User = {
        id: 1,
        name: 'Test',
        email: 'test@domain.com',
        username: 'test',
        phone: '12345',
        role: 'user'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule]
        });
        service = TestBed.inject(UserService);

        spyOn(service, 'getUsers').and.returnValue(of(users));
        spyOn(service, 'createUser').and.returnValue(of(user));
        spyOn(service, 'updateUser').and.returnValue(of(user));
        spyOn(service, 'deleteUser').and.returnValue(of(true));
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return list of users for getUsers function', () => {
        service.getUsers().subscribe(usersList => {
            expect(usersList).toEqual(users);
        });
    });

    it('should return a user for createUser function', () => {
        service.createUser(user).subscribe(createUser => {
            expect(createUser).toEqual(user);
        });
    });

    it('should return a user for updateUser function', () => {
        service.updateUser(user).subscribe(updateUser => {
            expect(updateUser).toEqual(user);
        });
    });

    it('should return an empty observable for deleteUser function', () => {
        service.deleteUser(user.id).subscribe(result => {
            expect(result).toBeTruthy();
        });
    });
});
