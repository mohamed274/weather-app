// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

const port = 8000;
// const apiKey = '23e2d7d54d8bb8cf5822b97c658b10ef';
// const baseUrl = 'https://samples.openweathermap.org/data/2.5/weather?zip=';

// Setup empty JS object to act as endpoint for all routes
projectData = {};


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/addweather', (req, res) => {
    console.log(req.body);
    const newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse,
    };
    projectData[req.body.zipcode] = newEntry;
    res.send(newEntry);
    console.log('projectData', projectData);
});

// Setup Server
const server = app.listen(port, () => {
    console.log(`running on localhost:${port}`);
});