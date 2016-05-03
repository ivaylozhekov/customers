angular.module('test-app.components.tag-item', [
]).directive('tagItem', function ($location) {
    return {
        templateUrl: 'app/components/tag-item/tag-item.html',
        scope: {
            name: '=',
            count: '='
        },
        link: function ( scope ) {
            scope.filter = function(){
                $location.path('bookmarks/' + scope.name);
            }
        }
    };
});
