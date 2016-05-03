angular.module('test-app.components.bookmark-list', [
    'ngRoute'
]).directive('bookmarkList', function ($routeParams, $location) {
    return {
        templateUrl: 'app/components/bookmark-list/bookmark-list.html',
        scope: {
            items: "="
        },
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
