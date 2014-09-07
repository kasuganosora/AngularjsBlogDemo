module.exports = {
    login: function(req, res, next){
        if(req.body.password == "123456789"){
            req.session.user = {name: "Sion", id: "1"};
            res.json({success: true, user: req.session.user});
        }else{
            res.json({success: false});
        }
    }
};