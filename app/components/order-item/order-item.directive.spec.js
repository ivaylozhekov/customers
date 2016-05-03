describe('test-app.components.bookmark-item', function () {

    beforeEach(module('test-app.components.bookmark-item'));
    var bookmarkItem = {
        "_id": {"$oid": "5717289de4b0d460bfa345a6"},
        "name": "jQuery1",
        "url": "http://www.jquery.com",
        "tags": "JavaScript, jQuery, Library"
    };
    var bookmarksAppCtrl ={
        editBookmark: jasmine.createSpy(),
        deleteBookmark: jasmine.createSpy()
    };
    var directive;
   beforeEach(inject(function (directiveBuilder) {
        directive = directiveBuilder.$build('<bookmark-item bookmark="bookmarkItem"></bookmark-item>',{
            bookmarkItem: bookmarkItem
        }, {bookmarksApp: bookmarksAppCtrl});
    }));

    it('should create element and it should not be empty', function () {
        var scope = directive.scope;
        expect(scope.bookmarkItem).toBeDefined();
        expect(directive.element.html()).not.toBe('');
    });

    it('should click edit button', inject(function ( $timeout ) {
        var scope = directive.element.isolateScope();
        directive.element.child('.btn-warning').triggerHandler('click');
        expect(bookmarksAppCtrl.editBookmark.calls.count()).toEqual(1);
    }));

    it('should click delete button', inject(function ( $timeout ) {
        var scope = directive.element.isolateScope();
        directive.element.child('.btn-danger').triggerHandler('click');
        expect(bookmarksAppCtrl.deleteBookmark.calls.count()).toEqual(1);
    }));


});
