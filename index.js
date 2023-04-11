require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const router = require('./server/routes/commonRoute');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// DB Connection
const mongo_url = process.env.MONGO_URI;
mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR!!!!")
        console.log(err)
})

app.get('/', (req, res) => {
    res.send('Hello from the homepage');
});

app.use("/api", router);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});