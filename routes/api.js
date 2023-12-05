const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const generateShortId = require('../helpers/uuid');

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
            id: generateShortId(),
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
            newNote.id = generateShortId();

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

// DELETE Request /api/notes/:id receives a query parameter containing the id of a note to delete. 
// ....In order to delete a note, read all notes from the db.json file, remove the note with the given id property, 
// ....& then rewrite the notes to the db.json file.
router.delete('/notes/:id', (req,res) => {
    // Log that a DELETE request was received
    console.info(`${req.method} request received to delete note`);

   // Get ID of the note that will be deleted
   const noteId = req.params.id;

   fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        // Returns 500 error if there's an error reading notes
        return res.status(500).json({ error: 'There was an error reading notes' })
    }
    let notes = JSON.parse(data);
    // Removes the target note to be deleted
    notes = notes.filter((note) => note.id !== noteId);
    
    // Write data from db.json after target note is deleted
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'There was an error writing to db.json file' })
        }
        return res.json({ success: true });
    });
   });
});

module.exports = router;