import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
} from './utils';
import { UserData } from './data/devices';
import { OrdersChartData } from './data/devices-chart';
import { ProfitChartData } from './data/detection-chart';
import { TrafficListData } from './data/traffic-list';
import { EarningData } from './data/live-detection';
import { OrdersProfitChartData } from './data/devices-all-chart';
import { TrafficBarData } from './data/traffic-bar';
import { ProfitBarAnimationChartData } from './data/detection-bar-animation-chart';
import { TemperatureHumidityData } from './data/temperature-humidity';
import { SolarData } from './data/solar';
import { TrafficChartData } from './data/traffic-chart';
import { UserService } from './mock/detected-devices.service';
import { OrdersChartService } from './mock/devices-chart.service';
import { ProfitChartService } from './mock/detection-chart.service';
import { TrafficListService } from './mock/traffic-list.service';
import { EarningService } from './mock/live-detection.service';
import { OrdersProfitChartService } from './mock/devices-all-chart.service';
import { TrafficBarService } from './mock/traffic-bar.service';
import { ProfitBarAnimationChartService } from './mock/detection-bar-animation-chart.service';
import { TemperatureHumidityService } from './mock/temperature-humidity.service';
import { SolarService } from './mock/solar.service';
import { TrafficChartService } from './mock/traffic-chart.service';
import { StatsBarService } from './mock/stats-bar.service';
import { StatsProgressBarService } from './mock/stats-progress-bar.service';
import { MockDataModule } from './mock/mock-data.module';
import { StatsProgressBarData } from './data/stats-progress-bar';
import { StatsBarData } from './data/stats-bar';




const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
  { provide: OrdersChartData, useClass: OrdersChartService },
  { provide: ProfitChartData, useClass: ProfitChartService },
  { provide: TrafficListData, useClass: TrafficListService },
  { provide: EarningData, useClass: EarningService },
  { provide: OrdersProfitChartData, useClass: OrdersProfitChartService },
  { provide: TrafficBarData, useClass: TrafficBarService },
  { provide: ProfitBarAnimationChartData, useClass: ProfitBarAnimationChartService },
  { provide: TemperatureHumidityData, useClass: TemperatureHumidityService },
  { provide: SolarData, useClass: SolarService },
  { provide: TrafficChartData, useClass: TrafficChartService },
  { provide: StatsBarData, useClass: StatsBarService },
  { provide: StatsProgressBarData, useClass: StatsProgressBarService },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      NbDummyAuthStrategy.setup({
        name: 'email',
        delay: 3000,
      }),
    ],

  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
