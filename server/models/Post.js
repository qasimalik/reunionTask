const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./Comment");

const Post_Schema = new Schema({
    title : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    created_at : {
        type: Date,
        default: Date.now,
    },
    comments : [Comment.schema],
    likes : {
        users:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        default: [],
    }],
    totalLikes:{
        type: Number,
        default: 0,
    }
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

const Post = mongoose.model("Post", Post_Schema);

module.exports = Post;