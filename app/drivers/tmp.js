const platform =  require('./adnet');
const cache = require('../cache/cache');
const fs = require('fs');


let obj = {};
obj.account = '360530020';
obj.pwd = 'xilu123$%^&';
obj.model = 'get';
obj.adnames = [];
for (let i = 0; i < 3000; i++) {
    obj.adnames.push('1');
}
platform.launchCacheAd(obj);
cache.adnetSelect(null).then(obj=>{
    console.log(obj);
});

platform.uploadBmob('./cache/360530020_2021-1-26_17-17-6.csv');
//1110071320   1109766114    1109599972