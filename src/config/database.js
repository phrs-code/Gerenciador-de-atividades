const mongoose = require("mongoose");

const { MONGO_DB_URI } = require('./env')

mongoose.connect(
    MONGO_DB_URI,
    {
        dbName: "name_db",
        autoIndex: true
    }
);

mongoose.connection.on("connected", () => {
    console.log("Database connection sucessfully");
});

mongoose.connection.on("error", (err) => {
    console.log("Failed to connect database: ", err);
});