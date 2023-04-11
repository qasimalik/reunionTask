const User = require("../models/user");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.follow = async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user);
  console.log(req.user);
  if (user.following.users.includes(req.params.id)) {
    return res.status(400).send("You already follow this user");
  } else {
    user.following.users.push(req.params.id);
    user.following.totalFollowing += 1;
    const followedUser = await User.findById(req.params.id);
    followedUser.follower.users.push(req.user._id);
    followedUser.follower.totalFollower += 1;
    await followedUser.save();
    res.send(`followed ${followedUser.email}`);
  }
  await user.save();
  return res.send({ user });
};

exports.unfollow = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user.following.users.includes(req.params.id)) {
    user.following.users.pull(req.params.id);
    user.following.totalFollowing -= 1;
    const followedUser = await User.findById(req.params.id);
    followedUser.follower.users.pull(req.user._id);
    followedUser.follower.totalFollower -= 1;
    await followedUser.save();
    res.send(`unfollowed ${followedUser.email}`);
  } else {
    return res.status(400).send("You do not follow this user");
  }
  await user.save();
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user);
  return res.send(
    `userName: ${user.userName},\n Followers: ${user.follower.totalFollower},\n Following: ${user.following.totalFollowing}`
  );
};

exports.createPost = async (req, res) => {
  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    createdBy : req.user._id
  });
  console.log(post.createdBy);
  return res.send(
    `Postid: ${post._id},\n Title: ${post.title},\n Description: ${post.description},\n CreatedAt: ${post.created_at}`
  );
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.deleteOne();
  res.send("Post deleted");
};

exports.likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.likes.users.includes(req.user._id)) {
    return res.status(400).send("You already liked this post");
  } else {
    post.likes.users.push(req.user._id);
    post.likes.totalLikes += 1;
    await post.save();
    return res.send(`You liked post ${post._id}`);
  }
};

exports.unlikePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.likes.users.includes(req.user._id)) {
    post.likes.users.pull(req.user._id);
    post.likes.totalLikes -= 1;
    await post.save();
    return res.send(`You unliked post ${post._id}`);
  } else {
    return res.status(400).send("You did not like this post");
  }
};

exports.createComment = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const postId = req.params.id;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post not found");
    }
    const comment = await Comment.create({
      text: req.body.text,
      user: user,
      post: postId,
    });
    post.comments.push(comment);
    await post.save();
    return res.send(
      `Commentid: ${comment._id},\n Text: ${comment.text},\n CreatedAt: ${comment.created_at},`
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.send(
    `Postid: ${post._id},\n Title: ${post.title},\n Description: ${post.description},\n CreatedAt: ${post.created_at},\n 
    Likes: ${post.likes.totalLikes},\n Comments: ${post.comments.length}`);
};

exports.getAllPosts = async (req, res) => {
    const posts = await Post.find({});
    res.send(posts).sort({created_at: -1});
};
