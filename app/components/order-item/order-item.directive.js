angular.module('test-app.components.order-item', [

]).directive('orderItem', function () {
    return {
        require:'^customersApp',
        templateUrl: 'app/components/order-item/order-item.html',
        scope: {
            orders: '='
        },
        link: function ( scope, element, attr, bookmarkAppCtrl) {
            scope.edit = function(){
                bookmarkAppCtrl.editBookmark(scope.bookmark);
            };

            scope.delete = function(){
                bookmarkAppCtrl.deleteBookmark(scope.bookmark);
            };
            scope.total = scope.orders.reduce(function(previousValue, currentValue){
                return previousValue + currentValue.quantity * currentValue.unitPrice;
            },0)
        }
    };
});
