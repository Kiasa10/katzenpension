import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ApiService } from '../api.service';

import { rooms } from './booking.model';

const noWhitespace: ValidatorFn = (control: AbstractControl) => {
  return (control.value || '').trim().length ? null : { hasWhitespace: true };
};
const biggerEndDate: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const startDate = control.get('startDate')?.value;
  const endDate = control.get('endDate')?.value;

  if (!startDate || !endDate) {
    return null;
  }

  const startMs = new Date(startDate).getTime();
  const endMs = new Date(endDate).getTime();
  const oneDayInMs = 1000 * 60 * 60 * 24;

  return endMs >= startMs + oneDayInMs ? null : { startDateIsBigger: true };
};

const timespan: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const startDate = control.get('startDate');
  const endDate = control.get('endDate');
  const compareStart = new Date(startDate?.value).getTime();
  const compareEnd = new Date(endDate?.value).getTime();
  const twoWeeks = 1000 * 60 * 60 * 24 * 14;
  if (compareEnd - compareStart > twoWeeks) {
    return { timespanTooBig: true };
  }
  return null;
};

@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule],
  templateUrl: './booking.component.html',
  providers: [],
  styleUrl: './booking.component.css',
})
export class BookingComponent {
  api = inject(ApiService);
  destroyRef = inject(DestroyRef);
  rooms = rooms;
  success = signal(false);
  invalid = signal(false);
  initRoomVal = rooms[0].value;

  minDate = new Date().toISOString().slice(0, 10);
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    .toISOString()
    .slice(0, 10);

  form = new FormGroup({
    timeframe: new FormGroup(
      {
        startDate: new FormControl('', {
          validators: [Validators.required],
        }),
        endDate: new FormControl('', {
          validators: [Validators.required],
        }),
        selectedRoom: new FormControl(this.initRoomVal, {
          validators: [Validators.required],
        }),
      },
      { validators: [biggerEndDate, timespan] },
    ),
    contact: new FormGroup({
      firstName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(50),
          noWhitespace,
        ],
      }),
      lastName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(50),
          noWhitespace,
        ],
      }),
      street: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(50),
          noWhitespace,
        ],
      }),
      number: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(10),
          noWhitespace,
        ],
      }),
      postalCode: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(10),
          noWhitespace,
        ],
      }),
      city: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(50),
          noWhitespace,
        ],
      }),
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email,
          Validators.maxLength(100),
          noWhitespace,
        ],
      }),
      phone: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(20),
          noWhitespace,
        ],
      }),
    }),
    cat: new FormGroup({
      catAmount: new FormControl<1 | 2 | 3 | 4>(1, {
        validators: [Validators.required],
      }),
      medication: new FormControl(''),
      vaccination: new FormControl(false, {
        validators: [Validators.requiredTrue],
      }),
    }),
  });

  getFormData() {
    return this.form.controls;
  }

  updateValues() {
    this.form.controls.timeframe.patchValue({
      selectedRoom: this.initRoomVal,
    });
    this.form.controls.cat.patchValue({ catAmount: 1 });
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('invalid form');
      this.invalid.set(true);
      return;
    }
    this.invalid.set(false);
    const booking = this.form.value;
    console.log(booking.timeframe?.selectedRoom);
    const subscription = this.api
      .sendBooking({
        firstDay: new Date(booking.timeframe!.startDate!),
        lastDay: new Date(booking.timeframe!.endDate!),
        room: booking.timeframe?.selectedRoom ?? '',
        contactInfo: {
          firstName: booking.contact?.firstName ?? '',
          lastName: booking.contact?.lastName ?? '',
          street: booking.contact?.street ?? '',
          houseNumber: booking.contact?.number ?? '',
          postalCode: booking.contact?.postalCode ?? '',
          city: booking.contact?.city ?? '',
          email: booking.contact?.email ?? '',
          phoneNumber: booking.contact?.phone ?? '',
        },
        catInfo: {
          catAmount: booking.cat?.catAmount ?? 1,
          medication: booking.cat?.medication ?? '',
          vaccination: booking.cat?.vaccination ?? false,
        },
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        complete: () => {
          this.success.set(true);
          this.form.reset();
          this.updateValues();
          setTimeout(() => {
            this.success.set(false);
          }, 3000);
        },
      });
  }
}
