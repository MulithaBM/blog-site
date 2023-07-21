const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        index:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    following: {
        type: Array
    },
    followers: {
        type: Array
    },
    created_at: {
        type: String,
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
   
userSchema.virtual('posts', {
    ref : 'post',
    localField : '_id',
    foreignField : 'userId',
    justOne : false
});

module.exports = mongoose.model('user', userSchema);