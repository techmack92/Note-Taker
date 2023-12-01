const notes = require('express').Router();
const fs = require('fs');
const path = require('path');

// GET /api/notes reads the db.json file & returns all saved notes as JSON
