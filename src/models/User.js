
const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
});

userSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.name },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    )
}

userSchema.methods.comparePassword = async function (candidate) {
    return await bcrypt.compare(candidate, this.password)
}

module.exports = mongoose.model('User', userSchema)

