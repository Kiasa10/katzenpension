import { Component, input } from '@angular/core';
import { Room } from '../room.model';

@Component({
  selector: 'app-room',
  imports: [],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent {
  room = input.required<Room>();
}
