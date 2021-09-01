const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { notes } = require('./data/db')
//port for app.listen
const PORT = process.env.PORT || 3000;
const { createNewNote, validateNote, findById} = require('./lib/notes')


//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming json data
app.use(express.json());

//middleware to allow server access to all files in public 
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.send(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if(result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.post('/api/notes', (req, res) => {
    req.body.id = uuidv4();

    
    if(!validateNote(req.body)) {
        res.status(400).send('This note was not properly formatted')
    } else {
        const note = createNewNote(req.body, notes);
        console.log(note);
        res.json(note);
    }
});

// app.delete('/api/notes', (req, res){
//     res.send('DELETE Request Called')
// })


app.listen(PORT, () => {
    console.log(`WE HERE @ ${PORT}`)
})