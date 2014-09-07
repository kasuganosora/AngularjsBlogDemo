var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// 设置Session
var session = require('express-session');
app.use(session({secret: 'KasuganoSora', cookie: { maxAge: 2592000000 }}))

app.use(bodyParser.json());

// 设定默认html编译引擎
app.engine('html', require('ejs').renderFile);

// 加载全部控制器
require("./controller")(app);

// 设定静态文件所在的目录
app.use(express.static(__dirname + '/public'));

// 启动web服务
app.listen(3000);