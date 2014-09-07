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

function AdminCtrl(){}

function AdminArticleSetCtrl(){}