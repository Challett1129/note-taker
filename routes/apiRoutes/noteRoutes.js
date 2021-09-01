const router = require("express").Router();
const { createNewNote, validateNote, findById } = require('../../lib/notes');
const { notes } = require('../../data/db.json');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    res.send(notes);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if(result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    req.body.id = uuidv4();

    
    if(!validateNote(req.body)) {
        res.status(400).send('This note was not properly formatted')
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    const itemIndex  = notes.findIndex(({ id }) => id === req.params.id);
    if (itemIndex >= 0) {
      return notes.splice(itemIndex, 1);
    }
})

module.exports = router;