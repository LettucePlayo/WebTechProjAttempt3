const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 45
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    count_emoji1: {type : DataTypes.INTEGER,
        allowNull : true,
        validate : {
            isInt : true,
            min : 0
        }
    },    
    count_emoji2 : {
        type : DataTypes.INTEGER,
        allowNull : true,
        validate : {
            isInt : true,
            min : 0
        }
    },    
    count_emoji3 : {
        type : DataTypes.INTEGER,
        allowNull : true,
        validate : {
            isInt : true,
            min : 0
        }
    },    
    count_emoji4 : {
        type : DataTypes.INTEGER,
        allowNull : true,
        validate : {
            isInt : true,
            min : 0
        }
    }
});

module.exports = Activity; //attempt

