const debug = /--debug/.test(process.argv[2]);
if (debug){
    'use strict';
}

const {app, ipcMain} = require('electron');
const {createWindow} = require('./main_window');



ipcMain.on('asynchronous-message', (event, arg) => {

    const driv =  require('./drivers');

    driv.open(arg).then(()=>{
        event.reply('asynchronous-reply');
    });
});
app.whenReady().then(() => {
    createWindow();

});
