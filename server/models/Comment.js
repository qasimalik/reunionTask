const mongoose = require("mongoose");
const { create } = require("./user");
const Schema = mongoose.Schema;

const Comment_Schema = new Schema({
    text: {
        type: String,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
      },
      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', 
      },
      created_at : {
        type: Date,
        default: Date.now,
      },
});

const Comment = mongoose.model("Comment", Comment_Schema);

module.exports = Comment;