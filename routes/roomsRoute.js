const express = require("express");
const router = express.Router();

const Room = require("../models/room");

router.get("/getallrooms", async(req, res) => {
    try {
        const rooms = await Room.find();
        res.send(rooms);
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: "Something went wrong"});
    }
});

router.get("/getroombyid", async(req, res) => {
    const roomid = req.query.roomid;   

    try {
        const room = await Room.findById(roomid);
        res.send(room);
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: "Something went wrong"});
    }
});


router.post("/addroom", async(req, res) => {
    
    try {
        const newRoom = new Room(req.body);
        await newRoom.save();
        res.send('New room added successfully');
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: "Something went wrong"});
    }

}
);

module.exports = router;