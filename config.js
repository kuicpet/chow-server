require("dotenv").config();

module.exports = {
    MONGOdb: process.env.MONGO_DB,
    SECRET_KEY: process.env.SECRET_KEY
}