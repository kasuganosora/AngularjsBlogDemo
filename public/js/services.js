var appServices = angular.module("appServices",['ngResource']);

appServices.factory("User", function($resource){
    return $resource("/api/user/:id",{id:'@id'},{
        login: {method: "POST", url: "/admin/login"}
    });
});


appServices.factory("Article", function($resource){
    return $resource("/api/article/:id",{id:'@id'},{
        recent: {method: "GET", url: "/api/article_recent", isArray: true}
    });
});