const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({

    ShopName: {
        type: String,
        required: true
    },

    Area: {
        type: String,
        required: true
    },

    Category:{
        type: String,
        required: true
    },

    OpeningDate:{
        type:Date,
        
    },

    ClosingDate:{
        type:Date
    }
   
})

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;