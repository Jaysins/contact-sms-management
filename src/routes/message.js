const express = require('express');
const router = express.Router();
const messageService = require("../services/message")
const {StatusCodes} = require("http-status-codes");
const {NotFoundError, UnauthenticatedError, BadRequestError} = require("../errors");


router.get('/', async (req, res) => {
    // Implement fetching messages from the database
    const messages = await messageService.getUserMessages(req.user);
    res.status(StatusCodes.OK).json({"results": messages})
});

router.get('/:id', async (req, res) => {
    // Implement fetching messages from the database
    const {id: messageId} = req.params
    const message = await messageService.getMessage(messageId);
    if (!message){
        throw new NotFoundError("Requested Resource does not exist")
    }
    if (message.user._id.toString() !== req.user.userId){
        throw new UnauthenticatedError("You are not authorized to access this resource")
    }
    res.status(StatusCodes.OK).json(message)
});

router.post('/', async (req, res) => {
    const {senderId, content, contactIds, contactGroupIds, type} = req.body;

    if (!content){
        throw new BadRequestError("Empty Message")
    }

    if (!contactIds && !contactGroupIds){
        throw new BadRequestError("No recipient")
    }

    const logMessage = await messageService.logMessage(senderId, content, req.user, contactIds,
        contactGroupIds, type);
    res.status(StatusCodes.CREATED).json(logMessage)
})


module.exports = router;
