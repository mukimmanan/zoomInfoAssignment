const mongoose = require('mongoose')
const Schema = mongoose.Schema

const File = new Schema({
    content: {
        type: String,
        required: true
    },

    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },

    folderid: {
        type: Schema.Types.ObjectId,
        ref: 'Folder',
        required: false,
        index: true
    }

}, {timestamps: true})

module.exports = Schema.model("File", File)
