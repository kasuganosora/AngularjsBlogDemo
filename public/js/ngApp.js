
// 定义APP模块
window.app = angular.module("SionBlog", ["ngRoute"]);

app.run(['$rootScope','$location','$http', '$route','$timeout', function($rootScope,$location,$http,$route,$timeout){
    // 加载完成 angular 后隐藏页面进度条 
    $rootScope.progress = 100;
    
    // 默认不为后台模式
    $rootScope.inAdminPanel = false;

    //默认主题名字
    $rootScope.theme = "default";
    
}]);