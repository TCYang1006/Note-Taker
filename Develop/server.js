const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;


//Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extneded: true }));
app.use(express.json());


//Routes
//===============================================
fs.readFile("db/db.json", "utf8", (err, data) => {

    if (err) throw err;
    //Data
    var notes = JSON.parse();

    app.get('/notes', (req, res) => {
        const route = path.join(__dirname, '../public/notes.html');
        res.sendFile(route);
    });

    app.get('*', (req, res) => {
        const way = path.join(__dirname, '../public/index.html');
        res.sendFile(way);
    });


    //TODO: create route to return all saved notes as JSON
    app.get('/api/notes', (req, res) => {
        res.json(notes);
    });

    //TODO: create route to save new notes
    app.post('/api/notes', (req, res) => {
        let newNote = req.body;
        notes.push(newNote);
        res.json(newNote);
        fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
            if (err) throw err;
            return;
        });
    });

    //TODO: create route to get a single note from id
    app.get('/api/notes/:id', (req, res) => {
        //since human don't think of array starting in position zero
        const chosen = (req.params.id - 1);
        res.json(notes[chosen]);
    });

    //TODO: create route to delete a note from id
    app.delete('/api/notes/:id', (req, res) => {
        //since human don't think of array starting in position zero
        const select = (req.params.id - 1);
        notes.splice(select, 1);
        fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
            if (err) throw err;
            return;
        });
    });
});

//Listener
app.listen(PORT, () => {
    console.log(`App listening on Port ${PORT}`);
});