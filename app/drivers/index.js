
exports.launchCreateAd = async (obj) => {
    console.log(obj);
    if (!obj.platform) return ;

    const platform =  require('./'+obj.platform);
    await platform.launchCreateAd(obj);

};

exports.launchSyncAd = async (obj) => {
    console.log(obj);
    if (!obj.platform) return ;

    const platform =  require('./'+obj.platform);
    await platform.launchSyncAd(obj);

};



