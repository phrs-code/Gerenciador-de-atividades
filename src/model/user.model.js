const mongoose = require("mongoose");

const { generateHash } = require("../utils/hashProvider")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    papel: {
        type: String
    },
    departamento: {
        type: String
    },
    anos_empresa: {
        type: Number
    },

},
{
    timestamps: true
}
);

UserSchema.pre("save", async function() {

    if (!this.isModified("password")) {
        return;
    }

    try {
        this.password = await generateHash(this.password);
    } catch (err) {
        throw new Error("Erro ao gerar hash da senha");
    }
});

UserSchema.pre("findOneAndUpdate", async function() {

    const doc = this;

    const userUpdated = doc.getUpdate();

    if(userUpdated.password) {
        userUpdated.password = await generateHash(userUpdated.password);
    }
})

module.exports = mongoose.model("users", UserSchema);