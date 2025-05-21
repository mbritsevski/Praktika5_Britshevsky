const models = require("../models");
const asyncHandler = require("express-async-handler");

const Book = models.Book;
const Comment = models.Comment;
const ActivityLog = models.ActivityLog;

// Loob komentaari raamatu jaoks
exports.createComment = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { bookId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Comment content is required" });
  }

  const book = await Book.findByPk(bookId);
  if (!book) return res.status(404).json({ message: "Book not found" });

  const comment = await Comment.create({ content, bookId, userId });

  await ActivityLog.create({
    action: `Commented on book ID ${bookId}`,
    userId
  });

  res.status(201).json({ comment });
});


// Komentaari kustutamine
exports.deleteComment = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { commentId } = req.params;

  const comment = await Comment.findByPk(commentId);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const user = await models.User.findByPk(userId);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // kustutamine ainult admini rolliga või komentaari loojaga.
  if (comment.userId !== userId && user.role !== 'Admin') {
    return res.status(403).json({ message: "Forbidden" });
  }

  await comment.destroy();

  await ActivityLog.create({
    action: `Deleted comment ID ${commentId}`,
    userId
  });

  res.status(200).json({ message: "Comment deleted" });
});


// Tagastab koik komentaarid raamau jaoks
exports.getCommentsByBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  const comments = await Comment.findAll({
    where: { bookId },
    include: {
      model: models.User,
      attributes: ['id', 'username']
    }
  });

  res.status(200).json({ comments });
});

