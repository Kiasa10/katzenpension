export interface Booking {
  _id?: string;
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
  catAmount: string;
  medication: string;
  vaccination: boolean;
}
