const express = require('express');
const router = express.Router();
const contactGroupService = require("../services/contactGroup")
const {StatusCodes} = require("http-status-codes");
const {NotFoundError, UnauthenticatedError} = require("../errors");


router.get('/', async (req, res) => {
    // Implement fetching contactGroups from the database
    const contactGroups = await contactGroupService.getAllContactGroups(req.user);
    res.status(StatusCodes.OK).json({"results": contactGroups})
});

router.get('/:id', async (req, res) => {
    // Implement fetching contactGroups from the database
    const {id: contactGroupId} = req.params
    const contactGroup = await contactGroupService.getContactGroup(contactGroupId);
    if (!contactGroup) {
        throw new NotFoundError("Requested Resource does not exist")
    }
    if (contactGroup.user._id.toString() !== req.user.userId) {
        throw new UnauthenticatedError("You are not authorized to access this resource")
    }
    res.status(StatusCodes.OK).json(contactGroup)
});

router.post('/', async (req, res) => {
    const {name} = req.body;
    const newContact = await contactGroupService.createContactGroup(name, req.user);
    res.status(StatusCodes.CREATED).json(newContact)
})

router.post('/:id', async (req, res) => {
    const {name} = req.body;
    const {id: contactGroupId} = req.params
    const updatedData = {}
    const contactGroup = await contactGroupService.getContactGroup(contactGroupId)
    if (!contactGroup) {
        throw new NotFoundError(`Requested resource with id: ${contactGroupId} not found`)
    }

    if (contactGroup.user._id.toString() !== req.user.userId) {
        throw new UnauthenticatedError("You are not authorized to access this resource")
    }

    if (name) {
        updatedData.name = name
    }

    if (!updatedData) {
        return contactGroup
    }

    const updatedContact = await contactGroupService.updateContactGroup(contactGroupId, updatedData);
    res.status(StatusCodes.OK).json(updatedContact)
})


module.exports = router;
