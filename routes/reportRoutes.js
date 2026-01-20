const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { isLogin } = require('../middlewares/auth');

router.get('/export', isLogin, reportController.exportExcel);

module.exports = router;
