const router = require('express').Router();
const Room = require('../models/messageRooms.models');

// error response function - to reduce written code
const errorResponse = (res, error) => {
    return (
        res.status(500).json({
            error: error.message
        })
    )
}

// TODO Post - Create new Room

// TODO Get One Room

// TODO Get all Rooms

// TODO Update a room

// TODO Delete a Room



modules.exports = router;