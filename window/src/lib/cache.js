export default {
    db: null,
    createTable() {
        let tables = [
            'CREATE TABLE IF NOT EXISTS adnet ' +
            '(aapid,placement_id,type,placement_name,app_name,app_id,account)',
            'CREATE TABLE IF NOT EXISTS baidu ' +
            '(account)',
            'CREATE TABLE IF NOT EXISTS sogou ' +
            '(account)'
        ];
        return new Promise((resolve, reject) => {
            const create = () => {
                this.db.transaction((tx) => {
                    for (let no = 0; no < tables.length; no++) {
                        tx.executeSql(tables[no]);
                    }
                }, error => {
                    reject(error);
                }, () => {
                    resolve();
                });
            };
            if (this.db == null) {
                this.db = openDatabase('mydb', '1.0', 'Test DB',
                    2 * 1024 * 1024 * 1024, (db) => {
                        this.db = db;
                        create();
                    });
                if (this.db) {
                    create();
                }
            } else {
                create();
            }
        });

    },
    findAdnet(name){
        let data = null;
此处报错
        let where = "WHERE placement_name = "+ name;
        let sqlArr = [];
        sqlArr.push("SELECT * FROM adnet");
        sqlArr.push(where);
        let sql = sqlArr.join(' ');
        console.log(sql);

        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(sql, [], (transaction, resultSet) => {
                    data = resultSet.rows.item(0);
                }, (transaction, error) => {
                    reject(error);
                });

            }, error => {
                reject(error);
            }, () => {
                resolve(data);
            });
        });
    },
    loadAdnetList(name, page,pageSize=5) {
        let dataList = [];
        let total = 0;

        let where = "WHERE placement_name LIKE '%"
            + name
            + "%'";
        let sqlArr = [];
        sqlArr.push("SELECT * FROM adnet");
        sqlArr.push(where);
        let idx = page - 1;
        sqlArr.push(`ORDER BY rowid DESC`);
        sqlArr.push(`LIMIT ${idx * pageSize},${pageSize}`);
        let sql = sqlArr.join(' ');
        console.log(sql);

        let sqlArr1 = [];
        sqlArr1.push("SELECT COUNT(account) FROM adnet");
        sqlArr1.push(where);
        let sql1 = sqlArr1.join(' ');
        console.log(sql1);


        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {

                tx.executeSql(sql, [], (transaction, resultSet) => {
                    let len = resultSet.rows.length;
                    for (let num = 0; num < len; num++) {
                        dataList.push(resultSet.rows.item(num));
                    }
                }, (transaction, error) => {
                    reject(error);
                });
                tx.executeSql(sql1, [], (transaction, resultSet) => {
                    total = resultSet.rows.item(0)['COUNT(account)'];
                }, (transaction, error) => {
                    reject(error);
                });

            }, error => {
                reject(error);
            }, () => {
                resolve({dataList, total});
            });

        });
    },
    cacheFile(arr){
        this.$db.transaction(function (tx) {

            let sql = 'INSERT INTO adnet (aapid,placement_id,type,placement_name,app_name,app_id,account) ' +
                'VALUES (?, ?, ?, ?, ?, ?, ?)'
            tx.executeSql(sql, arr, (tx, results) => {
                console.log(tx);
                console.log(results);

            }, (tx, results) => {
                console.log(tx);
                console.log(results);

            });

        });
    }


}