const jwt = require('jsonwebtoken')

const { usersDatabase } = require('./users.controllers')

const { compareHash } = require('../utils/hashProvider')

const login = async(req, res) => {
    const { email, password } = req.body;

    const user = usersDatabase.find(u => u.email === email);

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
    const token = jwt.sign(user, 'secret', {
        expiresIn: "5h",
    });

    delete user.password;

   return res.json({ ... user, token });
};

module.exports = {
    login,
}