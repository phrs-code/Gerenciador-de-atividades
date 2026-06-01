const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/env')

const UserModel = require("../model/user.model")

const { compareHash } = require('../utils/hashProvider')

const login = async(req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).lean();

    const loginErrorMessage = {
            error: "@authenticate/login",
            message: "E-mail ou senha inválidos"
        }

    if(!user) {
        return res.status(400).json(loginErrorMessage);
    };

    const isValidPassword = await compareHash(password, user.password);

    if(!isValidPassword) {
        return res.status(400).json(loginErrorMessage);
    };

    const token = jwt.sign(user, JWT_SECRET, {
        expiresIn: "5h",
    });

    delete user.password;

   return res.json({ ... user, token });
};

module.exports = {
    login,
}