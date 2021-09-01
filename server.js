const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
//port for app.listen
const PORT = process.env.PORT || 3000;
const app = express()



//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));


//middleware to allow server access to all files in public 
app.use(express.static('public'));

//parse incoming json data
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/notes.html'));
// });

// app.get('/api/notes', (req, res) => {
//     res.send(notes);
// });

// app.get('/api/notes/:id', (req, res) => {
//     const result = findById(req.params.id, notes);
//     if(result) {
//         res.json(result);
//     } else {
//         res.send(404);
//     }
// });

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// })

// app.post('/api/notes', (req, res) => {
//     req.body.id = uuidv4();

    
//     if(!validateNote(req.body)) {
//         res.status(400).send('This note was not properly formatted')
//     } else {
//         const note = createNewNote(req.body, notes);
//         res.json(note);
//     }
// });

// app.delete('/api/notes/:id', (req, res) => {
//     const itemIndex  = notes.findIndex(({ id }) => id === req.params.id);
//     if (itemIndex >= 0) {
//       return notes.splice(itemIndex, 1);
//     }
// })


app.listen(PORT, () => {
    console.log(`WE HERE @ ${PORT}`)
})