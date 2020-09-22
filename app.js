// Modules to control application life and create native browser window
const {app, BrowserWindow,ipcMain } = require('electron');
const child_process = require('child_process');


ipcMain.on('asynchronous-message', (event, arg) => {
    let command = 'python  C:\\Users\\521mm\\Documents\\GitHub\\pyDemo\\adnetGet1.py';
    let workerProcess = child_process.exec(command,  (error, stdout, stderr)=> {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });

    workerProcess.on('exit', function (code) {
        console.log('子进程已退出，退出码 '+code);
    });
});


const debug = /--debug/.test(process.argv[2]);

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
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


    // mainWindow.loadURL('http://localhost:8080/')
    // mainWindow.loadURL('http://39.100.25.53:8082/')

    // Open the DevTools.
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
