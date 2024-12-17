const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    room:{
        type: String,
        required: true
    },    
    roomid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rooms",
        required: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    fromDate: {
        type: String,
        required: true
    },
    toDate: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    totalDays: {
        type: Number,
        required: true
    },

    transactionId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "booked"
    },
}, { timestamps: true });

const bookingModel = mongoose.model("bookings", bookingSchema);
module.exports = bookingModel;