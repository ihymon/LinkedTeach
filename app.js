const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:2WBlnhHym7kspvXw@cluster0.1nire.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to the database');
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const products = new mongoose.Schema({
    name: String,
    price: Number
    });

const Item = mongoose.model('Item', products);


app.get('/products', (req, res) => {
    Item.find()
    .then((items) => {
        res.send(items);
    });
});

app.post('/products', (req, res) => {
    const item = new Item({
        name: req.body.name,
        price: req.body.price
    });
    item.save()
    .then((item) => {
        res.send(item);
    });
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname,'admin', 'index.html'));
})






app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


