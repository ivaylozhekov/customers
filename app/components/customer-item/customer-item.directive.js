angular.module('test-app.components.customer-item', [

]).directive('customerItem', function () {
    return {
        require:'^customersApp',
        templateUrl: 'app/components/customer-item/customer-item.html',
        scope: {
            customer: '='
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
