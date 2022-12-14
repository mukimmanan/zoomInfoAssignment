const moongoose = require("mongoose")
const Schema = moongoose.Schema

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

module.exports = moongoose.model("Folder", Folder)