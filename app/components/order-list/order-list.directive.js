angular.module('test-app.components.order-list', [
    'ngRoute',
    'test-app.components.order-item'

]).directive('orderList', function ($routeParams, $location) {
    return {
        templateUrl: 'app/components/order-list/order-list.html',
        scope: true,
        link: function ( $scope ) {
            $scope.filter = {
                tag: $routeParams.tagFilter
            };
            $scope.clearFilter = function () {
                $scope.filter.tag= null;
                $location.path('bookmarks/');
            };            
        }
    };
});
