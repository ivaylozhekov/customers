angular.module('test-app.components.customers-app', [
    'ngRoute',
    'test-app.components.customer-list',
    'test-app.components.order-list',
    'test-app.components.customer-orders'
]).directive('customersApp', function () {
    return {
        templateUrl: 'app/components/customers-app/customers-app.html',
        scope: {},
        controllerAs: 'appController',
        controller: 'CustomersAppController',
        bindToController: true
    };
}).config(function ($routeProvider) {
    $routeProvider.when('/orders', {
        template: '<order-list></order-list>'
    }).when('/orders/:customerId', {
        template: '<customer-orders></customer-orders>'
    }).when('/customers', {
        template: '<customer-list></customer-list>'
    }).otherwise({redirectTo: '/customers'});
}).controller('CustomersAppController', function ($scope, $rootScope, mongolabFactory, $location) {
    getCurrentRoute();
    $scope.customerList = [];
    setCurrentCustomer = setCurrentCustomer.bind(this);
    resetCurrentCustomer = resetCurrentCustomer.bind(this);
    resetCurrentCustomer();

    function setCurrentCustomer(customer){
        this.currentCustomer = customer;
    }
    function resetCurrentCustomer(){
        this.currentCustomer = {orders: []};
    }

    function getCurrentRoute(){
        $scope.currentRoute = $location.path().split('/')[1];
    };


    this.getCustomers = function () {
        resetCurrentCustomer();
        $location.path("/customers");
        getCurrentRoute();
    };
    this.getOrders = function () {
        resetCurrentCustomer();
        $location.path("/orders");
        getCurrentRoute();
    };

    mongolabFactory.query().$promise.then(function(data){
        $scope.customerList = data;
    });

    this.editCustomer = function (customer) {
        setCurrentCustomer(angular.copy(customer));
    };

    this.deleteCustomer = function (customer) {
        return mongolabFactory.remove({id: customer._id.$oid}).$promise.then(function (resource) {
            $scope.customerList.splice($scope.customerList.indexOf(customer), 1);
            resetCurrentCustomer();
        });
    };

    this.saveCustomer = function (customer) {
        if(customer._id !== undefined){
            return mongolabFactory.update({id: customer._id.$oid}, customer).$promise.then(function (resource) {
                var editedCustomer = $scope.customerList.filter(function (obj) {
                    return customer._id.$oid === obj._id.$oid;
                })[0];
                editedCustomer._id = resource._id;
                angular.extend(editedCustomer, customer);
                resetCurrentCustomer();
            });
        } else {
            return mongolabFactory.save(customer).$promise.then(function (resource) {
                customer._id = resource._id;
                $scope.customerList.push(customer);
                resetCurrentCustomer();
            });
        }
    };

    this.clearCurrentCustomer = function(){
        resetCurrentCustomer();
    };

    this.addOrder = function(customer){
        customer.orders.push({});
    };
});
