(function (app) {
    app.controller('MaterialController', function ($scope, materialService) {
        $scope.materialService = materialService;
        $scope.$watch('materialService.data', function () {
            $scope.todoList = $scope.materialService.data;
        });
        $scope.materialService.findAll(function (data) {
            $scope.todoList = data;
            $scope.$apply();
        });
        $scope.add = function () {
            materialService.add($scope.newContent);
            $scope.newContent = '';
        }
        $scope.remove = function (todo) {
            materialService.remove(todo);
        }
        $scope.removeAll = function () {
            materialService.removeAll();
        }
        $scope.toggleCompleted = function () {
            materialService.sync();
        }
    });

}(angular.module("Application")));