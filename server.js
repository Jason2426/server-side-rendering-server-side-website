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

// Fetch posts from the API
const postsUrl = `${apiUrl}/posts?per_page=27`;
const allpostsUrl = `${apiUrl}/posts?per_page=100`;
const onePostURL = `${apiUrl}/posts?slug=`;
const categoriesURL = `${apiUrl}/categories?per_page=50`;

// Homepage route
app.get('/', function (request, response) {
    // Fetch posts concurrently
    Promise.all([fetchJson(postsUrl)])
        .then(([postsData]) => {
            // Render index.ejs and pass the fetched data as 'posts' variables
            response.render('home', { posts: postsData });
            // To check fetched Data
            // console.log(postsData)
        })
        .catch((error) => {
            // Handle error if fetching data fails
            console.error('Error fetching data:', error);
            response.status(500).send('Error fetching data!');
        });
});

// All posts route
app.get('/allPosts', function (request, response) {
    // Fetch posts concurrently
    Promise.all([fetchJson(allpostsUrl)])
        .then(([postsData]) => {
            // Render index.ejs and pass the fetched data as 'posts' variables
            response.render('allPosts', { posts: postsData });
            // To check fetched Data
            // console.log(postsData)
        })
        .catch((error) => {
            // Handle error if fetching data fails
            console.error('Error fetching data:', error);
            response.status(500).send('Error fetching data!');
        });
});


app.get('/categories', function (request, response) {
    // Fetch posts concurrently
    Promise.all([fetchJson(categoriesURL)])
        .then(([categoryData]) => {
            // Render index.ejs and pass the fetched data as 'posts' variables
            response.render('categories', { categories: categoryData });
            //Check fetched data
            // console.log(categoryData)
        })
        .catch((error) => {
            // Handle error if fetching data fails
            console.error('Error fetching data:', error);
            response.status(500).send('Error fetching data!');
        });
});


app.get('/post/:slug', function (request, response) {
    // Fetch posts concurrently
    const postSlug = request.params.slug;
    Promise.all([fetchJson(`${onePostURL} + ${postSlug}`)])
        .then(([onePostData]) => {
            // Render index.ejs and pass the fetched data as 'posts' variables
            response.render('post', { post: onePostData });
        })
        .catch((error) => {
            // Handle error if fetching data fails
            console.error('Error fetching data:', error);
            response.status(500).send('Error fetching data!');
        });
});


// POST route for the index page
app.post('/', function (request, response) {
    // Currently not handling POST data, redirect to the homepage
    response.redirect(303, '/');
});


// Set the port number for express to listen on
app.set('port', process.env.PORT || 8888);

// Start express and listen on the specified port : 8888
app.listen(app.get('port'), function () {
    // Log a message to the console with the port number
    console.log(`yoo stuff is running on : http://localhost:${app.get('port')}`);
});
