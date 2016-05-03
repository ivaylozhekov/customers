angular.module('test-app.components.edit-bookmark', [
]).directive('editBookmark', function () {
    return {
        require:'^bookmarksApp',
        templateUrl: 'app/components/edit-bookmark/edit-bookmark.html',
        scope: {
            bookmark  : '='
        },
        link: function ( scope, element, attr, bookmarkAppCtrl ) {
            scope.save = function(){
                bookmarkAppCtrl.saveBookmark(scope.bookmark);
            };

            scope.clear = function(){
                bookmarkAppCtrl.clearCurrentBookmark();
            };
        }
    };
});
