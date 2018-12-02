import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

import * as dashboard1 from '../mock-data/dashboard-1.json';
import * as dashboard2 from '../mock-data/dashboard-2.json';
import * as dashboard3 from '../mock-data/dashboard-3.json';
import * as dashboard4 from '../mock-data/dashboard-4.json';

@Injectable({
  providedIn: 'root',
})
export class DashboardInMemoryDataApiService implements InMemoryDbService {
  createDb() {
    const dashboards = [
      dashboard1.default,
      dashboard2.default,
      dashboard3.default,
      dashboard4.default
    ];
    return { dashboards };
  }
}
