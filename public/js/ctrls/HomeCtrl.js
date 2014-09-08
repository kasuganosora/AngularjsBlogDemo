function HomeCtrl($scope, $sce, Article){
    $scope.articles = Article.query();

    // 防止HTML被转义
    $scope.outHTML = function(str){
        return $sce.trustAsHtml(str)
    };
}

