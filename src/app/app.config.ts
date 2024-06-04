import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { UserEffects } from './state/app.effects';
import { authReducer, userReducer } from './state/app.reducer';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideStore(),
        provideState('auth', authReducer),
        provideState('users', userReducer),
        provideEffects([UserEffects]),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
    ]
};
