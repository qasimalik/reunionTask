const mongoose = require("mongoose");

const User_Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    default: "user",
  },
  follower: {
    users:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        default: [],
    }],
    totalFollower:{
        type: Number,
        default: 0,
    }
  },
  following: {
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
    }],
    totalFollowing:{
        type: Number,
        default: 0,
    }
},
});

const User = mongoose.model("User", User_Schema);
module.exports = User;