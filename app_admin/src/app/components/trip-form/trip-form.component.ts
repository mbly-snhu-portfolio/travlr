import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Trip } from '../../models/trip';
import { TripDataService } from '../../services/trip-data.service';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './trip-form.component.html',
  styleUrl: './trip-form.component.css'
})
export class TripFormComponent implements OnInit, OnDestroy {
  mode: 'create' | 'edit' = 'create';
  loading = false;
  saving = false;
  errorMessage: string | null = null;

  private readonly subscriptions = new Subscription();
  private tripCode: string | null = null;

  form = this.fb.nonNullable.group({
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    length: ['', [Validators.required]],
    start: ['', [Validators.required]],
    resort: ['', [Validators.required]],
    perPerson: ['', [Validators.required]],
    image: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private trips: TripDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const sub = this.route.paramMap.subscribe((params) => {
      const code = params.get('tripCode');
      this.tripCode = code;

      if (code) {
        this.mode = 'edit';
        this.form.controls.code.disable();
        this.loadTrip(code);
      } else {
        this.mode = 'create';
        this.form.controls.code.enable();
      }
    });

    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get title(): string {
    return this.mode === 'create' ? 'Add trip' : `Edit trip (${this.tripCode ?? ''})`;
  }

  loadTrip(tripCode: string): void {
    this.loading = true;
    this.errorMessage = null;

    const sub = this.trips.getTrip(tripCode).subscribe({
      next: (trip) => {
        this.loading = false;
        this.form.patchValue(this.tripToForm(trip));
      },
      error: (err: unknown) => {
        this.loading = false;
        this.errorMessage = err instanceof Error ? err.message : 'Failed to load trip';
      }
    });

    this.subscriptions.add(sub);
  }

  onSubmit(): void {
    this.errorMessage = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;

    const payload = this.formToTrip();
    const request$ =
      this.mode === 'create'
        ? this.trips.addTrip(payload)
        : this.trips.updateTrip(this.tripCode ?? '', payload);

    const sub = request$.subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/trips']);
      },
      error: (err: unknown) => {
        this.saving = false;
        this.errorMessage = err instanceof Error ? err.message : 'Failed to save trip';
      }
    });

    this.subscriptions.add(sub);
  }

  private tripToForm(trip: Trip) {
    const startDate = this.toDateInputValue(trip.start);
    return {
      code: trip.code,
      name: trip.name,
      length: trip.length,
      start: startDate,
      resort: trip.resort,
      perPerson: trip.perPerson,
      image: trip.image,
      description: trip.description
    };
  }

  private formToTrip(): Trip {
    const raw = this.form.getRawValue();
    return {
      code: raw.code,
      name: raw.name,
      length: raw.length,
      start: new Date(raw.start).toISOString(),
      resort: raw.resort,
      perPerson: raw.perPerson,
      image: raw.image,
      description: raw.description
    };
  }

  private toDateInputValue(value: string | Date): string {
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.valueOf())) return '';
    return d.toISOString().slice(0, 10);
  }
}
