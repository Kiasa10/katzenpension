import mongoose from "mongoose";
const { Schema, model } = mongoose;

const BookingSchema = new Schema({
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  selectedRoom: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  catAmount: {
    type: String,
    enum: ["one", "two", "three", "four"],
    required: true,
  },
  medication: {
    type: String,
  },
  vaccination: {
    type: Boolean,
    required: true,
  },
});

const Booking = model("Booking", BookingSchema);
export default Booking;
