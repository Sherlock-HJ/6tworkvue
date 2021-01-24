const fs = require('fs');
const path = require('path');
const Whj = require('../secret');

let file = path.resolve(__dirname, './file.txt');

fs.readFile(file,'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }
    let str = data.toString();
    str = str.replace(/广告位类型/g,'');
    str = str.replace(/所属媒体/g,'');
    str = str.replace(/广告位状态/g,'');
    str = str.replace(/广告位/g,'');
    str = str.replace(/业务状态/g,'');
    str = str.replace(/修改模板/g,'\n\n');
    str = str.replace(/删除/g,'\n\n');
    str = str.replace(/操作/g,'\n\n');

    str = str.replace(/\n\n/g,'whj');
    str = str.replace(/\n/g,',');
    str = str.replace(/whj/g,'\n');
    str = str.replace(/获取JS代码/g,'\n');
    str = str.replace(/修改/g,'\n');

    let arr =  str.split('\n');
    arr = arr.filter(obj=>{
       return  obj.length > 1;
    });
    arr = arr.map(obj=>{
        let arr2 = obj.split(',');
        return arr2.filter(obj=>{
            return  obj.length > 1;
        }).slice(0,5);
    });
    arr = arr.filter(obj=>{
        let d = obj[4];
        return !( d === 'ID:1110071320' || d === 'ID:1109766114' || d === 'ID:1109599972');
    });
    arr = arr.map(list=>{
        let obj = {};
        obj.placement_name = list[0];
        obj.placement_id = list[1].slice(3);
        obj.type = list[2];
        obj.app_name = list[3];
        obj.app_id = list[4].slice(3);
        obj.account = '1241554103';
        obj.aapid = obj.account + '_' + obj.app_id + '_' + obj.placement_id;
        return obj;
    });
    let num = 0;

    arr = arr.map(obj=>{
        let obj2 = {};
        for (const key in obj) {
            obj2[key] = Whj.encrypt(obj[key]);
        }
        console.log(num++);
        return obj2;
    });
    console.log(arr);
    fs.writeFile('./file1.json', JSON.stringify(arr), {
        encoding: 'utf8',
        // flag:'a'
    }, err => {
        console.log(err);
    });
});