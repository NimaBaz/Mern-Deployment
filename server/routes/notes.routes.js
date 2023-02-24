const NoteController = require('../controllers/notes.controllers')

module.exports = (app) => {

    //CREATE
    app.post("/api/notes/new", NoteController.addNotes)

    //READ ALL
    app.get("/api/notes", NoteController.showAllNotes)

    //READ ONE
    app.get("/api/notes/:id", NoteController.showNotes)

    //UPDATE
    app.put("/api/notes/update/:id", NoteController.updateNotes)

    //DELETE
    app.delete("/api/notes/delete/:id", NoteController.deleteNotes)

}