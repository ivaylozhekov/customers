angular.module('test-app.components.customer-item', [

]).directive('customerItem', function ($location) {
    return {
        require:'^customersApp',
        templateUrl: 'app/components/customer-item/customer-item.html',
        scope: {
            customer: '='
        },
        link: function ( scope, element, attr, customersAppCtrl) {
            scope.$watch(function() {return customersAppCtrl.currentCustomer}, function (newValue) {
                scope.currentCustomer = newValue;
            });
            scope.edit = function(){
                customersAppCtrl.editCustomer(scope.customer);
            };

            scope.delete = function(){
                customersAppCtrl.deleteCustomer(scope.customer);
            };
            scope.showOrders = function () {
                $location.path('orders/' + scope.customer._id.$oid);
            }
        }
    };
});
