const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// GET Request: /api/notes reads the db.json file & returns all saved notes as JSON
router.get('/notes', (req, res) => {
    // Read db.json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            // Returns 500 error if there's an error getting notes
            return res.status(500).json({ error: 'There was an error getting notes' })
        } 
        // Parse JSON data (notes) to an object
        const notes = JSON.parse(data);
        // Send notes to client as response
        res.json(notes);
    })
});

// POST Request /api/notes receives a new note to save on the request body, 
// ....adds it to the db.json file, & then returns the new note to the client
router.post('/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add note`);

    // Destructuring assignment for title & text in req.body
    const { title, text } = req.body;

    // Check if title & text are present
    if (title && text) {
        // Create a new note object
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                // Returns 500 error if there's an error getting notes
                return res.status(500).json({ error: 'There was an error getting notes' })
            } 
            // Parse JSON data (notes) to an object
            const notes = JSON.parse(data);

            // Assign unique ID to new notes
            newNote.id = uuidv4();

            // Add newNote object to notes array
            notes.push(newNote);

            // Write to db.json file
            fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
                if (err) {
                    console.err(err);
                    // Returns 500 error if there's an error writing to db.json file
                    return res.status(500).json({ error: 'There was an error writing to db.json file' })
                }
                // Send the new note as a response
                res.json(newNote); 
            });
        });
    }  else {
        // Returns 400 error if title or text is missing
        res.status(400).json({ error: 'Title and text are required' });
    }  
});

module.exports = router;