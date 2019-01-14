let express = require("express");
let bodyParser = require("body-parser");
let jwt = require("jsonwebtoken");
let userRouter = require("./routes/user.js");
let sellRouter = require("./routes/sell.js");
let buyRouter = require("./routes/buy.js");
let config = require("./config.js");

var app = express();


app.use(express.static('./public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://192.168.191.1:8000');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'POST,GET');
    // res.header('Access-Control-Allow-Credentials', true);
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.use((req,res,next) => {
    console.log(req.originalUrl);
    //登录接口不检测
    if(req.originalUrl != '/user/doLogin' && req.originalUrl != '/user/doReg' && req.method != 'OPTIONS'){
        //拿取token
        let token = req.body.token || req.query.token || req.headers['authorization'];
        if(token){
            // 解码 token (验证 secret 和检查有效期（exp）)
            jwt.verify(token,config.jwtsecret,function(err,decoded){
                if(err){
                    return res.status(401).send({code:0,msg:'无效的token'});
                }else{
                    return next();
                }
            })
        }else{
            // 没有拿到token 返回错误 
            return res.status(401).send({
                code: 0,
                msg: '没有找到token'
            })
        }
    }else{
        return next();
    }
});

app.post("/user/doReg",userRouter.doReg);
app.post("/user/doLogin",userRouter.doLogin);
app.post("/user/rewriteInfo",userRouter.rewriteInfo);
app.post("/user/getInfo",userRouter.getInfo);
app.get("/user/getPublishRecord",userRouter.getPublishRecord);
app.get("/user/getBuyDealRecord",userRouter.getBuyDealRecord);
app.get("/user/getSellDealRecord",userRouter.getSellDealRecord);


app.post("/sell/doPublish",sellRouter.doPublish);

app.get("/buy/showBookList",buyRouter.showBookList);
app.post("/buy/doDeal",buyRouter.doDeal);
app.post("/buy/doSearch",buyRouter.doSearch);
// app.get("/buy/getPublisherInfo",buyRouter.getPublisherInfo);

app.listen(3000,"192.168.191.1",(err) => {
    if(err){
        console.log(err);
    }else{
        console.log("本地服务器已在运行!");
    }
});