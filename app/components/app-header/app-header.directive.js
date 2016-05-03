angular.module('test-app.components.app-header', [
]).directive('appHeader', function ($location) {
    return {
        templateUrl: 'app/components/app-header/app-header.html',
        scope: true        
    };
});
