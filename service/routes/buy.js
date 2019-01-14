const buyBookList = require("../models/buyBookList.js");
const User = require("../models/user.js");
const buyDealRecord = require("../models/buyDealRecord.js");
const sellDealRecord = require("../models/sellDealReccord.js");
const publishRecord = require("../models/publishRecord.js");

exports.showBookList = (async(req,res,next) => {
    let limitNum = parseInt(req.query.limitNum);
    let skipNum = parseInt(req.query.skipNum);
    buyBookList.findAll(
        {        
            offset: skipNum,
            limit: limitNum
        }
    )
    .then((result) => {
        let bookList = [];
        result.forEach((dataValues) => {
            bookList.push(dataValues);
        });
        res.json({
            status: '0',
            msg: '获取购书信息成功',
            result: bookList
        })
    }).catch((err) => {
        console.log(err);
    });
});

exports.getPublisherInfo = (async(req,res,next) => {
    let username = req.query.username;
    var result = await User.findOne({
        where: {
            username: username
        }
    });
    if(result == null){
        res.json({
            status: '1',
            msg: '出错',
            result: ''
        })
    }else{
        res.json({
            status: '0',
            msg: '获取发布人信息成功',
            result: {
                "username": result.dataValues.username,
                "weixin": result.dataValues.weixin,
                "phone": result.dataValues.phone
            }
        })
    }
});

exports.doDeal = (async(req,res,next) => {
    let post = req.body.post;
    let formData = {
        "username": post.username,
        "avatar": post.avatar,
        "bookName": post.bookName,
        "bookDesc": post.bookDesc,
        "position": post.position,
        "time": post.time,
        "buyer": req.body.buyer
    };
    await publishRecord.update({"buyer":req.body.buyer},{where:{"nid":req.body.post.nid}});
    await sellDealRecord.create(formData);
    await buyDealRecord.create(formData);
    await buyBookList.destroy({where: {"nid": req.body.post.nid}});
    res.json({
        status: '0',
        msg: '交易成功',
        result: ''
    })
});

exports.doSearch = (async(req,res,next) => {
    let bookName = req.body.bookName;
    let allBuyList = [];
    let searchList = [];
    let reg = new RegExp(bookName.toLowerCase());
    let result =  await buyBookList.findAll({});
    for(let dataValues of result){
        allBuyList.push(dataValues);
    }
    for(let j=0;j<allBuyList.length;j++){
        if(reg.test(allBuyList[j].bookName.toLowerCase()) || reg.test(allBuyList[j].bookName.toUpperCase())){
            searchList.push(allBuyList[j]);
        }
    }
    // let reg = /[A-z][0-9]{1,}/i;


    res.json({
        status: '0',
        msg: '查询成功',
        result: searchList
    })
});