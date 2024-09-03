const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const homeModule = require("./components/home/home.module");
const userModule = require("./components/user/user.module");
const authModule = require("./components/auth/auth.module");


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
app.use('/', homeModule.router);
app.use('/auth', authModule.router);
app.use('/users', userModule.router);

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace

    // In production, you should use a user-friendly message
    if (process.env.VERCEL_ENV === 'development') {
        res.status(500).send({
            message: 'Internal Server Error',
            error: err
        });
    } else {
        res.status(500).send({
            message: 'Internal Server Error',
            error: err
        });
    }
});


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