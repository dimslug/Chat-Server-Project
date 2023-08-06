const router = require('express').Router();
const validateSessions = require('../middleware/validate-session');
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
router.post('/', validateSessions, async (req, res) => {

    try {
        const { title, description, messages } = req.body;

        const room = new Room({
            title, description, messages, ownerID : req.user.id
        });

        const newRoom = await room.save();

        res.status(200).json({
            newRoom,
            message: `${newRoom.title} added to collection`
        });
    } catch (err) {
        errorResponse(res, err);
    }
})

// TODO Get One Room
router.get('/:title', async (req, res) =>{
    try {
        const { title } = req.params;
        const getRoom = await Room.findOne({title: title});

        getRoom ?
            res.status(200).json({
                    getRoom
            }) :
            res.status(404).json({
                message: `no room found`
            })
    } catch (err) {
        errorResponse(res, err)
    }
})

// TODO Get all Rooms
router.get('/', async(req, res) => {
    try {
        const getAllRooms = await Room.find();

        getAllRooms ?
            res.status(200).json({
                getAllRooms
            }) :
            res.status(404).json({
                message : `No Room(s) Found`
            });
    } catch (err) {
        console.error(res, err);
    }
})

// TODO Update a room

router.patch('/:id', validateSessions, async(req, res) => {
    try {
        const { id } = req.params;

        const filter = {_id: id, ownerID: req.user.id};

        const info = req.bodyl

        const returnOption = {new: true};

        const update = await Room.findOneAndUpdate(filter, info, returnOption);

        res.status(200).json({
            message: `${update.title} Updated!`,
            update
        })
    } catch (err) {
        errorResponse(res, err);
    }
})


// TODO Delete a Room

router.delete('/:id', validateSessions, async(req, res) => {
    try {
        const { id } = req.params;
        
        const deleteRoom = await Room.deleteOne({_id: id, ownerID: req.user._id});

        deleteRoom.deleteCount ?
            res.status(200).json({ message: 'Movie removed'}) :
            res.status(404).json({message: "No room in collection"})

    } catch (err) {
        errorResponse(res, err);
    }
})



module.exports = router;