'use strict';

const electron         = require('electron');
const FileBin          = require('file-bin');
const app              = electron.app;
const BrowserWindow    = electron.BrowserWindow;
const emberAppLocation = `file://${__dirname}/dist/index.html`;
const apiRequests      = require('superagent')

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

var githubLogin = () => {
  // Your GitHub Applications Credentials
  var options = {
    client_id: '',
    client_secret: '',
    scopes: ["user:email", "notifications"] // Scopes limit access for OAuth tokens.
  };



  // Build the OAuth consent page URL
  var authWindow = new BrowserWindow({ width: 800, height: 600, show: false, 'node-integration': false });
  var githubUrl = 'https://github.com/login/oauth/authorize?';
  var authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes;
  authWindow.loadURL(authUrl);
  authWindow.show();

  function handleCallback (url) {
    var raw_code = /code=([^&]*)/.exec(url) || null;
    var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
    var error = /\?error=(.+)$/.exec(url);

    if (code || error) {
      // Close the browser if code found or error
      authWindow.destroy();
    }

    // If there is a code, proceed to get token from github
    if (code) {
      requestGithubToken(options, code);
    } else if (error) {
      alert('Oops! Something went wrong and we couldn\'t' +
      'log you in using Github. Please try again.');
    }
  }

  // Handle the response from GitHub - See Update from 4/12/2015

  authWindow.webContents.on('will-navigate', function (event, url) {
    handleCallback(url);
  });

  authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
    handleCallback(newUrl);
  });

  // Reset the authWindow on close
  authWindow.on('close', function() {
    authWindow = null;
  }, false);
}

function requestGithubToken(options, code) {

  apiRequests
    .post('https://github.com/login/oauth/access_token', {
      client_id: options.client_id,
      client_secret: options.client_secret,
      code: code,
    })
    .end(function (err, response) {
      if (response && response.ok) {
        let githubtoken = response.body.access_token;
        // console.log(response.body.access_token);
        mainWindow.webContents.send('new-github-token', githubtoken);
      } else {
        console.log(err);
      }
    });

}


exports.filesystem = filesystem;
exports.githubLogin = githubLogin;
