import { EntityState } from '@ngrx/entity';
import { Dashboard } from '../../models/dashboard.model';

export enum StateStatus {
  ready = 'ready',
  loading = 'loading',
  failed = 'failed'
}

export interface State extends EntityState<Dashboard> {
  // additional entities state properties
  selectedDashboardId: number | null;

  stateStatus: StateStatus;
}
