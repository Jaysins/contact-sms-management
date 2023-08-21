const mongoose = require('mongoose');

const contactGroupSchema = new mongoose.Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    active: {type: Boolean, required: false, default: true},
    dateCreated: {type: Date, default: Date.now},
    lastUpdated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('ContactGroup', contactGroupSchema);
