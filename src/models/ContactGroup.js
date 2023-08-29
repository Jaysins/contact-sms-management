const mongoose = require('mongoose');
const baseSchema = require("../base/model");

const contactGroupSchema = new mongoose.Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    active: {type: Boolean, required: false, default: true}
});

contactGroupSchema.add(baseSchema); // Extend with the common fields

module.exports = mongoose.model('ContactGroup', contactGroupSchema);
