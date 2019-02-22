/*
 * Title: Course API Implementaion using express. Routes are split in individual files.
 * Description:
 * We are using following built-in middleware functions
 * 1. express.json() 
 *    It parses incoming requests with JSON payloads and is based on body-parser.
 *    This middleware is available in Express v4.16.0 onwards.
 * 
 * 2. express.urlencoded()
 *    It parses incoming requests with urlencoded payloads
 *    and is based on body-parser.
 */

// Import Express
const express = require('express');
const app = express();
const morgan = require('morgan'); // Logging

const todos = require('./routes/todos');

//Use json middleware
app.use(express.json());
// Use the urlencoded middleware from express
// Parses request body in this form: key1=value1&key2=value2,
// and construct a json object
app.use(express.urlencoded({extended: true}));

app.use(morgan('tiny'));

// Use the route
app.use('/api/todos',todos);
app.use(express.static('dist/todoappfirebase')); // Angular files are here

// Read PORT from env if set
const port = process.env.HTTP_PORT || 3200;
//listen on port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
