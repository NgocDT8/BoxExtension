(function (app) {
    app.controller('MaterialController', function ($scope, materialService) {


        $scope.unitEntities = [];

        $scope.materialEntity = {};

        $scope.initData = function () {
            $scope.unitEntities = materialService.unitService();
            $scope.materialEntity.Unit = $scope.unitEntities[0];
        };

        $scope.changeUnit = function (item) {
            console.log("change :: ", item);
        };

    });

}(angular.module("Application")));