'use strict';

(function (Angular, $, undefined) {
    var app = angular.module("Application", [])
        // pagin
        .constant('DEFAULT_PAGE', 1)
        .run(function ($rootScope, $sce) {
            $rootScope.cgBusy = {
                delay: 0,
                minDuration: 0,
                message: 'Please Wait...',
                backdrop: true,
                templateUrl: "/Areas/Admin/Scripts/AngularJsNew/custom-template.html",
                promise: null
            };
            $rootScope.dateCurrent = new Date();
            $rootScope.titleEntity = {
                "GroupName": "Bảng tra đặc trưng vật liệu thép",
                "ChooseUnit": "Chọn đơn vị"
            };
        });

    // number integer
    app.directive('numberInteger', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attr, ctrl) {
                function inputValue(val) {
                    if (val) {
                        var digits = val.replace(/[^0-9]/g, '');

                        if (digits !== val) {
                            ctrl.$setViewValue(digits);
                            ctrl.$render();
                        }

                        return parseInt(digits, 10);
                    }

                    return undefined;
                }

                ctrl.$parsers.push(inputValue);
            }
        };
    });

    // number float
    app.directive('numberFloat', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attr, ctrl) {
                function inputValue(val) {
                    if (val) {
                        var digits = val.replace(/[^0-9.]/g, '');

                        if (digits !== val) {
                            ctrl.$setViewValue(digits);
                            ctrl.$render();
                        }

                        return parseFloat(digits);
                    }

                    return undefined;
                }

                ctrl.$parsers.push(inputValue);
            }
        };
    });

    app.directive('date', function (dateFilter) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {

                var dateFormat = attrs['date'] || 'dd/MM/yyyy';

                ctrl.$formatters.unshift(function (modelValue) {
                    return dateFilter(modelValue, dateFormat);
                });
            }
        };
    });


    // neu null hoac undefined thi tra ve true, ngoai ra tra ve false
    Angular.IsNullOrUndefined = function (object) {
        try {
            if (object != null && object != undefined && object !== "") {
                return false;
            }

            return true;
        } catch (err) {
            console.log(err);
        }

        return false;
    }

    // replace all 
    Angular.ReplaceAll = function (input, find, replace) {
        try {
            return input.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
        } catch (err) {
            console.log("ReplaceAll: " + err);
        }

        return "";
    }

    // convert chuoi sang so voi kieu du lieu la integer
    Angular.ConvertStringToInteger = function (value) {
        try {
            // kiem tra null
            if (Angular.IsNullOrUndefined(value)) return 0;

            // convert value to string
            value += "";

            // xoa ky tu "," neu ton tai trong chuoi
            if (value.indexOf(",") > -1) {
                value = Angular.ReplaceAll(value, ",", "");
            }

            // kiem tra kieu so
            if (!$.isNumeric(value)) { return 0; }

            // parse value to int            
            var result = parseInt(value);

            return result;
        }
        catch (err) {
            console.log("ConvertStringToInteger: " + err);
        }

        return 0;
    }

    // convert chuoi sang so voi kieu du lieu la float
    Angular.ConvertStringToFloat = function (value) {
        try {
            // kiem tra null
            if (Angular.IsNullOrUndefined(value)) return 0;

            // convert value to string
            value += "";

            // xoa ky tu "," neu ton tai trong chuoi
            if (value.indexOf(",") > -1) {
                value = Angular.ReplaceAll(value, ",", "");
            }

            // kiem tra kieu so
            if (!$.isNumeric(value)) { return 0; }

            // parse value to float
            var result = parseFloat(value);

            return result;
        }
        catch (err) {
            console.log("ConvertStringToFloat: " + err);
        }

        return 0;
    }

    // valid date
    Angular.ValidDate = function (value) {
        try {
            // check null
            if (Angular.IsNullOrUndefined(value)) {
                return false;
            }

            // parse date
            var date = $.datepicker.parseDate("dd/mm/yy", value);

            return true;
        }
        catch (e) {
            console.log("ValidDate:: false:: " + e);
            return false;
        }
    }

    // convert string to date
    Angular.ConvertStringToDate = function (value) {
        try {
            return $.datepicker.parseDate("dd/mm/yy", value);
        } catch (err) {
            console.log(err);
        }

        return null;
    }


    // request focus
    Angular.RequestFocus = function (id) {
        try {
            // find component
            var component = $("#" + id);

            // request focus
            component.focus();

            // get value
            var $initialVal = component.val();

            // reinit value
            component.val($initialVal + ' ');
            component.val($initialVal);
        } catch (err) {
            console.log(err);
        }
    };

    // show, hide left panel
    Angular.ShowHideLeftPanel = function (idMenu, idLeft, idRight) {
        try {
            // find component menu
            var menu = $("#" + idMenu);

            // set onclick
            menu.on("click",
                function () {
                    try {
                        // find component panel left
                        var left = $("#" + idLeft);

                        // find component panel right
                        var right = $("#" + idRight);

                        if (left.css("display") === "none") {
                            // class panel right
                            right.removeClass("col-md-12 col-lg-12 col-sm-12 col-xs-12");
                            right.addClass("col-md-8 col-lg-8 col-sm-7 col-xs-6");

                            // show menu left
                            left.show("slow");
                        } else {
                            // class panel right
                            right.removeClass("col-md-8 col-lg-8 col-sm-7 col-xs-6");
                            right.addClass("col-md-12 col-lg-12 col-sm-12 col-xs-12");

                            // hide menu left
                            left.hide("slow");
                        }
                    } catch (err) {
                        console.log(err);
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    (function (AngularJsERP, $, undefined) {
        AngularJsERP.pareDateERP = function (dt) {
            if (dt === null || dt === "" || dt === undefined) return null;

            var date = new Date(dt);
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yyyy = date.getFullYear();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            return new Date(yyyy + '-' + mm + '-' + dd + 'T00:00:00.000Z');
        }

        AngularJsERP.IsNullOrUndefined = function (object) {
            try {
                if (object != null && object !== undefined && object !== "") {
                    return false;
                }

                return true;
            } catch (err) {
                console.log(err);
            }

            return false;
        }

        AngularJsERP.ReplaceLink = function (val) {
            try {
                var str = '';
                if (val != null && val != undefined) {
                    str = val;
                }
                var str = str.toLowerCase();
                str = str.replace(/(\.|\/)(gif|jpe?g|png)$/gi, "");
                str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ  |ặ|ẳ|ẵ/g, "a");
                str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
                str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
                str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ  |ợ|ở|ỡ/g, "o");
                str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
                str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
                str = str.replace(/đ/g, "d");
                str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|\$|_/g, "-");
                // tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - /
                str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
                str = str.replace(/^\-+|\-+$/g, "");
                //cắt bỏ ký tự - ở đầu và cuối chuỗi
                return str;
            } catch (err) {
                console.log("ReplaceAll: " + err);
            }

            return "";
        }
    })(window.AngularJsERP = window.AngularJsERP || {}, jQuery);
}(window.Angular = window.Angular || {}, jQuery));