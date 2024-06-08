import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './auth.service';
import { User } from '../../data/user';

describe('AuthService', () => {
    let service: AuthService;

    const admin: User = {
        id: 1,
        name: 'Admin',
        email: 'admin@domain.com',
        username: 'admin',
        phone: '01167890',
        role: 'admin'
    };
    const user: User = {
        id: 1,
        name: 'User',
        email: 'user@domain.com',
        username: 'user',
        phone: '01112345',
        role: 'user'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule]
        });
        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return a user if given email is user for login', () => {
        const result = service.login('user@domain.com', '1234');

        result.subscribe(loginUser => {
            expect(loginUser).toEqual(user);
        });
    });

    it('should return an admin if given email is admin for login', () => {
        const result = service.login('admin@domain.com', '1234');

        result.subscribe(loginUser => {
            expect(loginUser).toEqual(admin);
        });
    });

    it('should return an error if given email is not user or admin for login', () => {
        const result = service.login('test@domain.com', '1234');

        result.subscribe({
            error: error => {
                expect(error.message).toEqual("Credential doesn't match our records");
            }
        });
    });

    it('should return true for logout', () => {
        const result = service.logout();

        result.subscribe(result => {
            expect(result).toBeTruthy()
        });
    });
});
