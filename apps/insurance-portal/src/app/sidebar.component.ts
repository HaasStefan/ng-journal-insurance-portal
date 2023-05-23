import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '@ng-journal/shared/ui-pipes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface RouteMetaData {
  path: string;
  icon: 'plus' | 'pencil' | 'list';
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
  imports: [CommonModule, CapitalizePipe, RouterLink, RouterLinkActive],
  template: `<nav>
    <ul *ngFor="let config of routingConfigs" class="list-none w-full p-1">
      <li class="">
        <div class="font-medium">{{ config.domain | capitalize }}</div>
        <hr class="mb-1" />
        <ng-container *ngFor="let route of config.routes">
          <div
            [routerLink]="[config.domain, route.path]"
            [routerLinkActive]="[config.domain, route.path]"
            #rl="routerLinkActive"
            class="p-1 mb-1 rounded-md w-full hover:bg-cyan-400"
            [ngClass]="rl.isActive ? 'bg-cyan-600 border border-cyan-400' : ''"
          >
            <i [class]="'mr-2 fa-solid fa-' + route.icon"></i> {{ route.label }}
          </div>
        </ng-container>
      </li>
    </ul>
  </nav>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly routingConfigs: RoutingConfig[] = [
    {
      domain: 'contract',
      routes: [listMetaData, createMetaData],
    },
    // {
    //   domain: 'claim',
    //   routes: [listMetaData, createMetaData],
    // },
    {
      domain: 'complaint',
      routes: [
        listMetaData,
        // , createMetaData
      ],
    },
    {
      domain: 'customer',
      routes: [listMetaData],
    },
  ];
}
