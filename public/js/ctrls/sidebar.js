function sidebar($scope){
    //  最近的文章
    $scope.recentArticles = [];

    //假数据 后面会由后台吐出
    var i;
    for(i=12; i > 0; i--){
        var d = new Date(Date.now() - 86400000 * i * 30);
        var mon = d.getMonth() + 1;
        var dateStr = d.getFullYear() + "年" + mon + "月";
        var count = Math.floor(Math.random() * 100);
        $scope.recentArticles.push({
            date: d.getFullYear() + "-" + mon + "-" + d.getDate(),
            dateStr: dateStr,
            count: count
        });
    }

}