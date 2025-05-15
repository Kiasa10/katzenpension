import { Routes } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { RegularGuestsComponent } from './regular-guests/regular-guests.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookingComponent } from './booking/booking.component';
import { FaqComponent } from './faq/faq.component';
import { GuestbookComponent } from './guestbook/guestbook.component';
import { NewCommentComponent } from './guestbook/new-comment/new-comment.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'rooms',
    component: RoomsComponent,
  },
  {
    path: 'guests',
    component: RegularGuestsComponent,
  },
  {
    path: 'guestbook',
    component: GuestbookComponent,
  },
  {
    path: 'guestbook/new',
    component: NewCommentComponent,
  },
  {
    path: 'booking',
    component: BookingComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
