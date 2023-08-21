// noinspection JSUnresolvedReference

const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserService {

    async createUser(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword});
        user.token = user.createJWT();
        return user;
    }

    async getUserByEmail(email) {
        return User.findOne({email});
    }

    async loginUser(email, password) {
        const user = await this.getUserByEmail(email);

        if (user && user.comparePassword(password)){
            user.token = user.createJWT()
            return user
        }
    }
}

module.exports = new UserService();
