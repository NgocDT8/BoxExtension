(function (app) {
    var materialService = function ($http, $q, $timeout, $rootScope) {
        var unitEntities = [
            //{ "Key": 0, "Value": "Chọn đơn vị" },
            { "Key": 1, "Value": "(Mpa)" },
            { "Key": 2, "Value": "(T/m2)" },
            { "Key": 3, "Value": "(kG/m2)" },
            { "Key": 4, "Value": "(daN/m2)" },
            { "Key": 5, "Value": "(KN/m2)" },
            { "Key": 6, "Value": "(kG/cm2)" },
            { "Key": 7, "Value": "(N/mm2)" }
        ]

        return {
            unitService: function () {
                return unitEntities;
            }
        };
    }
    app.factory("materialService", materialService);
}(angular.module("Application")));