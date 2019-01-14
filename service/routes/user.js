const User = require("../models/user.js");
const buyBooklist = require("../models/buyBooklist.js");
const publishRecord = require("../models/publishRecord.js");
const buyDealRecord = require("../models/buyDealRecord.js");
const md = require("../md.js");
const jwt = require("jsonwebtoken");
const config = require("../config.js");


exports.doReg = (async(req,res,next) => {
    let username = req.body.username;
    let password = md(req.body.password);
    let result = await User.findOne({where: {"username": username}});
    if(result == null){
        const userToken = {
            username,
            password,
            loginAt: +new Date
        };
        const token = jwt.sign(userToken,config.jwtsecret,{expiresIn:60 * 60 * 24 * 3});
        User.create({
            "username": username,
            "password": password
        }).then(() => {
            res.send({
                status: '0',
                msg: '注册成功',
                result: username,
                token: token
            })
        }).catch((err) => {
            console.log(err);
        });
    }else{
        res.send({
            status: '1',
            msg: '用户名已注册',
            result: ''
        })
    }
});


exports.doLogin = (async(req,res,next) => {
    let username = req.body.username;
    let password = md(req.body.password);
    let result = await User.findOne({where:{"username":username}});
    if(result != null){
        const userToken = {
            username,
            password,
            loginAt: +new Date
        };
        const token = jwt.sign(userToken,config.jwtsecret,{expiresIn:60 * 60 * 24 * 3});
        if(result.dataValues.password != password){
            res.json({
                status: '-1',
                msg: '密码错误',
                result: ''
            })
        }else{
            let result1 = await User.findOne({where:{"username":username}});
            res.json({
                status: '0',
                msg: '登陆成功',
                result: {
                    "username": username,
                    "weixin": result1.dataValues.weixin,
                    "phone": result1.dataValues.phone
                },
                token: token
            })
        }
    }else{
        res.json({
            status: '1',
            msg: '用户名还未注册',
            result: ''
        })
    }
});

exports.rewriteInfo = ((req,res,next) => {
    let weixin = req.body.weixin;
    let phone = req.body.phone;
    let username = req.body.username;
    User.update(
        {
            "weixin": weixin,
            "phone": phone
        },
        {
            where: {
                "username": username
            }
        }
    ).then(() => {
        res.json({
            status: '0',
            msg: '修改成功',
            result: ''
        });
    }).catch((err) => {
        console.log(err);
    })
});

exports.getInfo = (async(req,res,next) => {
    let username = req.body.username;
    let result1 = await User.findOne({where: {"username": username}});
    console.log(result1);
    res.json({
        status: '0',
        msg: '获取个人信息成功',
        result: {
            "weixin": result1.dataValues.weixin,
            "phone": result1.dataValues.phone
        }
    });
});

exports.getPublishRecord = (async(req,res,next) => {
    let username = req.query.username;
    let limitNum = parseInt(req.query.limitNum);
    let skipNum = parseInt(req.query.skipNum);
    let publishList = [];
    publishRecord.findAll({
        where:{
            "username": username
        },
        limit: limitNum,
        offset: skipNum
    }).then((result) => {
        for(let dataValues of result){
            publishList.push(dataValues);
        }
        res.json({
            status: '0',
            msg: '获取发布记录成功',
            result: publishList
        });
    }).catch((err) => {
        console.log(err);
    });
});

exports.getBuyDealRecord = (async(req,res,next) => {
    let buyer = req.query.buyer;
    // let limitNum = parseInt(req.query.limitNum1);
    // let skipNum = parseInt(req.query.skipNum1);
    let dealList = [];
    buyDealRecord.findAll({
        where:{
            "buyer": buyer
        }
        // limit: limitNum,
        // offset: skipNum
    }).then((result) => {
        for(let dataValues of result){
            dealList.push(dataValues); 
        }
        res.json({
            status: '0',
            msg: '获取购买记录成功',
            result: dealList
        });
    }).catch((err) => {
        console.log(err);
    });
});

exports.getSellDealRecord = (async(req,res,next) => {
    let username = req.query.username;
    // let limitNum = parseInt(req.query.limitNum2);
    // let skipNum = parseInt(req.query.skipNum2);
    let dealList = [];
    buyDealRecord.findAll({
        where:{
            "username": username,
            "buyer": {
                $ne: null
            }
        }
        // limit: limitNum,
        // offset: skipNum
    }).then((result) => {
        for(let dataValues of result){
            dealList.push(dataValues); 
        }
        res.json({
            status: '0',
            msg: '获取出售记录成功',
            result: dealList
        });
    }).catch((err) => {
        console.log(err);
    });
});