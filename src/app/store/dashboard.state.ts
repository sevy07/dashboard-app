import { EntityState } from '@ngrx/entity';
import { Dashboard } from '../models';

export enum StateStatus {
  ready = 'ready',
  loading = 'loading',
  failed = 'failed'
}

export interface DashboardState extends EntityState<Dashboard> {
  // additional entities state properties
  selectedDashboardId: string | null;

  stateStatus: StateStatus;
}
