const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loadRoutes = require('./loaders/routes.js');

const corsOptions = {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/about', (req, res) => {
  res.send('About route 🎉 ')
})

loadRoutes(app);

const start = () => {
    try {
        const port = 3000;
        app.listen(port, () =>
            console.log(`✅ Server is listening on port ${port}.........`)
        );
    } catch (err) {
        console.error('Failed to start server:', err);
    }
};

start();

module.exports = app;