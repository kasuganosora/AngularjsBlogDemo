// 全部后台的 控制器放在这了(偷懒)

function AdminLogin($scope,User, $location, $rootScope){
    $scope.onSubmit = function(){
        var password = $scope.password;
        var result = User.login({password: password},function(){
            if(result.success == true){
                window.isLogin = true;
                $rootScope.isLogin = true;
                $location.path("/admin");
            }else{
                alert("登录错误");
            }
        });
    };
}



function AdminCtrl($scope, Article){
    $scope.articles = Article.query();
    $scope.destroy = function(art){
        Article.remove({id:art.id});
        $scope.articles = Article.query();
    };
}



function AdminArticleSetCtrl($scope, $routeParams, Article){
    var id = $routeParams.id == undefined ? null :  $routeParams.id.trim();

    if(id != null){
        $scope.article = Article.get({id:id});
    }

    $scope.onSubmit = function(article){
        article.id = id;
        Article.save(article,function(){
            alert("保存成功!");
        });
    };

}