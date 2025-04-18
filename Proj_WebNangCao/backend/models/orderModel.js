const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    shippingInfo: {
        fullName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        }
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['cod', 'card'],
        default: 'cod'
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['waiting', 'approved', 'cancelled'],
        default: 'waiting'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('order', orderSchema) 