const express = require('express');
const router = express.Router();
const contactGroupService = require("../services/contactGroup")
const contactService = require("../services/contact")
const {StatusCodes} = require("http-status-codes");
const { BadRequestError} = require("../errors");

router.post('/', async (req, res) => {
    const {contacts, groupCode} = req.body;

    if (!contacts || !Array.isArray(contacts)){
        throw new BadRequestError("Missing required field contacts")
    }
    if (!groupCode){
        throw new BadRequestError("Missing required field group code")
    }
    const group = await contactGroupService.getContactGroup(groupCode)

    if (!group){
        throw new BadRequestError("Invalid Group code provided")
    }

    await contactService.bulkUpdateContact(contacts, {"group": groupCode})

    res.status(StatusCodes.OK).json({"status": "successful"})
})

module.exports = router;
