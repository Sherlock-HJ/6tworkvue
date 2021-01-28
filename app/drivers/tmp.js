// const platform =  require('./adnet');
// const cache = require('../cache/cache');
const fs = require('fs');
const Whj = require('../secret');
//
//
// let obj = {};
// obj.account = '360530020';
// obj.pwd = 'xilu123$%^&';
// obj.model = 'get';
// obj.adnames = [];
// for (let i = 0; i < 3000; i++) {
//     obj.adnames.push('1');
// }
// platform.launchCacheAd(obj);
// cache.adnetSelect(null).then(obj=>{
//     console.log(obj);
// });
//
// platform.uploadBmob('./cache/360530020_2021-1-26_17-17-6.csv');
//1110071320   1109766114    1109599972

let file = '6twork.csv';
fs.readFile(file,'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }
    let str = data.toString();
    let arr = str.split('\n');
    let header = arr[0];
    arr = arr.slice(1);

    arr = arr.map(row=>{
        return row.split(',').map(obj=>{
            return Whj.decrypt(obj);
        }).join(',');
    });
    arr = [header].concat(arr);
    fs.writeFile('6twork1.csv', arr.join('\n'), {
        encoding: 'utf8',
    }, err => {
        console.log(err);
    });
    console.log(arr);
    // cache.adnetInsert(arr2);
});