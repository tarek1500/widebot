import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeComponent } from './admin-home.component';
import { provideRouter } from '@angular/router';

describe('AdminHomeComponent', () => {
    let component: AdminHomeComponent;
    let fixture: ComponentFixture<AdminHomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AdminHomeComponent],
            providers: [provideRouter([])]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AdminHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
