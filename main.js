const electron = require('electron');

let browserWindow;

function createWindow() {
  const screen = electron.screen.getPrimaryDisplay().size;

  browserWindow = new electron.BrowserWindow({width: screen.width * 0.8, height: screen.height * 0.8});
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
