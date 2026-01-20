const { Device } = require('../models');
exports.index = async (req, res) => { const devices = await Device.findAll(); res.render('devices/list', { devices }); }; 
exports.create = (req, res) => { res.render('devices/form', { device: null }); };
 exports.store = async (req, res) => { await Device.create(req.body); res.redirect('/devices'); };
  exports.edit = async (req, res) => { const device = await Device.findByPk(req.params.id); res.render('devices/form', { device }); };
   exports.update = async (req, res) => { await Device.update(req.body, { where: { id: req.params.id } }); res.redirect('/devices'); };
    exports.delete = async (req, res) => { await Device.destroy({ where: { id: req.params.id } }); res.redirect('/devices'); };
exports.transferForm = async (req, res) => { const device = await Device.findByPk(req.params.id);
     if (!device) return res.redirect('/devices');
    res.render('devices/transfer', { device }); }; 
     exports.transfer = async (req, res) => { const { khoa_den, ngay_dieu_chuyen, ghi_chu } = req.body; await Device.update( { khoa_di: req.body.khoa_di, khoa_den, ngay_dieu_chuyen, ghi_chu }, { where: { id: req.params.id } } ); res.redirect('/devices')}