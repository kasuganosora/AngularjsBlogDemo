module.exports = {
    index: function(req, res, next){
        res.render("Front/index.html",{
            isLogin: req.session.user  !== undefined
        });
    }
};