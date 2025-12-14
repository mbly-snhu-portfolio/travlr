import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Trip } from '../../models/trip';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent {
  @Input({ required: true }) trip!: Trip;
  @Output() deleteTrip = new EventEmitter<string>();

  constructor(public auth: AuthService) {}

  get imageUrl(): string {
    return `/images/${this.trip.image}`;
  }

  onDeleteClick(): void {
    this.deleteTrip.emit(this.trip.code);
  }

}
