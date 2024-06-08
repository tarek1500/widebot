import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router, provideRouter } from '@angular/router';

import { LoginComponent } from './login.component';
import * as SpinnerActions from '../../store/spinner/spinner.actions';
import * as AuthActions from '../../store/auth/auth.actions';
import { User } from '../../data/user';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let router: Router;
    let store: MockStore

    const admin: User = {
        id: 1,
        name: 'Admin',
        email: 'admin@domain.com',
        username: 'admin',
        phone: '12345',
        role: 'admin'
    };
    const user: User = {
        id: 1,
        name: 'User',
        email: 'user@domain.com',
        username: 'user',
        phone: '12345',
        role: 'user'
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                LoginComponent,
                ReactiveFormsModule
            ],
            providers: [
                provideMockStore(),
                provideRouter([])
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        store = TestBed.inject(MockStore);

        spyOn(router, 'navigate').and.stub();
        spyOn(store, 'dispatch').and.stub();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch hide the spinner action if there is any user', () => {
        store.setState({ auth: { currentUser: admin, error: '' } });

        component.ngOnInit();

        expect(store.dispatch).toHaveBeenCalledWith(SpinnerActions.hideSpinner());
    });

    it('should navigate to admin if user role is admin', () => {
        store.setState({ auth: { currentUser: admin, error: '' } });

        component.ngOnInit();

        expect(router.navigate).toHaveBeenCalledWith(['/admin']);
    });

    it('should navigate to profile if user role is user', () => {
        store.setState({ auth: { currentUser: user, error: '' } });

        component.ngOnInit();

        expect(router.navigate).toHaveBeenCalledWith(['/profile']);
    });

    it('should not navigate any where if there is no user', () => {
        store.setState({ auth: { currentUser: null, error: '' } });

        component.ngOnInit();

        expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should show error if there is any', () => {
        const errorMessage = 'Test error message';

        store.setState({ auth: { currentUser: null, error: errorMessage } });

        component.ngOnInit();
        fixture.detectChanges();

        const errorElement = fixture.debugElement.query(By.css('.error')).nativeElement as HTMLDivElement;

        component.error$?.subscribe(error => {
            expect(error).toEqual(errorMessage);
        });

        expect(errorElement.textContent).toEqual(errorMessage);
    });

    it('should fill the form if inputs have values', () => {
        const email = 'test@domain.com';
        const password = '1234';
        const emailElement = fixture.debugElement.query(By.css('form #email')).nativeElement as HTMLInputElement;
        const passwordElement = fixture.debugElement.query(By.css('form #password')).nativeElement as HTMLInputElement;

        emailElement.value = email;
        emailElement.dispatchEvent(new Event('input'));
        passwordElement.value = password;
        passwordElement.dispatchEvent(new Event('input'));

        expect(component.loginForm.value.email).toEqual(email);
        expect(component.loginForm.value.password).toEqual(password);
    });

    it('should dispatch actions if form is valid on submit', () => {
        const email = 'test@domain.com';
        const password = '1234';
        const formElement = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;

        component.loginForm.patchValue({
            email,
            password
        });

        formElement.dispatchEvent(new Event('submit'));

        expect(store.dispatch).toHaveBeenCalledWith(SpinnerActions.showSpinner());
        expect(store.dispatch).toHaveBeenCalledWith(AuthActions.login({
            email,
            password
        }));
    });
});
