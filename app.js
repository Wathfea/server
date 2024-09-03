const express = require('express');

const app = express()
const PORT = 8000

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/about', (req, res) => {
  res.send('About route 🎉 ')
})

const start = () => {
    try {
        const port = process.env.PORT || 3000;
        app.listen(port, () =>
            console.log(`✅ Server is listening on port ${port}.........`)
        );
    } catch (err) {
        console.error('Failed to start server:', err);
    }
};

start();

module.exports = app;