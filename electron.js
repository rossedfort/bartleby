'use strict';

const electron         = require('electron');
const nativeImage      = electron.nativeImage;
const FileBin          = require('file-bin');
const app              = electron.app;
const BrowserWindow    = electron.BrowserWindow;
const emberAppLocation = `file://${__dirname}/dist/index.html`;
var icon = nativeImage.createFromPath(`${__dirname}/public/bartleby-icon.icns`);
app.dock.setIcon(icon);
console.log(icon)
let mainWindow = null;
let filesystem = new FileBin(__dirname + '/notes', ['.txt', '.md', '.markdown']);

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

    mainWindow.webContents.on('did-fail-load', () => {
        mainWindow.loadURL(emberAppLocation);
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

exports.filesystem = filesystem;
