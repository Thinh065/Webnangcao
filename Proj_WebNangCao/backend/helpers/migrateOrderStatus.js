/**
 * Migration script to update existing order statuses
 * 
 * This script converts old statuses to new ones:
 * - 'pending' -> 'waiting'
 * - 'processing', 'shipped', 'delivered' -> 'approved'
 * - 'cancelled' remains 'cancelled'
 */

const mongoose = require('mongoose')
require('dotenv').config()
const orderModel = require('../models/orderModel')

const migrateOrderStatus = async () => {
    try {
        console.log('Connecting to database...')
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to database')

        console.log('Fetching orders with old status values...')
        
        // Find orders with old status values
        const orders = await orderModel.find({
            status: { $in: ['pending', 'processing', 'shipped', 'delivered'] }
        })
        
        console.log(`Found ${orders.length} orders to update`)
        
        // Update each order
        for (const order of orders) {
            let newStatus = 'waiting'
            
            // Map old statuses to new ones
            if (order.status === 'pending') {
                newStatus = 'waiting'
            } else if (['processing', 'shipped', 'delivered'].includes(order.status)) {
                newStatus = 'approved'
            }
            
            // Update order
            order.status = newStatus
            await order.save()
            console.log(`Updated order ${order._id} from ${order.status} to ${newStatus}`)
        }
        
        console.log('Order status migration completed successfully')
        process.exit(0)
    } catch (error) {
        console.error('Error during migration:', error)
        process.exit(1)
    }
}

// Run the migration
migrateOrderStatus() 