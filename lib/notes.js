const fs = require('fs');
const path = require('path');

function createNewNote (body, notesArray) {
    console.log(body);
    const note = body

    notesArray.push(note)
    fs.writeFileSync(
        path.join(__dirname, '../data/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

function validateNote(note) {
    if(!note.title || typeof note.title !== 'string') {
        return false;
    }
    if(!note.text || typeof note.text !== 'string') {
        return false;
    }
    return note
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}
module.exports = { createNewNote, validateNote, findById }