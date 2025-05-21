const models = require("../models");
const asyncHandler = require("express-async-handler");

const ActivityLog = models.ActivityLog;
const User = models.User;

// kood, mis tagastab kõik logi failid, kus on kirjutatud, kes seda tegi ja millal.
exports.getLogs = asyncHandler(async (req, res) => {
  const logs = await ActivityLog.findAll({
    include: {
      model: User,
      attributes: ['username']
    }
  });

  res.status(200).json(logs);
});



