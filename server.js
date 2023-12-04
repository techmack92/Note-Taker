const express = require('express');
const path = require('path');
const api = require('./routes/api');
const html = require('./routes/html');

const app = express();
const PORT = process.env.PORT || 3001;


// **********************************************************************
//                       Middleware:
// **********************************************************************
//
// To allow for parsing data in JSON 
app.use(express.urlencoded(({ extended: true })));
app.use(express.json());

// To serve static files from public directory
app.use(express.static('public'));

//
// **********************************************************************
//                          Routes:
// **********************************************************************
//

// To handle API routes
app.use('/api', api);

// To handle HTML routes
app.use('/', html);

//
// **********************************************************************
//                        Start Server:
// **********************************************************************
//
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT} 🚀`);
});
