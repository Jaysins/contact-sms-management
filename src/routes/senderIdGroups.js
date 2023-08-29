const express = require('express');
const router = express.Router();
const senderIdGroupService = require("../services/senderIdGroup")
const {StatusCodes} = require("http-status-codes");
const {NotFoundError, UnauthenticatedError} = require("../errors");


router.get('/', async (req, res) => {
    // Implement fetching senderIds from the database
    const senderIds = await senderIdGroupService.getAllSenderIdGroups();
    res.status(StatusCodes.OK).json({"results": senderIds})
});


module.exports = router;
