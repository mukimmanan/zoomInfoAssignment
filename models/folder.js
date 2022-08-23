const moongoose = require("mongoose")
const Schema = moongose.Schema

const Folder = new Schema({
    name: {
        type: String,
        required: true
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})

module.exports = moongose.mode("Folder", Folder)