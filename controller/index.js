fs = require('fs');
path = require('path');

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
};