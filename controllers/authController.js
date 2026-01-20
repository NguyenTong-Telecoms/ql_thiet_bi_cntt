const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.showLogin = (req, res) => {
  res.render('auth/login', { layout: false });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.render('auth/login', {
      layout: false,
      error: 'Sai tài khoản hoặc mật khẩu'
    });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.render('auth/login', {
      layout: false,
      error: 'Sai tài khoản hoặc mật khẩu'
    });
  }

  req.session.user = {
    id: user.id,
    username: user.username,
    role: user.role
  };

  res.redirect('/devices');
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
