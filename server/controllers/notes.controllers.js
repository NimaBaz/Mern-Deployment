const Note = require('../models/notes.model');

module.exports.addNotes = (req, res) => {
    Note.create(req.body)
        .then(addNotes => {
            res.json({ results: addNotes })
        })
        .catch((err) => {
            res.status(400).json(err)
        });}

module.exports.showAllNotes = (req, res) => {
    Note.find()
        .then((showAllNotes) => {
            res.json({ results: showAllNotes })
        })
        .catch((err) => {
            res.status(400).json(err)
        });
}

module.exports.showNotes = (req, res) => {
    Note.findOne({ _id: req.params.id })
        .then(showNotes => {
            res.json({ results: showNotes })
        })
        .catch((err) => {
            res.status(400).json(err)
        });}


module.exports.updateNotes = (req, res) => {
    Note.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updateNotes => {
            res.json({ results: updateNotes })
        })
        .catch((err) => {
            res.status(400).json(err)
        });}

module.exports.deleteNotes = (req, res) => {
    Note.deleteOne({ _id: req.params.id })
        .then(deleteNotes => {
            res.json({ result: deleteNotes })
        })
        .catch((err) => {
            res.status(400).json(err)
        });}