(function (app) {
    app.controller('MaterialController', function ($scope, materialService) {

        $scope.entity = { "value1": 1, "value2": 1, "value3": 1 };
        $scope.total = 1;
        $scope.changeValue = function (val) {
            $scope.total = $scope.entity.value1 * $scope.entity.value2 * $scope.entity.value3;
        };
    });

}(angular.module("Application")));