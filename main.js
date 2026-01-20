const { app, BrowserWindow } = require('electron');
const path = require('path');

let server;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
  });
  win.loadURL('http://localhost:4000');
}

app.whenReady().then(() => {
  server = require(path.join(__dirname, 'app.js'));
  setTimeout(createWindow, 1000);
});
