const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/env')

const UserModel = require("../model/user.model")

const { compareHash } = require('../utils/hashProvider')

const login = async(req, res) => {
    
    try{
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email }).lean();

        const loginErrorMessage = {
                error: "@authenticate/login",
                message: "E-mail ou senha inválidos"
            }

        if(!user) {
            return res.status(401).json(loginErrorMessage);
        };

        const isValidPassword = await compareHash(password, user.password);

        if(!isValidPassword) {
            return res.status(401).json(loginErrorMessage);
        };

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: "5h",
        });

        delete user.password;

        return res.json({ ...user, token });

    }catch(error){

        return res.status(500).json({
            error: "@authenticate/server-error",
            message: "Ocorreu um erro interno ao tentar realizar o login"
        });
    }
};

module.exports = {
    login,
}