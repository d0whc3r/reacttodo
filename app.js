'use strict';
const electron = require('electron');
const electronapp = electron.app;
const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(path.join(__dirname, 'public'));
}

// prevent window being garbage collected
var mainWindow;

function onClosed() {
  // dereference the window
  // for multiple windows store them in an array
  mainWindow = null;
}

function createMainWindow() {
  const win = new electron.BrowserWindow({
    width: 1250,
    height: 875,
    minWidth: 1000,
    minHeight: 600,
    center: true,
    resizable: true,
    minimizable: true,
    maximizable: true,
    closable: true,
    fullscreenable: true,
    'web-preferences': {
      'web-security': false
    }
  });

  win.loadURL('file://' + path.join(__dirname, '/public/index.html'));
  if (process.env.NODE_ENV === 'development') {
    win.openDevTools();
  }

  win.on('closed', onClosed);

  return win;
}

electronapp.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    electronapp.quit();
  }
});

electronapp.on('activate', function () {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

electronapp.on('ready', function () {
  mainWindow = createMainWindow();
});