const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    maxCount: {
        type: Number,
        required: true,
    },
    rentPerDay: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    roomType: {
        type: String,
        required: true,
    },
    imageUrls: [],
    currentBookings: [],

}, { timestamps: true });

const roomModel = mongoose.model("rooms", roomSchema);

module.exports = roomModel;