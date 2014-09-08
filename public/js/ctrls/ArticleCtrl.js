function ArticleCtrl($scope,$sce, $routeParams, Article){
    $scope.article = Article.get($routeParams);
    // 防止HTML被转义
    $scope.outHTML = function(str){
        return $sce.trustAsHtml(str)
    };
}