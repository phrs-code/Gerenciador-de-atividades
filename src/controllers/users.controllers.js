const uuid = require('uuid');

const { generateHash } = require('../utils/hashProvider')

let users = [];

const list = (req, res) => {
    return res.status(200).json(users);
};

const getById = (req, res) => {
    const { id } = req.params;

    const user = users.find(u => u.id === id);

    return res.status(200).json(user);
};

const create = async(req, res) => {
    const { name, email, password, age } = req.body;

    const id = uuid.v4();

    const hashedPassword = await generateHash(password);

    const user = {
        id,
        name,
        email,
        password: hashedPassword,
        age,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    users.push(user);

    return res.status(201).json(user);
};

const update = async(req, res) => {
    const { id } = req.params;

    const { name, email, password, age } = req.body;

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex < 0) {
        return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const { createdAt } = users[userIndex];

    const userUpdate = {
        id,
        name,
        email,
        password,
        age,
        createdAt,
        updatedAt: new Date()
    }

    if (password){
        userUpdate.password = await generateHash(password);
    }else{
        userUpdate.password = users[userIndex].password;
    }

    users[userIndex] = userUpdate;

    return res.status(200).json(userUpdate);
};

const remove = (req, res) => {
    const { id } = req.params;

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex < 0) {
        res.end("Usuário não encontrado.");
    };

    users.splice(userIndex, 1);

    return res.status(200).end("Usuário deletado com sucesso.")
}

module.exports = {
    list,
    getById,
    create,
    update,
    remove,
    usersDatabase: users
}