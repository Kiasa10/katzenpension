import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RoomComponent } from "./room/room.component";
import { Room } from './room.model';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-rooms',
  imports: [RoomComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit {

  rooms = signal<Room[] | undefined>(undefined);
  error = signal("");
  private destroyRef = inject(DestroyRef);

  api = inject(ApiService);

  isFetching = signal(false);


  ngOnInit(){
    this.isFetching.set(true);
    const subscription = this.api.loadRooms().subscribe({
      next: (rooms) =>{
        this.rooms.set(rooms);
      },
      error: (err: Error) =>{
        this.error.set(err.message);
      },
      complete: () =>{
        this.isFetching.set(false);
      }
    });

    this.destroyRef.onDestroy(() =>{
      subscription.unsubscribe();
    })

  }

}

