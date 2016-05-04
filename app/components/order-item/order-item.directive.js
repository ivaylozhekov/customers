angular.module('test-app.components.order-item', [

]).directive('orderItem', function () {
    return {
        require:'^customersApp',
        templateUrl: 'app/components/order-item/order-item.html',
        scope: {
            customer: '='
        },
        link: function ( scope, element, attr, customersAppCtrl) {
            scope.currentOrder = {};
            getTotal();
            scope.edit = function(order){
                scope.isAddMode = false;
                scope.currentOrder = angular.copy(order);
                scope.currentOrder.quantity = Number(scope.currentOrder.quantity);
                scope.currentOrder.unitPrice = Number(scope.currentOrder.unitPrice);
            };
            scope.delete = function(order){
                var customer = angular.copy(scope.customer);
                var deletedItem = customer.orders.filter(function(obj){
                    return order.id === obj.id;
                })[0];

                customer.orders.splice(customer.orders.indexOf(deletedItem), 1);
                customersAppCtrl.saveCustomer(customer).then(scope.cancelEdit);
            };
            scope.save = function(){
                var customer = angular.copy(scope.customer);
                if(scope.currentOrder.id){
                    var editedOrder = customer.orders.filter(function(order){
                        return order.id === scope.currentOrder.id;
                    })[0];
                    angular.extend(editedOrder, scope.currentOrder);
                } else {
                    scope.currentOrder.id = guid();
                    customer.orders.push(scope.currentOrder);
                }
                customersAppCtrl.saveCustomer(customer).then(scope.cancelEdit);
            };
            scope.cancelEdit = function(){
                scope.isAddMode = false;
                scope.currentOrder = {};
                getTotal();
            };
            function getTotal(){
                if(scope.customer && scope.customer.orders){
                    scope.total = scope.customer.orders.reduce(function(previousValue, currentValue){
                        return previousValue + currentValue.quantity * currentValue.unitPrice;
                    },0);
                }
            }
            scope.add = function(){
                scope.currentOrder = {};
                scope.isAddMode = true;
            };

            function guid() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            }
        }
    };
});
