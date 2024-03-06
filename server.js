// Import the npm package express from the node_modules map
import express from 'express'

// Import the fetchJson function from the ./helpers directory
import fetchJson from './helpers/fetch-json.js';

// Set the basis endpoint
const apiUrl = 'https://redpers.nl/wp-json/wp/v2';

// Create a new express app
const app = express();

// Set ejs as the template engine
app.set('view engine', 'ejs');

// Make working with request data easier
app.use(express.urlencoded({ extended: true }));

// Set the directory for ejs templates
app.set('views', './views');

// Use the 'public' directory for static resources
app.use(express.static('public'));

// GET route for the index page
app.get('/', function (request, response) {
    // Render the index page using the 'index.ejs' template
    response.render('index');
});

// POST route for the index page
app.post('/', function (request, response) {
    // Currently not handling POST data, redirect to the homepage
    response.redirect(303, '/');
});


// Set the port number for express to listen on
app.set('port', process.env.PORT || 8000);

// Start express and listen on the specified port
app.listen(app.get('port'), function () {
    // Log a message to the console with the port number
    console.log(`Application started on http://localhost:${app.get('port')}`);
});