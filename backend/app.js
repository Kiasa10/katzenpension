import express from "express";
import mongoose from "mongoose";
import Room from "./models/room.js";
import RegularGuest from "./models/regular-guest.js";
import cors from "cors";
import Comment from "./models/comment.js";
import Booking from "./models/booking.js";

const mongoUrl = "mongodb://localhost:27017/katzenpension";
const FRONTEND_URL = "http://localhost:4200";
const port = 3000;

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Mongo Connection open"))
  .catch((err) => {
    console.log("Error", err);
  });

const app = express();

const corsOptions = {
  origin: FRONTEND_URL,
};
app.options("*", cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
  console.log("We got a new Request!");
  next();
});

app.get("/guests", cors(corsOptions), async (req, res) => {
  const guests = await RegularGuest.find({});
  res.status(200).json({ guests });
});

app.get("/rooms", cors(corsOptions), async (req, res) => {
  const rooms = await Room.find({});
  res.status(200).json({ rooms });
});

app.get("/guestbook", cors(corsOptions), async (req, res) => {
  const comments = await Comment.find({});
  res.status(200).json({ comments });
});

app.post("/guestbook/new", cors(corsOptions), async (req, res) => {
  try {
    const comment = new Comment({
      headline: req.body.headline,
      username: req.body.username,
      content: req.body.content,
      timestamp: req.body.timestamp,
    });
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
});

app.post("/booking", cors(corsOptions), async (req, res) => {
  try {
    const rooms = await Room.find({});
    const booking = new Booking({
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      selectedRoom: req.body.selectedRoom,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      street: req.body.street,
      number: req.body.number,
      postalCode: req.body.postalCode,
      city: req.body.city,
      email: req.body.email,
      phone: req.body.phone,
      catAmount: req.body.catAmount,
      medication: req.body.medication,
      vaccination: req.body.vaccination,
    });
    const roomExists = rooms.some(
      (room) => room._id.toString() === booking.selectedRoom
    );
    if (roomExists) {
      await booking.save();
      res.status(200).json(booking);
    } else {
      res.status(400).send("error");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
});

app.get("*", (req, res) => {
  res.status(404).send("Error - 404");
});

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
