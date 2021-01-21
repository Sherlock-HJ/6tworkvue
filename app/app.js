
const {app, ipcMain} = require('electron');
const {createWindow,mainWindow} = require('./main_window');

const cache = require('./cache/adnetCache');
const cache2 = require('./cache/adnetCache');
console.log(cache === cache2);
// cache.insert({type:'4567jkdhsfjk'}).then(()=>{
//     console.log('插入了');
//     return cache.select({});
// }).then(result=>{
//     console.log(result);
// });

ipcMain.on('asynchronous-message', (event, arg) => {

    const driv =  require('./drivers');
    // driv.open(arg).then();
    console.log(driv.cache === cache2);

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

app.setAppLogsPath('/Users/wuhongjia/Desktop/WebProjects/6twork');
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});
