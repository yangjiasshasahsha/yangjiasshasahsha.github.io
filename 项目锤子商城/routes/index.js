var express = require('express');
var router = express.Router();
const { find, insert, update, remove } = require('./db')
/* GET home page. */
//首页轮播图接口
router.get('/homebox', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  let data = await find('', 'lunbo');
  res.json(data)
});
//首页商品列表
router.get('/homelist', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  let data = await find('', 'list', 0, 1)
  res.json(data)
});
//首页懒加载
router.get('/homeadd', async function (req, res, next) {
  let obj = req.query;
  let index = obj.index * 1;
  res.append('Access-Control-Allow-Origin', '*');
  let data = await find('', 'list', index, 1)
  res.json(data)
});
//搜索商品列表
router.get('/searlist', async function (req, res, next) {
  let arr = [];
  let obj = req.query;
  let str = obj.name;
  res.append('Access-Control-Allow-Origin', '*');
  let data = await find('', 'list')
  data.map(item => {
    item.list.map(item => {
      if (item.name.indexOf(str) >= 0) {
        arr.push(item)
      }
    })
  })
  res.json(arr)
});
//列表接口
router.get('/navlist', async function (req, res, next) {
  let obj = req.query;
  let tag = obj.index * 1;
  res.append('Access-Control-Allow-Origin', '*');
  let data = await find('', 'nav')
  data.map((item, index) => {
    if (item.index == tag) {
      res.json(item)
    }
  })
});
//详情页接口
router.get('/details', async function (req, res, next) {
  let obj = req.query;
  let id = obj.id * 1;
  res.append('Access-Control-Allow-Origin', '*');
  let data = await find('', 'list')
  data.map(item => {
    item.list.map(item => {
      if (item.id === id) {
        res.json(item)
      }
    })
  })
});
//购物车接口
router.get('/addcar', async function (req, res, next) {
  let obj = req.query;
  let id = obj.id * 1;
  let num = obj.num * 1;
  let ok = 0;
  let itemnum = 0;
  res.append('Access-Control-Allow-Origin', '*');
  let content = await find('', 'car')
  let data = await find('', 'list')
  content.map(item => {
    if (item.id == id) {
      ok = 1;
      itemnum = item.num;
    }
  })
  if (ok) {
    let sum = itemnum * 1 + num;
    update({ id }, {
      $set: {
        num: sum
      }
    }, 'car')
  } else {
    data.map(item => {
      item.list.map(item => {
        if (item.id === id) {
          insert([{
            id: item.id,
            imgurl: item.imgurl,
            name: item.name,
            newprice: item.newprice,
            oldprice: item.oldprice,
            num: num
          }], 'car')
        }
      })
    })
  }
  res.status(200).send('ok');
});
router.get('/car', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  let data = await find('', 'car');
  res.json(data)
});
router.get('/delcar', async function (req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  let obj = req.query;
  let id = obj.id.split(',')
  for (let i = 0; i < id.length; i++) {
    remove({
      id: id[i] * 1
    }, 'car')
  }
  res.send('ok');
});
module.exports = router;
