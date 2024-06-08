import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { HomeComponent } from './home.component';
import { AdminHomeComponent } from '../../components/admin-home/admin-home.component';
import { UserHomeComponent } from '../../components/user-home/user-home.component';
import { User } from '../../data/user';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let store: MockStore;

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
                HomeComponent,
                AdminHomeComponent,
                UserHomeComponent
            ],
            providers: [
                provideMockStore(),
                provideRouter([])
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return user if there is a user in the store', () => {
        store.setState({ auth: { currentUser: admin, error: '' } });

        component.ngOnInit();

        component.user$?.subscribe(user => {
            expect(user).toEqual(admin);
        });
    });

    it('should show admin home if there is an admin in the store', () => {
        store.setState({ auth: { currentUser: admin, error: '' } });

        component.ngOnInit();
        fixture.detectChanges();

        const homeElement = fixture.debugElement.query(By.css('app-admin-home')).nativeElement as HTMLElement;

        expect(homeElement).toBeTruthy();
    });

    it('should show user home if there is a user in the store', () => {
        store.setState({ auth: { currentUser: user, error: '' } });

        component.ngOnInit();
        fixture.detectChanges();

        const homeElement = fixture.debugElement.query(By.css('app-user-home')).nativeElement as HTMLElement;

        expect(homeElement).toBeTruthy();
    });
});
