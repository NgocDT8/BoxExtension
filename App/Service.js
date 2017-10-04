(function (app) {
    var materialService = function ($http, $q, $timeout, $rootScope) {

        var _this = this;
        this.data = [];
        return {
            findAll: function (callback) {
                chrome.storage.sync.get('todo', function (keys) {
                    if (keys.todo != null) {
                        _this.data = keys.todo;
                        for (var i = 0; i < _this.data.length; i++) {
                            _this.data[i]['id'] = i + 1;
                        }
                        //console.log(_this.data);
                        callback(_this.data);
                    }
                });
            },
            sync: function () {
                chrome.storage.sync.set({ todo: this.data }, function () {
                    //console.log('Data is stored in Chrome storage');
                });
            },
            add: function (newContent) {
                var id = this.data.length + 1;
                var todo = {
                    id: id,
                    content: newContent,
                    completed: false,
                    createdAt: new Date()
                };
                this.data.push(todo);
                this.sync();
            },
            remove: function (todo) {
                this.data.splice(this.data.indexOf(todo), 1);
                this.sync();
            },
            removeAll: function () {
                this.data = [];
                this.sync();
            }
        };
    }
    app.factory("materialService", materialService);
}(angular.module("Application")));