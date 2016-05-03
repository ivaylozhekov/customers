angular.module('test-app.components.customers-app', [
    'ngRoute',
    'test-app.components.customer-list',
    'test-app.components.order-list'
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
        template: '555'
    }).when('/customers', {
        template: '<customer-list></customer-list>'
    }).otherwise({redirectTo: '/customers'});
}).controller('CustomersAppController', function ($scope, $rootScope, mongolabFactory, $location) {
    initialize();
    function initialize(){
        getCurrentRoute();
        $scope.currentBookmark = {};
        $scope.tagMap = {};
    }

    function getCurrentRoute(){
        $scope.currentRoute = $location.path().split('/')[1];
    };


    this.getCustomers = function () {
        $location.path("/customers");
        getCurrentRoute();
    };
    this.getOrders = function () {
        $location.path("/orders");
        getCurrentRoute();
    };

    mongolabFactory.query().$promise.then(function(data){
        $scope.customerList = [
            {
                firstName: 'Victor',
                lastName: 'Brian',
                city: 'Seatle',
                orders: [
                        {product: 'iPod', quantity: 1, unitPrice: 399.99},
                        {product: 'Speakers', quantity: 1, unitPrice: 499.99}
                ]
            }, {
                firstName: 'Lee',
                lastName: 'Carroll',
                city: 'Phoenix',
                orders: [
                    {product: 'Basket', quantity: 1, unitPrice: 29.99},
                    {product: 'Needes', quantity: 1, unitPrice: 5.99},
                    {product: 'Yarn', quantity: 4, unitPrice: 9.99}
                ]
            }, {
                firstName: 'Albert', lastName: 'Einstein', city: 'New York City', orders: []
            }, {
                firstName: 'Lynette', lastName: 'Gonzalez', city: 'Albuquerque', orders: []
            }, {
                firstName: 'Jesse', lastName: 'Hawkins', city: 'Atlanta', orders: []
            }, {
                firstName: 'Shanika', lastName: 'Passmore', city: 'Orlando', orders: []
            }, {
                firstName: 'Eric', lastName: 'Pitman', city: 'Chicago', orders: []
            }, {
                firstName: 'Alice', lastName: 'Price', city: 'Cleveland', orders: []
            }, {
                firstName: 'Charles', lastName: 'Sutton', city: 'Quebec', orders: []
            }, {
                firstName: 'Gerard', lastName: 'Tucker', city: 'Buffalo', orders: []
            }, {
                firstName: 'Sonya', lastName: 'Williams', city: 'Los Angeles', orders: []
            }
        ];
        //extractTagMaps();
    });

    function extractTagMaps(){
        $scope.tagMap = $scope.bookmarkList.reduce(function (map, bookmark) {
            bookmark.tags.split(',').forEach(function (tag) {
                var _tag = tag.trim();
                if(_tag.length>0){
                    if (map[_tag]) {
                        map[_tag]++;
                    } else {
                        map[_tag] = 1;
                    }
                }
            });
            return map;
        }, {});
    }

    this.editBookmark = function (bookmark) {
        $scope.currentBookmark = angular.copy(bookmark);
    };

    this.deleteBookmark = function (bookmark) {
        return mongolabFactory.remove({id: bookmark._id.$oid}).$promise.then(function (resource) {
            $scope.bookmarkList.splice($scope.bookmarkList.indexOf(bookmark), 1);
            initializeCurrentBookmark();
            extractTagMaps();
        });
    };

    this.saveBookmark = function (bookmark) {
        initializeCurrentBookmark();
        if(bookmark._id !== undefined){
            return mongolabFactory.update({id: bookmark._id.$oid}, bookmark).$promise.then(function (resource) {
                var editedBookmark = $scope.bookmarkList.filter(function (obj) {
                    return bookmark._id.$oid === obj._id.$oid;
                })[0];
                editedBookmark._id = resource._id;
                angular.extend(editedBookmark, bookmark);
                extractTagMaps();
            });
        } else {
            return mongolabFactory.save(bookmark).$promise.then(function (resource) {
                bookmark._id = resource._id;
                $scope.bookmarkList.push(bookmark);
                extractTagMaps();
            });
        }
    };

    this.clearCurrentBookmark = function(){
        initializeCurrentBookmark();
    }
});
