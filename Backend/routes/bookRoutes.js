const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const bookController = require('../controllers/bookController');

// Admin-only routes
router.post('/', authJwt.verifyToken, authJwt.isAdmin, bookController.createBook);
router.put('/:id', authJwt.verifyToken, authJwt.isAdmin, bookController.updateBook);
router.delete('/:id', authJwt.verifyToken, authJwt.isAdmin, bookController.deleteBook);
router.get('/:id',authJwt.verifyToken, bookController.getOneBook);

// Avatud kõikidele kasutajatele
router.get('/', authJwt.verifyToken, bookController.getAllBooks);

module.exports = router;
