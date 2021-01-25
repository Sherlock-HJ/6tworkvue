const platform =  require('./adnet');

let obj = {};
obj.account = '1721607613';
obj.pwd = 'gdcm84479855';
obj.model = 'get';
obj.adnames = [];
for (let i = 0; i < 1000; i++) {
    obj.adnames.push('1');
}
platform.launchCacheAd(obj);


//1110071320   1109766114    1109599972