describe('test-app.components.tag-map', function () {

    beforeEach(module('test-app.components.tag-map'));
    var mapItem = {
        "Backbone": 1,
        "JavaScript": 5,
        "Library": 3,
        "Lodash": 1,
        "ReactJS": 1,
        "Underscore": 1,
        "jQuery": 1
    };
    var directive;
    beforeEach(inject(function (directiveBuilder) {
        directive = directiveBuilder.$build('<tag-map map="mapItem"></tag-map>',{
            mapItem: mapItem
        });
    }));

    it('should create element and it should not be empty', function () {
        var scope = directive.scope;
        expect(scope.mapItem).toBeDefined();
        expect(directive.element.html()).not.toBe('');
    });

    it('should clear map', function () {
        var scope = directive.element.isolateScope();
        scope.map = null;
        scope.$digest();
        expect(directive.element.html()).not.toBe('');
    });
});
