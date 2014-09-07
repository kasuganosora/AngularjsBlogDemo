var appServices = angular.module("appServices",['ngResource']);

appServices.factory("User", function($resource){
    return $resource("/api/user/:id",{id:'@id'},{
        login: {method: "POST", url: "/admin/login"}
    });
});