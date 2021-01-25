const debug = /--debug/.test(process.argv[2]);

const Bmob = require('hydrogen-js-sdk');
const Whj = require('../secret');


Bmob.debug(debug);

// 初始化 SDK版本 2.0.0 以下保留之前的初始化方法
Bmob.initialize("4805f4f0a0b329e5", "Qw68@#");

async function adnetInsert(objs) {
    const queryArray = new Array();
// 构造含有50个对象的数组
    for(var i = 0 ; i < 50 ; i++){
        var queryObj = Bmob.Query('adnet_qq_com');
        queryObj.set('columnName','abc' + i);
        queryArray.push(queryObj);
    }


// 传入刚刚构造的数组
   const res = await Bmob.Query('adnet_qq_com').saveAll(queryArray);
    console.log(res);
}

async function adnetSelect(obj) {
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
    let res = await query.find();
    res = res.map(obj=>{
        let obj2 = {};
        for (const key in obj) {
            obj2[key] = keys.find(value => {
                return key === value;
            })?Whj.decrypt(obj[key]):obj[key];
        }

        return obj2;
    });

    return res;

}
module.exports = {adnetInsert, adnetSelect};




