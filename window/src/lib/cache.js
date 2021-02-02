export default {
    db: null,
    createTable() {
        let tables = [
            'CREATE TABLE IF NOT EXISTS adnet ' +
            '(placement_name,placement_id,type,app_name,app_id,account,aapid unique)',
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
        let where = "WHERE placement_name = '"+ name+"'";
        let sqlArr = [];
        sqlArr.push("SELECT * FROM adnet");
        sqlArr.push(where);
        let sql = sqlArr.join(' ');
        console.log(sql);

        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(sql, [], (transaction, resultSet) => {

                    if (resultSet.rows.length > 0){
                        data = resultSet.rows.item(0);
                    }
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
    delTable(){
        let sql = "DROP TABLE adnet";
        console.log(sql);

        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(sql, [], (transaction, resultSet) => {
                    resolve(resultSet);
                }, (transaction, error) => {
                    reject(error);
                });

            }, error => {
                reject(error);
            }, () => {
            });
        });
    },
    outData(){
        let dataList = [];
        let sql = "SELECT * FROM adnet ORDER BY rowid";
        console.log(sql);

        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(sql, [], (transaction, resultSet) => {
                    let len = resultSet.rows.length;
                    let keys = ["placement_name","placement_id","type","app_name","app_id","account","aapid"];
                    for (let num = 0; num < len; num++) {
                        let obj = resultSet.rows.item(num);
                        let arr = [];
                        keys.forEach(key=>{
                            arr.push(obj[key]);
                        });
                        dataList.push(arr.join(","));
                    }
                }, (transaction, error) => {
                    reject(error);
                });

            }, error => {
                reject(error);
            }, () => {
                resolve(dataList.join("\n"));
            });
        });
    },
    loadAdnetList(name, account,page,pageSize=5) {
        let dataList = [];
        let total = 0;

        let where = `WHERE placement_name LIKE '%${name}%' and account='${account}'`;
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
    insertAdnet(arr,done){
        this.db.transaction(function (tx) {

            let sql = 'INSERT INTO adnet (placement_name,placement_id,type,app_name,app_id,account,aapid) ' +
                'VALUES (?, ?, ?, ?, ?, ?, ?)'
            tx.executeSql(sql, arr, (tx, results) => {
                done();
            }, (tx, results) => {
                console.log(results);

            });

        });
    }


}