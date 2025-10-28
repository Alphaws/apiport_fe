import {
  ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode,
  provideAppInitializer, inject
} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import {HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import {AuthService} from './services/auth.service';
//import {TranslationService} from './services/translation.service';
//import {TranslationLoaderService} from './services/translation-loader.service';
import {firstValueFrom, lastValueFrom, tap} from 'rxjs';
import {TranslationService} from './services/translation.service';
import {TranslationLoaderService} from './services/translation-loader.service';

const initializeTranslations = (
  translationService: TranslationService,
  loaderService: TranslationLoaderService
) => {
  return () => {
    const translations = loaderService.getTranslations();
    translationService.loadTranslations(translations);
  };
};

const initializeAuth = (authService: AuthService) => {
  return () => {
    // Load user from API on app startup
    return lastValueFrom(authService.loadUser().pipe());
  };
};

//
// export function initializeAppFactory(
//   authService: AuthService,
//   translationService: TranslationService,
//   loaderService: TranslationLoaderService
// ) {
//   return () => {
//     const auth = initializeAuth(authService)();
//     const translate = initializeTranslations(translationService, loaderService)();
//     return Promise.all([auth, translate]);
//   };
// }


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withFetch()
    ),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      })
    ),
    provideClientHydration(withEventReplay()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideAppInitializer(() => {
      console.log('appInitializer');
      const http = inject(HttpClient);
      const authService = inject(AuthService);
      const translationService = inject(TranslationService);
      const loaderService = inject(TranslationLoaderService);
      const auth = initializeAuth(authService)();
      const translate = initializeTranslations(translationService, loaderService)();
      return Promise.all([auth, translate]);
      // return () => {
      //
      // };

      //initializeAppFactory(authService, translationService, loaderService);

      //initializeAppFactory();
     // return;
      // return firstValueFrom(
      //   http
      //     .get("https://someUrl.com/api/user")
      //     .pipe(tap(user => console.log(user)))
      // );
    })
  ]
};
