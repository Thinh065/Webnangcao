const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Chi tiết sản phẩm
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('product', { product });
});

// Thêm vào giỏ hàng
router.post('/add-to-cart/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!req.session.cart) {
        req.session.cart = [];
    }

    req.session.cart.push(product);
    res.redirect('/cart');
});

// Trang giỏ hàng
router.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    res.render('cart', { cart });
});


module.exports = router;
