export interface Booking {
  id?: string;
  startDate: string;
  endDate: string;
  selectedRoom: string;
  firstName: string;
  lastName: string;
  street: string;
  number: string;
  postalCode: string;
  city: string;
  email: string;
  phone: string;
  catAmount: number;
  medication: string;
  vaccination: boolean;
}

export interface NewBooking {
  firstDay: Date;
  lastDay: Date;
  room: string;
  contactInfo: {
    firstName: string;
    lastName: string;
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    email: string;
    phoneNumber: string;
  };
  catInfo: {
    catAmount: number;
    medication: string;
    vaccination: boolean;
  };
}

export const rooms = [
  { value: 'commonRoom', label: 'Gemeinschaftsraum' },
  { value: 'singleRoom', label: 'Einzelzimmer' },
  { value: 'doubleRoom', label: 'Doppelzimmer' },
  { value: 'suite', label: 'Suite' },
  { value: 'lakeView', label: 'Seeblick' },
  { value: 'mountainView', label: 'Bergpanorama' },
];
