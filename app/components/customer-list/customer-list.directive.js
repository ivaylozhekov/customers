angular.module('test-app.components.customer-list', [
    'ngRoute',
    'test-app.components.customer-item'

]).directive('customerList', function ($routeParams, $location) {
    return {
        templateUrl: 'app/components/customer-list/customer-list.html',
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
