
// 定义APP模块
window.app = angular.module("SionBlog", ["ngRoute","appServices"]);

// 定义路由
app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
    $routeProvider.when("/",{
            templateUrl: 'home.html',
            controller: HomeCtrl,
            inAdminPanel: false,
            needAuth: false
        })
        .when("/article/:id",{
            templateUrl: 'article.html',
            controller: ArticleCtrl,
            inAdminPanel: false,
            needAuth: false
        })

        .when("/admin/login",{
            templateUrl: 'login.html',
            controller: AdminLogin,
            inAdminPanel: true,
            needAuth: false,
        })

        .when("/admin",{
            templateUrl: 'admin.html',
            controller: AdminCtrl,
            inAdminPanel: true,
            needAuth: true,
        })
        .when("/admin/article/set/:id?",{
            templateUrl: 'articleEdit.html',
            controller: AdminArticleSetCtrl,
            inAdminPanel: true,
            needAuth: true,
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

    // 登录态
    $rootScope.isLogin = window.isLogin;

    // 根据主题加载响应的模板(路由变更开始事件)
    $rootScope.$on("$routeChangeStart", function(event, next, current){
        if(next.$$route == undefined){
            return;
        }


        //  判断当时是在前台还是在后台
        $rootScope.inAdminPanel = next.$$route.inAdminPanel;

        if(!next.$$route.inAdminPanel){
            next.templateUrl = "/tpl/" +  $rootScope.theme + "/" + next.templateUrl;
        }else{
            $rootScope.theme = "admin";
            next.templateUrl = "/tpl/admin/" + next.templateUrl;

            // 如果没有登录的话就跳去登录页
            if(!$rootScope.isLogin && next.$$route.controller.name != "AdminLogin"){
                $location.path("/admin/login")
                return false;
            }
        }
    });
}]);