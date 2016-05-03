angular.module('sofia-training', [
    'test-app.components.bookmarks-app',
    'test-app.components.edit-bookmark',
    'test-app.components.bookmark-list',
    'test-app.components.bookmark-item',
    'sofiaTraining.templates',
    'test-app.components.tag-map',
    'test-app.components.tag-item',
    'mongolab-factory',
    'ngRoute'
]).config(function ($routeProvider) {
    $routeProvider.when('/bookmarks/:tagFilter', {
        template: '<bookmarks-app></bookmarks-app>'
    }).when('/bookmarks', {
        template: '<bookmarks-app></bookmarks-app>'
    }).otherwise({redirectTo: '/bookmarks'});
})
    .config(function (mongolabFactoryProvider) {
    mongolabFactoryProvider.setConfigs({
        dataBase: 'bookmark_app',
        apiKey: 'OhOFdBA8xQXyRdCvEsPXZTn3_-pLoZyD'
    });
});

//    .directive('sofiaTraining', function () {
//    return { templateUrl: 'app/app.module.html' };
// });

angular.module('sofiaTraining.templates', []);

try {
    angular.module('sofiaTraining-constant');
} catch (error) {
    angular.module('sofiaTraining-constant', []).constant('sofiaTrainingVersion', null);
}
