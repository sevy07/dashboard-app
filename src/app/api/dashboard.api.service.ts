import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { Dashboard } from '../models';

const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class DashboardApiService {

  dashboardsUrl = 'api/dashboards';  // URL to web api

  constructor(private http: HttpClient) {
  }

  getDashboards(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(this.dashboardsUrl).pipe(
      catchError(this.handleError)
    );
  }

  // This get-by-id will 404 when id not found
  getDashboard(id: string): Observable<Dashboard> {
    const url = `${this.dashboardsUrl}/${id}`;
    return this.http.get<Dashboard>(url).pipe(
      catchError(this.handleError)
    );
  }

  // This get-by-id does not 404; returns undefined when id not found
  getDashboardNo404(id: string): Observable<Dashboard> {
    const url = `${this.dashboardsUrl}/?id=${id}`;
    return this.http.get<Dashboard[]>(url).pipe(
      map(dashboards => dashboards[0] as Dashboard),
      catchError(this.handleError)
    );
  }

  addDashboard(dashboard: Dashboard): Observable<Dashboard> {

    return this.http.post<Dashboard>(this.dashboardsUrl, dashboard, cudOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteDashboard(dashboard: Dashboard | string): Observable<Dashboard> {
    const id = typeof dashboard === 'string' ? dashboard : dashboard.id;
    const url = `${this.dashboardsUrl}/${id}`;

    return this.http.delete<Dashboard>(url, cudOptions).pipe(
      catchError(this.handleError)
    );
  }

  searchDashboards(term: string): Observable<Dashboard[]> {
    term = term.trim();
    // add safe, encoded search parameter if term is present
    const options = term ?
      { params: new HttpParams().set('title', term) } : {};

    return this.http.get<Dashboard[]>(this.dashboardsUrl, options).pipe(
      catchError(this.handleError)
    );
  }

  updateDashboard(dashboard: Dashboard): Observable<null | Dashboard> {
    return this.http.put<Dashboard>(this.dashboardsUrl, dashboard, cudOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    // and reformat for user consumption
    console.error(error); // log to console instead
    return throwError(error);
  }
}
