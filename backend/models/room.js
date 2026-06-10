import mongoose from "mongoose";
const { Schema, model } = mongoose;

const RoomSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  descriptionShort: {
    type: String,
    required: true,
  },
  descriptionLong: {
    type: String,
    required: true,
  },
  catsPossible: {
    type: Number,
    required: true,
  },
});

const Room = model("Room", RoomSchema);
export default Room;
