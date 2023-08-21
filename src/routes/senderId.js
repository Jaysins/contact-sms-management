const express = require('express');
const router = express.Router();
const senderIdService = require("../services/senderId")
const {StatusCodes} = require("http-status-codes");
const {NotFoundError, UnauthenticatedError} = require("../errors");


router.get('/', async (req, res) => {
    // Implement fetching senderIds from the database
    const senderIds = await senderIdService.getAllSenderIds(req.user);
    res.status(StatusCodes.CREATED).json({"results": senderIds})
});

router.get('/:id', async (req, res) => {
    // Implement fetching senderIds from the database
    const {id: senderId} = req.params
    const senderId_ = await senderIdService.getSenderId(senderId);
    if (!senderId_) {
        throw new NotFoundError("Requested Resource does not exist")
    }
    if (senderId_.user._id.toString() !== req.user.userId) {
        throw new UnauthenticatedError("You are not authorized to access this resource")
    }
    res.status(StatusCodes.OK).json(senderId_)
});

router.post('/', async (req, res) => {
    const {name} = req.body;
    const newContact = await senderIdService.createSenderId(name, req.user);
    res.status(StatusCodes.OK).json(newContact)
})

router.post('/:id', async (req, res) => {
    const {name} = req.body;
    const {id: senderId} = req.params
    const updatedData = {}
    const senderId_ = await senderIdService.getSenderId(senderId)
    if (!senderId) {
        throw new NotFoundError(`Requested resource with id: ${senderId} not found`)
    }

    if (senderId_.user._id.toString() !== req.user.userId) {
        throw new UnauthenticatedError("You are not authorized to access this resource")
    }

    if (name) {
        updatedData.name = name
    }

    if (!updatedData) {
        return senderId
    }

    const updatedSenderId = await senderIdService.updateSenderId(senderId, updatedData);
    res.status(StatusCodes.OK).json(updatedSenderId)
})


module.exports = router;
