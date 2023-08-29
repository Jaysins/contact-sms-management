// noinspection SpellCheckingInspection

const mongoose = require('mongoose');

const baseSchema = new mongoose.Schema({
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});

// Add a virtual getter for 'id'
baseSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialized
baseSchema.set('toJSON', { virtuals: true });

baseSchema.set('toObject', { virtuals: true });

module.exports = baseSchema;
