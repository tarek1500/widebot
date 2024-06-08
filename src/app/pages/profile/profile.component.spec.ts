import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

import { ProfileComponent } from './profile.component';
import * as SpinnerActions from '../../store/spinner/spinner.actions';
import * as AuthActions from '../../store/auth/auth.actions';
import { User } from '../../data/user';

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    let store: MockStore;

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
            imports: [ProfileComponent],
            providers: [provideMockStore()]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);

        spyOn(store, 'dispatch').and.stub();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch hide the spinner action if there is any user', () => {
        store.setState({ auth: { currentUser: user, error: '' } });

        component.ngOnInit();

        expect(store.dispatch).toHaveBeenCalledWith(SpinnerActions.hideSpinner());
    });

    it('should update user and profile form if there is any user in the store', () => {
        store.setState({ auth: { currentUser: user, error: '' } });

        component.ngOnInit();

        expect(component.user).toEqual(user);
        expect(component.profileForm.value.name).toEqual(user.name);
        expect(component.profileForm.value.email).toEqual(user.email);
        expect(component.profileForm.value.username).toEqual(user.username);
        expect(component.profileForm.value.phone).toEqual(user.phone);
    });

    it('should dispatch actions if form is valid on submit', () => {
        const name = 'Test';
        const email = 'test@domain.com';
        const username = 'test';
        const phone = '12345';
        const formElement = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;

        store.setState({ auth: { currentUser: user, error: '' } });

        component.ngOnInit();

        component.profileForm.patchValue({
            name,
            email,
            username,
            phone
        });

        formElement.dispatchEvent(new Event('submit'));

        expect(store.dispatch).toHaveBeenCalledWith(SpinnerActions.showSpinner());
        expect(store.dispatch).toHaveBeenCalledWith(AuthActions.updateUser({
            user: {
                id: user.id,
                name,
                email,
                username,
                phone,
                role: user.role
            }
        }));
    });
});
