import { InjectionToken } from "@angular/core";

// todo: create real api
export const BaseUrl = new InjectionToken<string>('BaseUrl', {
    providedIn: 'root',
    factory: () => 'http://localhost:3333/api'
});