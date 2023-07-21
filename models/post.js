const mongoose = require('mongoose');

let postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    post_image: {
        type: String,
    },
    description: {
        type: String,
    },
    title: {
        type: String,
    },
    likes: {
        type: Array
    },
    post_emotion: {
        // this will be filled by AI/ML later
        type: String,
        default: null
    },
    created_at:{
        type: String,
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

/* postSchema.pre('save', async function (next) {
    let date_info = new Date
    let date_into = date_info.getDate() + '/' + (date_info.getMonth()+1) + '/' +  date_info.getFullYear()
    this.created_at = await date_into
}); */

postSchema.virtual('posted_by', {
    ref: 'user',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

postSchema.virtual('comments', {
    ref: 'comment',
    localField: '_id',
    foreignField: 'postId',
    justOne: false
});

module.exports = mongoose.model('post', postSchema)