// Modules to control application life and create native browser window
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const {app, BrowserWindow, ipcMain} = require('electron');

ipcMain.on('asynchronous-message', (event, arg) => {

    open({
        filename: 'database.db',
        driver: sqlite3.Database
    }).then((db) => {
        // do your thing
    });

    return;
    const driv =  require('./drivers');
    // driv.open(arg).then();
    driv.open(arg)
    event.reply('asynchronous-reply', {placement_id:123,app_id:'yioyio',name:'接待室里看风景阿卡丽'});
    return;
});


const debug = /--debug/.test(process.argv[2]);

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 160*10,
        height: 90*10,
        webPreferences: {
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
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});
