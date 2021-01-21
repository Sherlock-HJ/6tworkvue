const sqlite3 = require('sqlite3');
const {open} = require('sqlite');
const app = require('../app');
let singletonDb = null;

async function openDb() {
    if (singletonDb == null){
        singletonDb = await open({
            filename: 'database.sqlite',
            driver: sqlite3.Database
        });
    }
    await singletonDb.exec('CREATE TABLE IF NOT EXISTS tbl (' +
        'placement_id TEXT,placement_name TEXT,type TEXT,app_id TEXT,app_name TEXT)');

    return singletonDb;
}


async function insert(obj) {
    if (!obj) return ;

    const db = await openDb();

    await db.run('INSERT INTO tbl VALUES (?,?,?,?,?)',
        obj.placement_id,
        obj.placement_name,
        obj.type,
        obj.app_id,
        obj.app_name
    );

}

async function select(obj) {
    console.log(app);
    if (!obj) return ;

    const db = await openDb();

    const result = await db.all('SELECT * FROM tbl');
    return  result;
}
module.exports = {insert, select};




