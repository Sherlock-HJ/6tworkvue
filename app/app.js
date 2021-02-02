const debug = /--debug/.test(process.argv[2]);
if (debug){
    'use strict';
}

const {app, ipcMain} = require('electron');
const {createWindow} = require('./main_window');
const drivers =  require('./drivers');

app.whenReady().then(() => {
    createWindow();

    ipcMain.handle('open-chrome-create-ad', async (event, arg) => {

        await drivers.launchCreateAd(arg);
    });
    ipcMain.handle('open-chrome-sync-ad', async (event, arg) => {

        await drivers.launchSyncAd(arg);
    });

});
