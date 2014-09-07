function header($scope,$route, $location){
    // 测试数据,后面会由后台吐出
    $scope.navs = {
        "主页": {href: "#/", active: false},
        "留言板": {href: "#/messageBoard", active: false},
        "关于我": {href: "#/aboutme", active: false}
    };

    // 设置当前的页面
    var currPath = $location.path();
    for(key in $scope.navs){
        if($scope.navs[key].href == "#" + currPath){
            $scope.navs[key].active = true;
            console.log(key);
        }else{
            $scope.navs[key].active = false;
        }
    }
}