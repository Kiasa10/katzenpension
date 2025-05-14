import mongoose from "mongoose";
import Room from "./models/room.js";
import RegularGuest from "./models/regular-guest.js";
import Comment from "./models/comment.js";
import Booking from "./models/booking.js";

mongoose
  .connect("mongodb://localhost:27017/katzenpension")
  .then(() => console.log("Mongo Connection open"))
  .catch((err) => {
    console.log("Error", err);
  });

const seedRooms = async () => {
  await Room.deleteMany({});
  await Room.insertMany([
    {
      title: "Gemeinschaftsraum",
      imageUrl: "/images/roomimages/kiRoom20.jpg",
      cost: "10€",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veniam, a voluptates nisi ratione maxime libero nemo autem porro temporibus numquam cupiditate minima eligendi iste doloribus aliquam accusantium qui quasi! Hic reprehenderit adipisci soluta vitae labore, cupiditate libero sit vel ea dolores. Illo reiciendis, error magni sequi deleniti doloribus explicabo suscipit culpa fugit consequuntur enim ipsam dolorum atque! Ex, deleniti!",
    },
    {
      title: "Einzelzimmer",
      cost: "15€",
      imageUrl: "/images/roomimages/kiRoom3.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aut quaerat ullam, dolore magnam vero! Et, amet accusamus! Delectus molestiae officia reiciendis unde quis aspernatur amet earum nostrum blanditiis necessitatibus?",
    },
    {
      title: "Doppelzimmer",
      imageUrl: "/images/roomimages/kiRoom21.jpg",
      cost: "20€",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque placeat illo nulla eligendi reprehenderit? Facere delectus vero dolorum ab repudiandae, adipisci reiciendis doloremque rerum dolor. Ratione fugit eos cum blanditiis!",
    },
    {
      title: "Suite",
      imageUrl: "/images/roomimages/kiRoom10.jpg",
      cost: "25€",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem cumque atque exercitationem similique aperiam accusamus dolorem nesciunt soluta? Dignissimos libero officia suscipit inventore tempora autem nostrum voluptas, dicta neque earum! Rem veniam, a voluptates nisi ratione maxime libero nemo autem porro temporibus numquam cupiditate minima eligendi iste doloribus aliquam accusantium qui quasi! Hic reprehenderit adipisci soluta vitae labore, cupiditate libero sit vel ea dolores. Illo reiciendis, error magni sequi deleniti doloribus explicabo suscipit culpa fugit consequuntur enim ipsam dolorum atque! Ex, deleniti!",
    },
    {
      title: "Seeblick",
      imageUrl: "/images/roomimages/kiRoom2.jpg",
      cost: "20€",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit sequi temporibus unde maxime atque maiores culpa, ipsam at eum iste. Voluptas fugiat natus soluta illum temporibus iure libero ipsum laboriosam?",
    },
    {
      title: "Bergpanorama",
      imageUrl: "/images/roomimages/kiRoom30.jpg",
      cost: "20€",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum doloribus deleniti temporibus architecto fugit autem quos eligendi consequatur commodi, beatae voluptates libero doloremque molestias reprehenderit, consectetur accusamus incidunt ipsa excepturi.",
    },
  ])
    .then(() => {
      console.log("Room-Data inserted");
    })
    .catch((err) => {
      console.log(err);
    });
};

const seedGuests = async () => {
  await RegularGuest.deleteMany({});
  await RegularGuest.insertMany([
    {
      name: "Kiara",
      age: 14,
      imageUrl: "/images/guestimages/Kiara2.jpeg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quae impedit illo id, nam debitis, temporibus fuga non necessitatibus qui reiciendis. Dolores voluptate itaque maiores aliquam dignissimos minus nemo doloremque!",
    },
    {
      name: "Cleo",
      age: 14,
      imageUrl: "/images/guestimages/Cleo2.jpeg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aut quaerat ullam, dolore magnam vero! Et, amet accusamus! Delectus molestiae officia reiciendis unde quis aspernatur amet earum nostrum blanditiis necessitatibus?",
    },
    {
      name: "Piki",
      age: 18,
      imageUrl: "/images/guestimages/Piki.jpeg",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam quos tenetur itaque atque nostrum, voluptatum labore inventore adipisci tempora, ab similique assumenda minus ipsam enim quia ea aperiam distinctio officia.",
    },
    {
      name: "Gizmo",
      age: 11,
      imageUrl: "/images/guestimages/Gizmo.JPG",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam reiciendis numquam tempora unde, dolores officia veniam ipsum? Placeat temporibus doloremque amet. Aspernatur repudiandae velit dolor tempore aperiam unde, inventore et?",
    },
    {
      name: "Mona",
      age: 8,
      imageUrl: "/images/guestimages/Mona.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi minima voluptatem suscipit. Illum, beatae magni explicabo natus alias qui fugit! Saepe earum itaque excepturi maiores ipsa. Commodi dolor quis repellendus.",
    },
  ])
    .then(() => {
      console.log("Guest-Data inserted");
    })
    .catch((err) => {
      console.log(err);
    });
};

const clearComments = async () => {
  await Comment.deleteMany({})
    /*await Comment.insertOne({
    headline: "Toller Aufenthalt",
    username: "Maria",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi minima voluptatem suscipit. Illum, beatae magni explicabo natus alias qui fugit! Saepe earum itaque excepturi maiores ipsa. Commodi dolor quis repellendus.",
  }) */
    .then(() => {
      console.log("Comments deleted");
    })
    .catch((err) => {
      console.log(err);
    });
};

const clearBookings = async () => {
  await Booking.deleteMany({})
    .then(() => {
      console.log("Bookings deleted");
    })
    .catch((err) => {
      console.log(err);
    });
};

const seedDB = async () => {
  await seedRooms();
  await seedGuests();
  await clearComments();
  await clearBookings();
};

seedDB().then(() => mongoose.connection.close());
