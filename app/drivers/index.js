const {mainWindow} = require('../main_window');


exports.open = async (obj) => {
    console.log(obj);
    if (!obj.platform) return ;

    mainWindow().webContents.send('asynchronous-reply',
        {placement_id:123,app_id:'yioyio',name:'before初始化'});

    const platform =  require('./'+obj.platform);
    platform.launch(obj);

};

// let search = await driver.wait(until.elementLocated(By.className('form-control')));
// await driver.wait(until.elementIsEnabled(search));
//
// await driver.sleep(1000);
// try {
//     await search.sendKeys('TBS渠道6');
//     await search.sendKeys(Key.ENTER);
// } catch (e) {
//     console.log('搜索框不可交互')
// }

