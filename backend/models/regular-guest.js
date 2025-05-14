import mongoose from "mongoose";
const { Schema, model } = mongoose;

const RegularGuestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const RegularGuest = model("RegularGuest", RegularGuestSchema);
export default RegularGuest;
