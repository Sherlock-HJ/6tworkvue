const fs = require('fs');
const path = require('path');
const Whj = require('../secret');

let file = '../cache/1721607613_2021-1-25_19-46-11.csv';

fs.readFile(file,'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }
    let str = data.toString();
    let arr = str.split('\n');
    let keys = arr[0].split(',');

    let arr2 = [];
    arr.forEach(row=>{

        let obj = {};
        let rowValues = row.split(',');
        for (let num = 0; num < keys.length; num++) {
            obj[keys[num]] = rowValues[num];
        }
        arr2.push(obj);
    });
    console.log(arr2.slice(1));
});