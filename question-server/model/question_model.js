const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    answer: {
        type: String
    },
    question: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    airdate: {
        type: Date,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
    },
    category_id: {
        type: Number,
        required: true
    },
    game_id: {
        type: Number
    },
    invalid_count: {
        type: Number
    },
    category: {
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        created_at: {
            type: Date,
        },
        updated_at: {
            type: Date
        },
        clues_count: {
            type: Number,
            required: true
        }
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }


})
module.exports = mongoose.model('Question', questionSchema)