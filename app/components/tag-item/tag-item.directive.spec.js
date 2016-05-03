describe('test-app.components.tag-item', function () {

    beforeEach(module('test-app.components.tag-item'));
    var directive;
    beforeEach(inject(function (directiveBuilder) {
        directive = directiveBuilder.$build('<tag-item name="tagName" count="tagCount"></tag-item>',{
            tagName: 'JavaScript',
            tagCount: 4
        });
    }));

    it('should create element and it should not be empty', function () {
        var scope = directive.scope;
        expect(scope.tagName).toBeDefined();
        expect(scope.tagCount).toBeDefined();
        expect(directive.element.html()).not.toBe('');
    });

    it('should click filter link', inject(function ($location) {
        var scope = directive.element.isolateScope();
        expect($location.path()).toEqual('');
        directive.element.child('a').triggerHandler('click');
        expect($location.path()).toEqual('/bookmarks/JavaScript');
    }));


});
