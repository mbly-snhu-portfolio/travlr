import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private readonly apiBase = '/api';

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBase}/trips`);
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBase}/trips/${encodeURIComponent(tripCode)}`);
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.apiBase}/trips`, this.toPayload(trip));
  }

  updateTrip(tripCode: string, trip: Partial<Trip>): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.apiBase}/trips/${encodeURIComponent(tripCode)}`,
      this.toPayload(trip)
    );
  }

  deleteTrip(tripCode: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/trips/${encodeURIComponent(tripCode)}`);
  }

  private toPayload(trip: Partial<Trip>): Partial<Trip> {
    const { _id, ...payload } = trip ?? {};

    if (payload.start instanceof Date) {
      payload.start = payload.start.toISOString();
    }

    return payload;
  }
}
