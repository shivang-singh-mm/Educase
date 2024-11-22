require('dotenv').config();
const express = require('express');
const router = require('./routes');
const db = require('./dbConfig');
const app = new express();

const port = process.env.PORT;
const version = process.env.VERSION

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

app.use(`/api/${version}`, router);


app.listen(port, () => {
    console.log(`Server running on: localhost:${port}/api/${version}`);
})