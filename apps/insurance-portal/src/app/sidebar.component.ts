import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '@ng-journal/shared/ui-pipes';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FeatureFlagDirective } from '@ng-journal/shared/data-access';
import { FeatureFlag } from '@ng-journal/shared/utils-feature-flags';

interface RouteMetaData {
  path: string;
  icon: 'plus' | 'list' | 'home';
  label: string;
}

interface RoutingConfig {
  domain: string;
  routes: RouteMetaData[];
}

const createMetaData: RouteMetaData = {
  path: 'create',
  icon: 'plus',
  label: 'Create',
};

const listMetaData: RouteMetaData = {
  path: 'list',
  icon: 'list',
  label: 'List',
};

@Component({
  selector: 'ng-journal-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    CapitalizePipe,
    RouterLink,
    RouterLinkActive,
    FeatureFlagDirective,
  ],
  template: `<nav>
    <ul *ngFor="let config of routingConfigs" class="list-none w-full p-1">
      <li class="">
        <div class="font-medium">{{ config.domain | capitalize }}</div>
        <hr class="mb-1" />
        <ng-container *ngFor="let route of config.routes">
          <ng-container
            *ngJournalFeatureFlag="buildFeatureFlag(config.domain, route.path)"
          >
            <div
              [routerLink]="
                config.domain !== 'General'
                  ? [config.domain, route.path]
                  : 'home'
              "
              [routerLinkActive]="
                config.domain !== 'General'
                  ? [config.domain, route.path]
                  : 'home'
              "
              #rl="routerLinkActive"
              class="p-1 mb-1 rounded-md w-full hover:bg-primary-400"
              [ngClass]="
                rl.isActive ? 'bg-primary-600 border border-primary-400' : ''
              "
            >
              <i [class]="'mr-2 fa-solid fa-' + route.icon"></i>
              {{ route.label }}
            </div>
          </ng-container>
        </ng-container>
      </li>
    </ul>
  </nav> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly routingConfigs: RoutingConfig[] = [
    {
      domain: 'General',
      routes: [
        {
          path: '',
          icon: 'home',
          label: 'Home',
        },
      ],
    },
    {
      domain: 'contract',
      routes: [listMetaData, createMetaData],
    },
    {
      domain: 'claim',
      routes: [listMetaData, createMetaData],
    },
    {
      domain: 'complaint',
      routes: [listMetaData, createMetaData],
    },
    {
      domain: 'customer',
      routes: [listMetaData],
    },
  ];

  buildFeatureFlag(domain: string, path: string): FeatureFlag | null {
    if (domain === 'General') return null;
    return `${domain}-${path}` as FeatureFlag;
  }
}
