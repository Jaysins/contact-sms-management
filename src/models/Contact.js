const mongoose = require('mongoose');
const baseSchema = require("../base/model")

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    group: {
        type: mongoose.Types.ObjectId,
        ref: "ContactGroup",
        required: false
    }
});

contactSchema.add(baseSchema); // Extend with the common fields

module.exports = mongoose.model('Contact', contactSchema);
