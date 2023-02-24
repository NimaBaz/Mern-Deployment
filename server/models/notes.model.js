const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [2, "Title must be 2 characters long"],
    },
    description: {
        type: String,
        required: [true, "Description required"],
        minlength: [3, "Description line must be at least 3 characters long"],
        maxlength: [255, "Body must contain max of 255 character"]
    }
}, {timestamps: true})

module.exports = mongoose.model('Note', NoteSchema)