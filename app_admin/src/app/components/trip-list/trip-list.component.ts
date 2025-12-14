import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Trip } from '../../models/trip';
import { TripDataService } from '../../services/trip-data.service';
import { TripCardComponent } from '../trip-card/trip-card.component';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TripCardComponent],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.css'
})
export class TripListComponent implements OnInit, OnDestroy {
  trips: Trip[] = [];
  loading = false;
  errorMessage: string | null = null;

  private readonly subscriptions = new Subscription();

  constructor(private tripData: TripDataService) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadTrips(): void {
    this.loading = true;
    this.errorMessage = null;

    const sub = this.tripData.getTrips().subscribe({
      next: (trips) => {
        this.trips = trips ?? [];
        this.loading = false;
      },
      error: (err: unknown) => {
        this.loading = false;
        this.errorMessage = err instanceof Error ? err.message : 'Failed to load trips';
      }
    });

    this.subscriptions.add(sub);
  }

  onDeleteTrip(tripCode: string): void {
    const ok = window.confirm(`Delete trip '${tripCode}'?`);
    if (!ok) return;

    const sub = this.tripData.deleteTrip(tripCode).subscribe({
      next: () => {
        this.trips = this.trips.filter((t) => t.code !== tripCode);
      },
      error: (err: unknown) => {
        this.errorMessage = err instanceof Error ? err.message : 'Failed to delete trip';
      }
    });

    this.subscriptions.add(sub);
  }
}
