describe('test-app.components.bookmark-list', function () {

    beforeEach(module('test-app.components.bookmark-list'));

    var itemList = [{
        "_id": {"$oid": "5717289de4b0d460bfa345a6"},
        "name": "jQuery1",
        "url": "http://www.jquery.com",
        "tags": "JavaScript, jQuery, Library"
    }, {
        "_id": {"$oid": "5717289de4b0d460bfa345a7"},
        "name": "UnderscoreJS",
        "url": "http://www.underscorejs.org",
        "tags": "JavaScript, Library, Underscore"
    }, {
        "_id": {"$oid": "5717289de4b0d460bfa345a8"},
        "name": "Backbone",
        "url": "http://www.backbonejs.org",
        "tags": "Backbone, JavaScript"
    }, {
        "_id": {"$oid": "57179670e4b07036dddc1928"},
        "url": "http://reactjs.com",
        "name": "ReactJS",
        "tags": "JavaScript,Library, ReactJS"
    }, {
        "_id": {"$oid": "57179dc3e4b07036dddc75cf"},
        "url": "http://www.lodash.com",
        "name": "Lodash",
        "tags": "Lodash, JavaScript"
    }];
    var directive;
    var $routeParams;
    beforeEach(inject(function (directiveBuilder, _$routeParams_) {
        $routeParams = _$routeParams_;
        directive = directiveBuilder.$build('<bookmark-list items="itemList"></bookmark-list>',{
            itemList: itemList
        });
    }));

    it('should create element and it should not be empty', function () {
        var scope = directive.scope;
        expect(scope.itemList).toBeDefined();
        expect(directive.element.html()).not.toBe('');
    });

    it('should clear filter', inject(function () {
        var scope = directive.element.isolateScope();
        var stateElement = directive.element.child('.filterName');
        scope.filter.tag = 'someFilter';
        scope.$digest();

        expect(stateElement.html()).toBe('Filtered By Tag: someFilter');
        directive.element.child('a').triggerHandler('click');
        expect(stateElement.html()).toBe('Filtered By Tag: None');
    }));


});
