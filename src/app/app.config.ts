import {ApplicationConfig, LOCALE_ID, Provider, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter, provideNativeDateAdapter} from "@angular/material/core";


import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from "@angular/common";

registerLocaleData(localePt);

export function provideLocaleConfig(): Provider[] {
  return [
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide: DateAdapter,
      useClass: NativeDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
  ];
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideNativeDateAdapter(), provideHttpClient(withFetch())]

};
