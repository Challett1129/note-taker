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
    if(!note.name || typeof note.name !== 'string') {
        return false;
    }
    if(!note.text || typeof note.text !== 'string') {
        return false;
    }
    return note
}
module.exports = { createNewNote, validateNote }