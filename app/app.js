const debug = /--debug/.test(process.argv[2]);
if (debug){
    'use strict';
}

const {app, ipcMain} = require('electron');
const {createWindow,mainWindow} = require('./main_window');
const Bmob = require('hydrogen-js-sdk');
const Whj = require('./secret');


Bmob.debug(debug);

// 初始化 SDK版本 2.0.0 以下保留之前的初始化方法
Bmob.initialize("4805f4f0a0b329e5", "Qw68@#");


let keys =  [ "placement_name",
    "placement_id",
    "type",
    "app_name",
    "app_id",
    "account",
    "aapid"]
const query = Bmob.Query('adnet_qq_com');
query.equalTo("account", "==", Whj.encrypt('1721607613'));
query.limit(10);
query.find().then(res => {
    res = res.map(obj=>{
        let obj2 = {};
        for (const key in obj) {
            obj2[key] = keys.find(value => {
                return key === value;
            })?Whj.decrypt(obj[key]):obj[key];
        }

        return obj2;
    });

    console.log(res)
});

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
