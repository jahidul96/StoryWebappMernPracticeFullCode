const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    photo: String,

    postedBy: {
        type: ObjectId,
        ref: 'user'
    },
    likes: [
        {
            type: ObjectId,
            ref: 'user'
        }
    ],
    comments: [
        {

            text: String,
            postedBy: {
                type: ObjectId,
                ref: 'user'
            }
        }
    ],
    posttime: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('post', userSchema)