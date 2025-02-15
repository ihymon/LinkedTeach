const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://admin:CzRlBuXZENjffQf1@cluster0.3pkyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to the database');
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});





app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


