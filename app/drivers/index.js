const {mainWindow} = require('../main_window');


exports.open = async (obj) => {
    console.log(obj);
    if (!obj.platform) return ;

    mainWindow().webContents.send('asynchronous-reply',
        {placement_id:123,app_id:'yioyio',name:'before初始化'});

    const platform =  require('./'+obj.platform);
    platform.launch(obj,obj.model);

};



