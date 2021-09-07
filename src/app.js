const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define path for a Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsFolder = path.join(__dirname, '../views'); // add by Abdulbasit
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// the 2 lines below to import the HTML (hbs) file.
// Setup handlebars engine nd views location 
app.set('view engine', 'hbs'); // handel bars --> to create dynamic templates
app.set('views', viewsFolder); // add by Abdulbasit
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Wather',
        name: 'Abdullah'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Abdullah'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'How can i help you',
        name: 'Abdullah'
    });
});

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provid an address!'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if(error) {
            return res.send({ error }); // same --> error: error 
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if(error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must provid a search term.'
        });
    }

    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => { // --> /* it's mean anything
    res.render('404', {
        title: '404', 
        name: 'Abdullah',
        errorMessage: 'Help articale not found.'
    });
});

app.get('*', (req, res) => { // --> /* it's mean anything
    res.render('404', {
        title: '404',
        name: 'Abdullah',
        errorMessage: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log('Server running on port ' + port + '.');
});