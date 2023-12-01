const notes = require('express').Router();
const fs = require('fs');
const path = require('path');

// GET /api/notes reads the db.json file & returns all saved notes as JSON
notes.get('/', (req, res) => {
    // Read db.json
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.err(err);
            // Returns 500 error if there's an error getting notes
            return res.status(500).json({ error: 'There was an error getting notes' })
        }
        // Parse JSON data (notes) to an object
        const notes = JSON.parse(data);
        // Send notes to client as response
        res.json(notes);
    })
});
