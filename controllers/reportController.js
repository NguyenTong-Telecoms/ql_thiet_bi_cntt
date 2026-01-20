const ExcelJS = require('exceljs');
const { Device } = require('../models');

exports.exportExcel = async (req, res) => {
  try {
    const devices = await Device.findAll(); // lấy toàn bộ

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Danh sách thiết bị');

    worksheet.columns = [
      { header: 'STT', key: 'stt', width: 8 },
      { header: 'Khoa/Phòng', key: 'khoa_phong', width: 20 },
      { header: 'Mã thiết bị', key: 'ma_thiet_bi', width: 20 },
      { header: 'Loại', key: 'loai', width: 15 },
      { header: 'Ngày nhập', key: 'ngay_nhap', width: 15 },
      { header: 'Ngày xuất', key: 'ngay_xuat', width: 15 },
      { header: 'Ngày điều chuyển', key: 'ngay_dieu_chuyen', width: 18 },
      { header: 'Khoa đến', key: 'khoa_den', width: 20 },
      { header: 'Khoa đi', key: 'khoa_di', width: 20 },
      { header: 'Ghi chú', key: 'ghi_chu', width: 25 }
    ];

    const formatDate = (d) => {
      if (!d) return '';
      const date = new Date(d);
      return date.toLocaleDateString('vi-VN');
    };

    devices.forEach((d, index) => {
      worksheet.addRow({
        stt: index + 1,
        khoa_phong: d.khoa_phong,
        ma_thiet_bi: d.ma_thiet_bi,
        loai: d.loai,
        ngay_nhap: formatDate(d.ngay_nhap),
        ngay_xuat: formatDate(d.ngay_xuat),
        ngay_dieu_chuyen: formatDate(d.ngay_dieu_chuyen),
        khoa_den: d.khoa_den,
        khoa_di: d.khoa_di,
        ghi_chu: d.ghi_chu
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=danh_sach_thiet_bi.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error('Lỗi xuất Excel:', err);
    res.status(500).send('Lỗi khi xuất file Excel');
  }
};
