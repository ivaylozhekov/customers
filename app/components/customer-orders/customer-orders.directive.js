angular.module('test-app.components.customer-orders', [
    'ngRoute',
    'test-app.components.order-item'

]).directive('customerOrders', function ($routeParams, $location) {
    return {
        templateUrl: 'app/components/customer-orders/customer-orders.html',
        link: function ( scope ) {
            scope.$watch(function() {return scope.$parent.customerList}, function (newValue) {
                scope.currentCustomer =  newValue.filter(function (obj) {
                    return obj._id.$oid === $routeParams.customerId;
                })[0];
            });
        }
    };
});
