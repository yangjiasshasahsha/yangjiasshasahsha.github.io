const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'chuizi';//数据库名称

const colle = () => {//建立连接
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, {
            useUnifiedTopology: true
        }, function (err, client) {
            err ? reject(err) : resolve(client);
        });
    })
}
//增加
// insert([{
//     name: '1'
// }])
const insert = (data, name) => {
    return new Promise(async (resolve, reject) => {
        let client = await colle();
        const db = client.db(dbName);
        const collection = db.collection(name);//表名
        collection.insertMany(data, function (err, result) {
            err ? reject(err) : resolve(result);
        });
    })
}
//删除
// remove({
//     name:'1'
// })
const remove = (data, name) => {
    return new Promise(async (resolve, reject) => {
        let client = await colle();
        const db = client.db(dbName);
        const collection = db.collection(name);
        collection.deleteOne(data, function (err, result) {
            err ? reject(err) : resolve(result);
        });
    })
}
//修改
// update({
//     name: '1'
// }, {
//     $set: {
//         name: '2'
//     }
// })
const update = (data, newdata, name) => {
    return new Promise(async (resolve, reject) => {
        let client = await colle();
        const db = client.db(dbName);
        const collection = db.collection(name);
        collection.updateOne(data, newdata, function (err, result) {
            err ? reject(err) : resolve(result);
        });
    })
}
//查询

const find = (data, name, index, num) => {
    return new Promise(async (resolve, reject) => {
        let client = await colle();
        const db = client.db(dbName);
        const collection = db.collection(name);
        if (num) {
            collection.find(data ? data : {}).skip(index).limit(num).toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
        }
        // else if (data) {
        //     collection.find({ title: { $regex: `${data}` } }).toArray(function (err, docs) {
        //         err ? reject(err) : resolve(docs);
        //         console.log(docs)
        //     });
        // } 
        else {
            collection.find(data ? data : {}).toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
        }
    })
}
// find('人', 'imglist') 
// (async function () {
//     let data = await find('', 'list')
//     data.map(item => {
//         item.list.map(item => {
//             if (item.id === 100060301) {
//                 console.log(item)
//             }
//         })
//     })
// })();


module.exports = {
    find,
    remove,
    update,
    insert
}