const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const TOKEN = process.env.TOKEN;
const bot = new TelegramBot(TOKEN, {polling: true});


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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
 


// const orders = new mongoose.Schema({
//     name: String,
//     phone: String,
//     email: String,
//     list: Array,
// })

// const order = mongoose.model('Order', orders);

// app.post('/orders', (req, res) => {
//     const [name, phone, email] = req.body;
//     const order = new order({
//         name,
//         phone,
//         email,
        
//     });
//     order.save()
//     .then((order) => {
//         res.send(order);
//     });
// });

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

app.delete('/products/:id', async (req, res) => {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname,'admin', 'index.html'));
})


const userModel =  mongoose.model('User', {
    email:String
});

app.post('/subscribe', (req, res) => {
    const email = req.body.email;
    const user = new userModel({
        email: email
    })
    user.save().then(() => {
        console.log(user);
        
    })
    res.sendStatus(200);
});


app.get('/subscribers' , (req, res) => {
    userModel.find()
    .then((users) => {
        res.send(users);
    });
});




app.post('/subscribe' , (req , res) => {
    const email = req.body.email;
    console.log(email)
    res.sendStatus(200);
})


app.delete('/subscribers/:id', async (req, res) => {
    console.log(req.params.id)
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
});

// TELEGRAM

const userStates = {};

bot.onText(/\/start/, (msg)=>{
    bot.sendMessage(msg.chat.id, 'Ласкаво просимо!, Викорстовуй кнопки для керування товарами', {
        reply_markup:{
            inline_keyboard: [[
                {text: '+ Додати товар', callback_data: 'add_product'}, 
                {text: '- Видалити товар', callback_data: 'delete_product'},
                {text: ' Підписники', callback_data: 'subscribe'}
            ]]
        }
    });
})






bot.on('callback_query', (query)=>{
    const chatId = query.message.chat.id;
    if(query.data === 'add_product'){
        userStates[chatId]  = {step: 'waiting_for_name'};
        bot.sendMessage(chatId, 'Введіть назву товару');
    }else if(query.data === 'delete_product'){
        Item.find()
        .then((items)=>{
            bot.sendMessage(chatId, 'Виберіть товар для видалення', {
                reply_markup: {
                    inline_keyboard: items.map(item=>[
                        {text: `❌ ${item.name} `, callback_data: `delete_${item._id}`}
                    ])
                }
            });
        })
    }else if(query.data.startsWith('delete_')){
        const productId = query.data.split('_')[1];
        Item.findByIdAndDelete(productId)
        .then(()=>{
            bot.sendMessage(chatId, 'Товар успішно видалено');
        }) 
    }else if(query.data === 'subscribe'){
        userModel.find()
        .then((users)=>{
            bot.sendMessage(chatId, 'Підписки на новини', {
                reply_markup: {
                    inline_keyboard: users.map(user=>[
                        {text: ` ${user.email} `}
                    ])
                }
            });
        })
        

    }
})

bot.on('message',  async (msg)=>{
    const chatId = msg.chat.id;
    if(!userStates[chatId]){
        return;
    }
    if(userStates[chatId].step === 'waiting_for_name'){
        userStates[chatId].name = msg.text;
        userStates[chatId].step = 'waiting_for_price';
        bot.sendMessage(chatId, 'Введіть ціну товару');
    }else if(userStates[chatId].step === 'waiting_for_price'){
        userStates[chatId].price = msg.text;
        const newProduct = new Item({
            name: userStates[chatId].name,
            price: userStates[chatId].price
        })
        newProduct.save();
        delete userStates[chatId];
        bot.sendMessage(chatId, 'Товар успішно доданий у Базу Даних');
    }
})





app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


