import { InjectionToken } from '@angular/core';

export const BaseUrl = new InjectionToken<string>('BaseUrl', {
  providedIn: 'root',
  factory: () => 'http://localhost:3000/api/',
});
