import { Component, input } from '@angular/core';
import { Guest } from '../guest.model';

@Component({
  selector: 'app-regular-guest',
  imports: [],
  templateUrl: './regular-guest.component.html',
  styleUrl: './regular-guest.component.css',
})
export class RegularGuestComponent {
  guest = input.required<Guest>(); // Nicht selected guest, sind ja nicht ausgewählt
}
