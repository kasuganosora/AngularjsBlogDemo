fs = require('fs');
path = require('path');
var express = require('express');

module.exports = function(app){
    // 全部控制器
    var controllers = {};

    fs.readdirSync(__dirname).filter(function(filename){
        var extName = path.extname(filename);
        var name = filename.substr(0, filename.lastIndexOf("."));
        if([".js"].indexOf(extName) != -1 && ["index","test"].indexOf(name) == -1){
            return filename;
        }
    }).forEach(function(filename){
        var fullPath = path.join(__dirname,filename);
        var extName = path.extname(filename);
        var ctrlName = path.basename(filename,extName);
        // 加载 控制器
        controllers[ctrlName] = require(fullPath);
    });


    // 设定路由
    app.route("/")
        .get(controllers.Front.index);

    app.route("/admin/login")
        .post(controllers.Admin.login)


    // api 路由
    var apiRouter = express.Router()
        .use(function(req, res, next){
            //  权限审查
            if(req.method == "GET" && req.path.toLowerCase().indexOf("/article") == 0){
                return next();
            }

            if(req.session.user == undefined){
                return res.status(403).end("403 Forbidden");
            }

            next();
        });
        apiRouter.get("/article", controllers.Article.query);
        apiRouter.get("/article/:id", controllers.Article.get);
        apiRouter.post("/article", controllers.Article.save);
        apiRouter.post("/article/:id", controllers.Article.save);
        apiRouter.delete("/article/:id", controllers.Article.remove);
        apiRouter.get("/article_recent", controllers.Article.recent);

    app.use('/api', apiRouter);
};