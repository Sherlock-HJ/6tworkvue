const debug = /--debug/.test(process.argv[2]);
if (debug){
    'use strict';
}

const {app, ipcMain} = require('electron');
const {createWindow,mainWindow} = require('./main_window');



ipcMain.on('asynchronous-message', (event, arg) => {

    const driv =  require('./drivers');
    // driv.open(arg).then();

    driv.open(arg)
    event.reply('asynchronous-reply', {placement_id:123,app_id:'yioyio',name:'接待室里看风景阿卡丽'});
    console.log(mainWindow());
    mainWindow().webContents.send('asynchronous-reply',
        {placement_id:123,app_id:'yioyio',name:'dfa初始化'});
    return;
});
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {

    })
});

// app.setAppLogsPath('/Users/wuhongjia/Desktop/WebProjects/6twork');
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});
