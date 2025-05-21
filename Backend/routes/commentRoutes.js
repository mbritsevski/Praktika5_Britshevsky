const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const commentController = require('../controllers/commentController');

// Komentaari loomine
router.post('/:bookId', authJwt.verifyToken, commentController.createComment);

// komentaaride saamine
router.get('/:bookId', authJwt.verifyToken, commentController.getCommentsByBook);

// komentaari kustutamine
router.delete('/:commentId', authJwt.verifyToken, commentController.deleteComment);

module.exports = router;
