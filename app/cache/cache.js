const debug = /--debug/.test(process.argv[2]);

const Bmob = require('hydrogen-js-sdk');
const Whj = require('../secret');


Bmob.debug(debug);

// 初始化 SDK版本 2.0.0 以下保留之前的初始化方法
Bmob.initialize("4805f4f0a0b329e5", "Qw68@#");

async function adnetInsert(objs) {

    let queryArray = [];
    objs.forEach(obj => {

        var queryObj = Bmob.Query('adnet_qq_com');
        for (const key in obj) {
            queryObj.set(key, Whj.encrypt(obj[key]));
        }
        queryArray.push(queryObj);
    });

    let groups = [];
    // 构造含有 最多 50个对象的数组
    for (let i = 0; i < Math.ceil(queryArray.length / 50.0); i++) {
        groups.push(queryArray.slice(i * 50, i * 50 + 50))
    }
// 传入刚刚构造的数组
    for (let num = 0; num < groups.length; num++) {
        const res = await Bmob.Query('adnet_qq_com').saveAll(groups[num]);
        console.log(res);
    }


}

async function adnetSelect(obj) {
    let keys = ["placement_name",
        "placement_id",
        "type",
        "app_name",
        "app_id",
        "account",
        "aapid"]
    const query = Bmob.Query('adnet_qq_com');
    query.equalTo("account", "==", Whj.encrypt('360530020'));
    query.limit(10);
    let res = await query.find();
    res = res.map(obj => {
        let obj2 = {};
        for (const key in obj) {
            obj2[key] = keys.find(value => {
                return key === value;
            }) ? Whj.decrypt(obj[key]) : obj[key];
        }
        return obj2;
    });

    return res;

}

module.exports = {adnetInsert, adnetSelect};




