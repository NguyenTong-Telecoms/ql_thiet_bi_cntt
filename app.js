const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const path = require('path');
const app = express();

// ================= VIEW ENGINE =================
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('views', path.join(__dirname, 'views'));
// ================= STATIC & BODY =================
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// ================= SESSION =================
app.use(session({
  secret: 'secret123',
  resave: false,
  saveUninitialized: false
}));

// ================= USER GLOBAL =================
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// ================= DEFAULT ROUTE =================
app.get('/', (req, res) => {
  res.redirect('/login');
});

// ================= ROUTES =================
app.use('/', require('./routes/authRoutes'));
app.use('/devices', require('./routes/deviceRoutes'));
app.use('/reports', require('./routes/reportRoutes'));
app.use('/', authRoutes);
app.use('/devices', deviceRoutes);
// ================= START SERVER =================
sequelize.authenticate().then(() => {
  console.log('MySQL connected');
  app.listen(3000,'0.0.0.0', () => {
    console.log('Server running http://localhost:4000');
  });
}).catch(err => console.log(err));
module.exports = app;
const server = app.listen(4000, '0.0.0.0', () => {
  console.log('Server running 3000');
});
module.exports = server;
