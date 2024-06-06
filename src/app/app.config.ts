import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { reducer as AuthReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { reducer as SpinnerReducer } from './store/spinner/spinner.reducer';
import { reducer as UserReducer } from './store/user/user.reducer';
import { UserEffects } from './store/user/user.effects';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideAnimations(),
        provideStore(),
        provideState('auth', AuthReducer),
        provideState('spinner', SpinnerReducer),
        provideState('user', UserReducer),
        provideEffects([AuthEffects, UserEffects]),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
    ]
};
