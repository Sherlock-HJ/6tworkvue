const {BrowserWindow} = require('electron');

const debug = /--debug/.test(process.argv[2]);
let mainWindow = null;
exports.createWindow = ()=> {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 160*10,
        height: 90*10,
        webPreferences: {
            devTools:true,
            nodeIntegration: true,
            // enableRemoteModule: false,
            // webSecurity:true
        }
    });
    // and load the index.html of the app.
    if (debug) {
        mainWindow.loadURL('http://localhost:8080/');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile('./dist/index.html');
    }
    mainWindow.maximize();
};
exports.mainWindow = ()=> {
    return mainWindow;
};
