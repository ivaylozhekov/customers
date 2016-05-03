angular.module('test-app.components.bookmark-item', [

]).directive('bookmarkItem', function () {
    return {
        require:'^bookmarksApp',
        templateUrl: 'app/components/bookmark-item/bookmark-item.html',
        scope: {
            bookmark: '='
        },
        link: function ( scope, element, attr, bookmarkAppCtrl) {
            scope.edit = function(){
                bookmarkAppCtrl.editBookmark(scope.bookmark);
            };

            scope.delete = function(){
                bookmarkAppCtrl.deleteBookmark(scope.bookmark);
            };
        }
    };
});
