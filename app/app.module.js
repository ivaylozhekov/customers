angular.module('sofia-training', [
    'test-app.components.app-header',
    'test-app.components.customers-app',
    'sofiaTraining.templates',
    'mongolab-factory'
])
    .config(function (mongolabFactoryProvider) {
    mongolabFactoryProvider.setConfigs({
        dataBase: 'customer_management',
        apiKey: 'OhOFdBA8xQXyRdCvEsPXZTn3_-pLoZyD'
    });
})

   .directive('sofiaTraining', function () {
   return { templateUrl: 'app/app.module.html' };
});

angular.module('sofiaTraining.templates', []);

try {
    angular.module('sofiaTraining-constant');
} catch (error) {
    angular.module('sofiaTraining-constant', []).constant('sofiaTrainingVersion', null);
}
