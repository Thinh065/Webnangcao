const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();

// Kết nối MongoDB
mongoose.connect('mongodb+srv://trannhatthinh2004:tnkhanh9@cluster0.gro8n.mongodb.net/');

// Cấu hình view engine EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Cấu hình middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

// Định tuyến
const indexRouter = require('./routes/index');
const productRouter = require('./routes/product');
app.use('/', indexRouter);
app.use('/products', productRouter);

app.use('/products', productRouter);

app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    res.render('cart', { cart });
});
// Khởi động server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
