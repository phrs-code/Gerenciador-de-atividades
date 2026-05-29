const uuid = require('uuid');

const { generateHash } = require('../utils/hashProvider');

const UserModel = require('../model/user.model');

const list = async(req, res) => {

    try {
        const users = await UserModel.find({}, { password: 0 });
        res.json(users);

    } catch(error) {
        return res.status(400).json({
            error: "@users/list",
            message: "Failed to list users"
        });
    }
};

const getById = async(req, res) => {

    const { id } = req.params;

    try{

        const user = await UserModel.findById(id);

        if (!user) {
            throw new Error();
        }

        return res.json(user);

    } catch (error) {

        return res.status(200).json({
            error: "@user/getById",
            message: error.message || "User not found"
        });
    };
};

const create = async(req, res) => {
    const { name, email, password, age } = req.body;

    const hashedPassword = await generateHash(password);

    try{

        const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        age,
    });

    return res.status(201).json(user);

    } catch(error) {
        
        return res.status(400).json({
            error: "@user/create",
            message: error.message || "Failed to create user."
        })
    };
};

const update = async(req, res) => {
    const { id } = req.params;

    const { name, email, password, age } = req.body;

    try {
        const userUpdate = await UserModel.findByIdAndUpdate(id, {
            name,
            email,
            password,
            age
        }, 
        { new: true }
    );

        if (!userUpdate) {
            throw new error();
        }

        return res.json(userUpdate);

    } catch (error) {

        return res.status(400).json({
            error: "@user/update",
            message: error.message || "User not found"
        });
    };

};

const remove = async(req, res) => {

    const { id } = req.params;

    try {

        const userDeleted = await UserModel.findByIdAndDelete(id);

        if (!userDeleted) {
            throw new error();
        }

        return res.status(204).send();

    } catch (error) {

        return res.status(400).json({
            error: "@user/delete",
            message: error.message || "User not found"
        })
    }
}

module.exports = {
    list,
    getById,
    create,
    update,
    remove,
}