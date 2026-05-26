const { compare, hash } = require("bcryptjs");

const generateHash = async(password) => {
    return hash(password, 8);
};

const compareHash = async(password, hashedPssword) => {
    return compare(password, hashedPssword);
}

module.exports = {
    generateHash,
    compareHash
}