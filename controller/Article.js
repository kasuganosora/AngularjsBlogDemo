module.exports = {

    // 必须返回一个数组
    query: function(req, res, next){
        var articles = [];
        res.db.createReadStream({reverse:true})
            .on("data",function(data){
                if(data.key.indexOf("article_") !== 0){
                    return;
                }
                articles.push(data.value);
            })
            .on("end",function(){
                res.json(articles);
            });
    },

    get: function(req, res, next){
        var id = req.param("id");
        res.db.get("article_" + id, function (err, value){
            if(err){ 
                res.json(null); 
            }else{
                res.json(value); 
            }
        });
    },

    save: function(req, res, next){
        var id = req.param("id");
        res.db.get("next_article_id",function(err, value){
            var nextId = value == null ? 1 : value + 1;
            if(id == null){
                res.db.put("next_article_id",nextId);
            }

            id = id == null ? nextId : id;
            var data = {title: req.body.title, content: req.body.content, id: id, timestamp: Date.now() };

            res.db.put("article_" + id, data, function(err){
                if(err){ return res.status(500).end("server error"); }
                res.json(data);
            });
        })
    },


    remove: function(req, res, next){
        var id = req.param("id");
        if(id == null){
            res.status("400").end();
        }else{
            res.db.del("article_"+ id);
            res.json(true);
        }
    },

    recent: function (req, res, next){
        var articles = [];
        res.db.createReadStream({reverse:true, limit: 10})
            .on("data",function(data){
                if(data.key.indexOf("article_") !== 0){
                    return;
                }
                articles.push(data.value);
            })
            .on("end",function(){
                res.json(articles);
            });
    }
};