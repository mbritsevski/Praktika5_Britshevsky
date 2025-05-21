const express = require('express');
const router = express.Router();

const authJwt = require('../middleware/authJwt');
const activityController = require('../controllers/activityController');

// GET /api/logs - ligipääs ainutlt adminile
router.get(
  '/', 
  authJwt.verifyToken,
  authJwt.isAdmin,   
  activityController.getLogs
);

module.exports = router;
