
// 定义APP模块
window.app = angular.module("SionBlog", ["ngRoute"]);

// 定义路由
app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
    $routeProvider.when("/",{
            templateUrl: 'home.html',
            controller: HomeCtrl,
            inAdminPanel: false
        })

        // 默认页面
        .otherwise('/',{
            redirectTo: '/'
        })
}]);

// 初始化 APP
app.run(['$rootScope','$location','$http', '$route','$timeout', function($rootScope,$location,$http,$route,$timeout){
    // 加载完成 angular 后隐藏页面进度条 
    $rootScope.progress = 100;
    
    // 默认不为后台模式
    $rootScope.inAdminPanel = false;

    //默认主题名字
    $rootScope.theme = "default";

    $rootScope.blogName = "xxxx's Blog";

    // 根据主题加载响应的模板(路由变更开始事件)
    $rootScope.$on("$routeChangeStart", function(event, next, current){
        if(!next.$$route.inAdminPanel){
            next.templateUrl = "/tpl/" +  $rootScope.theme + "/" + next.templateUrl;
        }else{
            next.templateUrl = "/tpl/admin/" + next.templateUrl;
        }
    });
}]);