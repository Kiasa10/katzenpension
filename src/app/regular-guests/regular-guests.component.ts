import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RegularGuestComponent } from './regular-guest/regular-guest.component';
import { Guest } from './guest.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-regular-guests',
  imports: [RegularGuestComponent],
  templateUrl: './regular-guests.component.html',
  styleUrl: './regular-guests.component.css',
})
export class RegularGuestsComponent implements OnInit {
  error = signal('');
  guests = signal<Guest[] | undefined>(undefined);
  api = inject(ApiService);
  destroyRef = inject(DestroyRef);
  isFetching = signal(false);

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.api.loadGuests().subscribe({
      next: (guests) => {
        this.guests.set(guests);
      },
      error: (err: Error) => {
        this.error.set(err.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
