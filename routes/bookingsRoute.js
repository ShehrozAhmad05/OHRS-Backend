const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");
const stripe = require("stripe")("sk_test_51QQaCqDwNW0jUCig8uZpdYqoY2S0OlfFiMEEIVvmw8tXGsmpDANzURp50UNmc7eqc9bEUlqiozAPfzY2cALApjk800jDIoQlhV")
const { v4: uuidv4 } = require('uuid');

router.post("/bookroom", async (req, res) => {

    try {
        const formattedFromDate = moment(req.body.fromDate).format("DD-MM-YYYY");
        const formattedToDate = moment(req.body.toDate).format("DD-MM-YYYY");

        const customer = await stripe.customers.create({
            email: req.body.token.email,
            source: req.body.token.id
        });

        const payment = await stripe.charges.create({
            amount: req.body.totalAmount * 100,
            currency: 'USD',
            customer: customer.id,
            receipt_email: req.body.token.email

        }, { idempotencyKey: uuidv4() });

        if (payment) {
            const booking = new Booking({
                room: req.body.room.name,
                roomid: req.body.room._id,
                userid: req.body.userid,
                fromDate: formattedFromDate,
                toDate: formattedToDate,
                totalAmount: req.body.totalAmount,
                totalDays: req.body.totalDays,
                token: req.body.token,
                transactionId: "123456",
            });


            const newBooking = await booking.save();

            const roomtemp = await Room.findById(req.body.room._id);
            roomtemp.currentBookings.push({
                bookingid: newBooking._id,
                fromDate: formattedFromDate,
                toDate: formattedToDate,
                userid: req.body.userid,
                status: booking.status
            });
            await roomtemp.save();

            return res.send({
                message: "Room Booked Successfully",
                booking: newBooking,
                payment: payment
            });
        }
        else {
            throw new Error("Payment Failed");
        }

    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}
);

router.post("/getBookingsByUserId", async (req, res) => {
    try {
        const bookings = await Booking.find({ userid: req.body.userid });
        return res.send(bookings);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}   
);


router.post("/cancelbooking", async (req, res) => {

    const { bookingid, roomid } = req.body;

    try {
        const bookingitem = await Booking.findById(bookingid);
        const room = await Room.findById(roomid);

        if (bookingitem.status === "cancelled") {
            return res.send({ message: "Booking Already Cancelled" });
        }
        else {
            bookingitem.status = "cancelled";
            await bookingitem.save();

            const bookings = room.currentBookings
            const temp = bookings.filter((booking) => booking.bookingid.toString() !== req.body.bookingid);

            room.currentBookings = temp;
            await room.save();
            return res.send({ message: "Booking Cancelled Successfully" });
        }
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}
);

router.get("/getAllBookings", async (req, res) => {
    try {
        const bookings = await Booking.find({});
        return res.send(bookings);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}
); 


module.exports = router;