module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Device', {
    stt: DataTypes.INTEGER,
    khoa_phong: DataTypes.STRING,
    ma_thiet_bi: DataTypes.STRING,
    loai: DataTypes.STRING,
    ngay_nhap: DataTypes.DATE,
    ngay_xuat: DataTypes.DATE,
    ngay_dieu_chuyen: DataTypes.DATE,
    khoa_den: DataTypes.STRING,
    khoa_di: DataTypes.STRING,
    ghi_chu: DataTypes.STRING
  }, {
    tableName: 'devices',
    timestamps: false   // 👈 DÒNG QUAN TRỌNG
  });
};
