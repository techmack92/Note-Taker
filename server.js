const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


// **********************************************************************
//                       Middleware:
// **********************************************************************
//
// To serve static files from public directory
app.use(express.static('public'));

// To allow for parsing data in JSON 
app.use(express.json());
app.use(express.urlencoded(({ extended: true })));

app.use('/api', api);

//
// **********************************************************************
//                          Routes:
// **********************************************************************
//

// To handle HTML routes for notes.html and index.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join('/public/index.html'))
});

//
// **********************************************************************
//                        Start Server:
// **********************************************************************
//
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT} 🚀`);
});
