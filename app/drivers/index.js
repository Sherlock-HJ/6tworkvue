const {mainWindow} = require('../main_window');


exports.open = async (obj) => {
    console.log(obj);
    if (!obj.platform) return ;

    const platform =  require('./'+obj.platform);
    platform.launchCreateAd(obj,obj.model);

};



