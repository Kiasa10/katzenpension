import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from './rooms/room.model';
import { catchError, map, throwError } from 'rxjs';
import { Guest } from './regular-guests/guest.model';
import { Booking } from './booking/booking.model';
import { Comment } from './guestbook/comment/comment.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  loadRooms() {
    return this.fetchRooms(
      this.apiUrl + '/rooms',
      'Die Räume konnten nicht geladen werden. Bitte versuchen Sie es später nochmal!'
    );
  }

  private fetchRooms(url: string, errorMessage: string) {
    return this.httpClient.get<{ rooms: Room[] }>(url).pipe(
      map((res) => res.rooms),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  loadGuests() {
    return this.fetchGuests(
      this.apiUrl + '/guests',
      'Die Stammgäste konnten nicht geladen werden. Bitte versuchen Sie es später nochmal!'
    );
  }

  private fetchGuests(url: string, errorMessage: string) {
    return this.httpClient.get<{ guests: Guest[] }>(url).pipe(
      map((res) => res.guests),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  loadComments() {
    return this.fetchComments(
      this.apiUrl + '/guestbook',
      'Die Kommentare konnten nicht geladen werden. Bitte versuchen Sie es später nochmal!'
    );
  }

  private fetchComments(url: string, errorMessage: string) {
    return this.httpClient.get<{ comments: Comment[] }>(url).pipe(
      map((res) => res.comments),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  sendComment(commentForm: Comment) {
    return this.httpClient
      .post(this.apiUrl + '/guestbook/new', commentForm)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(
            () =>
              new Error(
                'Ups, das hat nicht funktioniert. Bitte versuchen Sie es später nochmal!'
              )
          );
        })
      );
  }

  sendBooking(bookingForm: Booking) {
    return this.httpClient.post(this.apiUrl + '/booking', bookingForm).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(
          () =>
            new Error(
              'Ups, das hat nicht funktioniert. Bitte versuchen Sie es später nochmal!'
            )
        );
      })
    );
  }
}
