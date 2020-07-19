// require other files from this project
const location = require('./utils/geocode');
const weather = require('./utils/weather');

// require statement for outside libraries
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

// Defined paths for express config
const publicDirectoryPath =
    '/home/jwalters/Documents/Play/Udemy/Node.js_Developer_Course/web-server/public';

const viewsPath =
    '/home/jwalters/Documents/Play/Udemy/Node.js_Developer_Course/web-server/templates/views';

const partialsPath =
    '/home/jwalters/Documents/Play/Udemy/Node.js_Developer_Course/web-server/templates/partials';

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve from
app.use(express.static(publicDirectoryPath));

// What to show for the home page
app.get('', (req, res) => {
    res.render('/index', {
        title: 'Weather App',
        name: 'Jordan Walters',
    });
});

// What to show for the about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jordan Walters',
    });
});

// What to show for the help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'This is showing up perfectly!!',
        name: 'Jordan Walters',
    });
});

// What to show for the weather page
app.get('/weather', (req, response) => {
    if (!req.query.address) {
        return response.send({
            Error: 'You must provide an address.',
        });
    }

    location(req.query.address, (err, res) => {
        if (err) {
            return response.send({ Error: err });
        }

        weather(res.latitude, res.longitude, (err, weatherRes) => {
            if (err) {
                return response.send({ Error: err });
            }
            response.send({
                weather: weatherRes,
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        });
    }

    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        info:
            'This help article has been removed, had its name changed, or is otherwise temporarily unavailable.',
        route: '/help',
        page: 'BACK TO HELP',
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        info:
            'The page you are looking for has been removed, had its name changed, or is otherwise temporarily unavailable.',
        route: '/',
        page: 'HOMEPAGE',
    });
});

// Where to our server should listen to
app.listen(port, () => {
    console.log('Server Started...');
});
