const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { notes } = require('../../db/db');
const { createNote, findNote, updateNote, deleteNote } = require('../../lib/notes');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {

    // creates new note if id exists, otherwise edits existing note
    if (!req.body.id) {
        req.body.id = uuidv4();
        createNote(req.body, notes);
    } else {
        updateNote(req.body, notes);
    }

    res.json(req.body);
});

router.delete('/notes/:id', (req, res) => {
    const note = findNote(req.params.id, notes);

    deleteNote(note, notes);
    res.json();
});

module.exports = router;