describe('test-app.components.edit-bookmark', function () {

    beforeEach(module('test-app.components.edit-bookmark'));
    var bookmarkItem = {
        "_id": {"$oid": "5717289de4b0d460bfa345a6"},
        "name": "jQuery1",
        "url": "http://www.jquery.com",
        "tags": "JavaScript, jQuery, Library"
    };
    var bookmarksAppCtrl ={
        saveBookmark: jasmine.createSpy(),
        clearCurrentBookmark: jasmine.createSpy()
    };
    var directive;
    beforeEach(inject(function (directiveBuilder) {
        directive = directiveBuilder.$build('<edit-bookmark bookmark="bookmarkItem"></edit-bookmark>',{
            bookmarkItem: bookmarkItem
        }, {bookmarksApp: bookmarksAppCtrl});
    }));

    it('should create element and it should not be empty', function () {
        var scope = directive.scope;
        expect(scope.bookmarkItem).toBeDefined();
        expect(directive.element.html()).not.toBe('');
    });

    it('should click edit button', inject(function () {
        var scope = directive.element.isolateScope();
        directive.element.child('.btn-success').triggerHandler('click');
        expect(bookmarksAppCtrl.saveBookmark.calls.count()).toEqual(1);
    }));

    it('should click delete button', inject(function () {
        var scope = directive.element.isolateScope();
        directive.element.child('.btn-default').triggerHandler('click');
        expect(bookmarksAppCtrl.clearCurrentBookmark.calls.count()).toEqual(1);
    }));
});
