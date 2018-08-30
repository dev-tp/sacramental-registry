const electron = require('electron');

let browserWindow;

function createWindow() {
  browserWindow = new electron.BrowserWindow({width: 1280, height: 720});
  browserWindow.loadFile('index.html');

  browserWindow.on('closed', function () {
    browserWindow = null;
  });
}

electron.app.on('activate', function () {
  if (!browserWindow) {
    createWindow();
  }
});

electron.app.on('ready', createWindow);

electron.app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    electron.app.quit();
  }
});
