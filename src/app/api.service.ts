import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from './rooms/room.model';
import { catchError, throwError } from 'rxjs';
import { Guest } from './regular-guests/guest.model';
import { NewBooking } from './booking/booking.model';
import { Comment, NewComment } from './guestbook/comment/comment.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  loadRooms() {
    return this.fetchRooms(
      this.apiUrl + '/Room',
      'Die Räume konnten nicht geladen werden. Bitte versuchen Sie es später nochmal!',
    );
  }

  private fetchRooms(url: string, errorMessage: string) {
    return this.httpClient.get<Room[]>(url).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      }),
    );
  }

  loadGuests() {
    return this.fetchGuests(
      this.apiUrl + '/RegularGuest',
      'Die Stammgäste konnten nicht geladen werden. Bitte versuchen Sie es später nochmal!',
    );
  }

  private fetchGuests(url: string, errorMessage: string) {
    return this.httpClient.get<Guest[]>(url).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      }),
    );
  }

  loadComments() {
    return this.fetchComments(
      this.apiUrl + '/Comment',
      'Die Kommentare konnten nicht geladen werden. Bitte versuchen Sie es später nochmal!',
    );
  }

  private fetchComments(url: string, errorMessage: string) {
    return this.httpClient.get<Comment[]>(url).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      }),
    );
  }

  sendComment(newComment: NewComment) {
    console.log(newComment);
    return this.httpClient.post(this.apiUrl + '/Comment', newComment).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(
          () =>
            new Error(
              'Ups, das hat nicht funktioniert. Bitte versuchen Sie es später nochmal!',
            ),
        );
      }),
    );
  }

  sendBooking(newBooking: NewBooking) {
    console.log(newBooking);
    return this.httpClient.post(this.apiUrl + '/Booking', newBooking).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(
          () =>
            new Error(
              'Ups, das hat nicht funktioniert. Bitte versuchen Sie es später nochmal!',
            ),
        );
      }),
    );
  }
}
