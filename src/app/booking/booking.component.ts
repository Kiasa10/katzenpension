import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
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
import { Room } from '../rooms/room.model';
import { HttpClient } from '@angular/common/http';

const noWhitespace: ValidatorFn = (control: AbstractControl) => {
  return (control.value || '').trim().length ? null : { hasWhitespace: true };
};
const biggerEndDate: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const startDate = control.get('startDate');
  const endDate = control.get('endDate');
  return new Date(startDate?.value) <= new Date(endDate?.value)
    ? null
    : { startDateIsBigger: true };
};

const timespan: ValidatorFn = (
  control: AbstractControl
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
export class BookingComponent implements OnInit {
  api = inject(ApiService);
  destroyRef = inject(DestroyRef);
  rooms = signal<Room[] | undefined>(undefined);
  httpClient = inject(HttpClient);
  success = signal(false);
  invalid = signal(false);
  initRoomVal = computed(() => this.rooms()?.[0]._id);

  ngOnInit() {
    const subscription = this.api.loadRooms().subscribe({
      next: (rooms) => {
        this.rooms.set(rooms);
        this.form.controls.timeframe.patchValue({
          selectedRoom: this.initRoomVal(),
        });
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  form = new FormGroup({
    timeframe: new FormGroup(
      {
        startDate: new FormControl('', {
          validators: [Validators.required],
        }),
        endDate: new FormControl('', {
          validators: [Validators.required],
        }),
        selectedRoom: new FormControl('', {
          validators: [Validators.required],
        }),
      },
      { validators: [biggerEndDate, timespan] }
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
      catAmount: new FormControl<'one' | 'two' | 'three' | 'four'>('one', {
        validators: [Validators.required],
      }),
      medication: new FormControl(''),
      vaccination: new FormControl(false, {
        validators: [Validators.requiredTrue],
      }),
    }),
  });

  createDate() {
    let minDate = new Date().toISOString().slice(0, 10);
    return minDate;
  }

  maxBookingDate() {
    const today = new Date();
    const oneYear = 1000 * 60 * 60 * 24 * 365;
    const calcDate = today.setTime(today.getTime() + oneYear);
    const maxEndDate = new Date(calcDate).toISOString().slice(0, 10);
    return maxEndDate;
  }

  getFormData() {
    return this.form.controls;
  }

  updateValues() {
    this.form.controls.timeframe.patchValue({
      selectedRoom: this.initRoomVal(),
    });
    this.form.controls.cat.patchValue({ catAmount: 'one' });
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('invalid form');
      this.invalid.set(true);
      return;
    }
    this.invalid.set(false);
    const booking = this.form.value;
    const subscription = this.api
      .sendBooking({
        startDate: booking.timeframe?.startDate ?? '',
        endDate: booking.timeframe?.endDate ?? '',
        selectedRoom: booking.timeframe?.selectedRoom ?? '',
        firstName: booking.contact?.firstName ?? '',
        lastName: booking.contact?.lastName ?? '',
        street: booking.contact?.street ?? '',
        number: booking.contact?.number ?? '',
        postalCode: booking.contact?.postalCode ?? '',
        city: booking.contact?.city ?? '',
        email: booking.contact?.email ?? '',
        phone: booking.contact?.phone ?? '',
        catAmount: booking.cat?.catAmount ?? '',
        medication: booking.cat?.medication ?? '',
        vaccination: booking.cat?.vaccination ?? false,
      })
      .subscribe({
        complete: () => {
          this.success.set(true);
          setTimeout(() => {
            this.success.set(false);
          }, 3000);
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe);
    this.form.reset();
    this.updateValues();
  }
}
