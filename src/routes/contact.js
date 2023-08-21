const express = require('express');
const router = express.Router();
const contactService = require("../services/contact")
const {StatusCodes} = require("http-status-codes");
const {NotFoundError, UnauthenticatedError} = require("../errors");


router.get('/', async (req, res) => {
    // Implement fetching contacts from the database
    const contacts = await contactService.getAllContacts(req.user);
    res.status(StatusCodes.OK).json({"results": contacts})
});

router.get('/:id', async (req, res) => {
    // Implement fetching contacts from the database
    const {id: contactId} = req.params
    const contact = await contactService.getContact(contactId);
    if (!contact){
        throw new NotFoundError("Requested Resource does not exist")
    }
    if (contact.user._id.toString() !== req.user.userId){
        throw new UnauthenticatedError("You are not authorized to access this resource")
    }
    res.status(StatusCodes.OK).json(contact)
});

router.post('/', async (req, res) => {
    const {name, phoneNumber} = req.body;

    const newContact = await contactService.createContact(
        name, phoneNumber, req.user);
    res.status(StatusCodes.CREATED).json(newContact)
})

router.post('/:id', async (req, res) => {
    const {name, phoneNumber} = req.body;
    const {id: contactId} = req.params
    const updatedData = {}
    const contact = await contactService.getContact(contactId)
    if (!contact) {
        throw new NotFoundError(`Requested resource with id: ${contactId} not found`)
    }

    if (contact.user._id.toString() !== req.user.userId){
        throw new UnauthenticatedError("You are not authorized to access this resource")
    }

    if (name) {
        updatedData.name = name
    }

    if (phoneNumber) {
        updatedData.phoneNumber = phoneNumber
    }

    if (!updatedData) {
        return contact
    }

    const updatedContact = await contactService.updateContact(contactId, updatedData);
    res.status(StatusCodes.OK).json(updatedContact)
})


module.exports = router;
