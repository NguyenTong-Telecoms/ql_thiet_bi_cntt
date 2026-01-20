const express = require('express');
const router = express.Router();

const deviceController = require('../controllers/deviceController');
const reportController = require('../controllers/reportController'); // ✅ THÊM DÒNG NÀY
const { isLogin, isAdmin } = require('../middlewares/auth');

// danh sách thiết bị
router.get('/', isLogin, deviceController.index);

// thêm
router.get('/create', isAdmin, deviceController.create);
router.post('/create', isAdmin, deviceController.store);

// sửa
router.get('/edit/:id', isAdmin, deviceController.edit);
router.post('/edit/:id', isAdmin, deviceController.update);

// xoá
router.get('/delete/:id', isAdmin, deviceController.delete);

// xuất excel
router.get('/export/excel', isLogin, reportController.exportExcel);

router.get('/transfer/:id', isLogin, deviceController.transferForm);
router.post('/transfer/:id', isLogin, deviceController.transfer);

module.exports = router;
