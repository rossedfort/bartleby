'use strict';

const electron         = require('electron');
const FileBin          = require('file-bin');
const app              = electron.app;
const BrowserWindow    = electron.BrowserWindow;
const emberAppLocation = `file://${__dirname}/dist/index.html`;
const fs               = require('fs');
const Menu             = electron.Menu;
const Tray             = electron.Tray;

const notesDir         = app.getPath('home') + '/Documents/Notes';

let mainWindow = null;
let appIcon    = null;

if (!fs.existsSync(notesDir)) { fs.mkdir(notesDir); }
let filesystem = new FileBin(notesDir, ['.txt', '.md', '.markdown']);

electron.crashReporter.start();

app.on('window-all-closed', function onWindowAllClosed() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function onReady() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 640,
        minHeight: 420,
        titleBarStyle: 'hidden-inset',
        title: 'Bartleby',
        defaultFontFamily: 'menu'
    });
    delete mainWindow.module;

    mainWindow.loadURL(emberAppLocation);
    appIcon = new Tray('./public/bartleby-tray-icon.png');
    
    mainWindow.webContents.on('did-fail-load', () => {
        mainWindow.loadURL(emberAppLocation);
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

exports.filesystem = filesystem;
const updateMenu = exports.updateMenu = (notes) => {
  let noteMenuItems = notes.map(note => {
    return { label: note.id, click: function() {
      mainWindow.webContents.send('note-selected', note.id);
    } };
  });

  let contextMenu = Menu.buildFromTemplate(noteMenuItems);
  appIcon.setContextMenu(contextMenu);
};
