const Comment = require("../Database/comment");

async function getCommentsByProduct(productId) {
  return await Comment.find({ productId }).sort({ createdAt: -1 });
}

async function addComment(commentData) {
  const comment = new Comment(commentData);
  await comment.save();
  return comment.toObject();
}

async function deleteComment(commentId) {
  return await Comment.findByIdAndDelete(commentId);
}

module.exports = {
  getCommentsByProduct,
  addComment,
  deleteComment
};
