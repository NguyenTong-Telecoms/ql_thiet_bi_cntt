exports.isLogin = (req, res, next) => {
  if (req.session.user) return next();
  res.redirect('/login');
};

exports.isAdmin = (req, res, next) => {
  if (req.session.user.role === 'admin') return next();
  res.sendStatus(403);
};
