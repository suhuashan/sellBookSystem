const buyBookList = require("../models/buyBookList.js");
const publishRecord = require("../models/publishRecord.js");
const fs = require('fs');


// // 把图片转换为base64编码
// function base64_encode(file) {
//     var bitmap = fs.readFileSync(file);
//     return new Buffer(bitmap).toString('base64');
// }

// 将base64编码转换为图片
function base64_decode(base64str, file) {
    let arr =  base64str.split(',');
    // console.log(arr);
    let bitmap = new Buffer(arr[1], 'base64');
    fs.writeFileSync(file, bitmap);
    console.log('******** 编码已转换为图片 ********');
}

exports.doPublish = (async(req,res,next) => {
    let avatarName = req.body.avatarName;
    let base64str = req.body.avatar;
    let time = Date.parse( new Date()).toString();
    if(avatarName != ""){
        avatarName = req.body.avatarName.split('.')[0] + time + '.' + req.body.avatarName.split('.')[1];
        // base64_decode(base64str, './public/image/'+avatarName);
        base64_decode(base64str, __dirname+ '/../'+'/public/image/'+avatarName);
    }

    let formData = {
        "username": req.body.username,
        "avatar": avatarName != "" ? 'http://192.168.191.1:3000/image/' + avatarName : "",
        "bookName": req.body.bookName,
        "bookDesc": req.body.bookDesc,
        "position": req.body.position,
        "time": req.body.time,
        "buyer": null
    };


    await publishRecord.create(formData);
    await buyBookList.create(formData);
    res.json({
        status: '0',
        msg: '发布成功',
        result: ''
    });
});