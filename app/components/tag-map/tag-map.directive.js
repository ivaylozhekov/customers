angular.module('test-app.components.tag-map', [
]).directive('tagMap', function () {
    return {
        templateUrl: 'app/components/tag-map/tag-map.html',
        scope: {
            map: '='
        },
        link: function ( scope, element, attrs ) {
            scope.$watch('map', function(newValue, oldValue) {
                if (newValue){
                    scope.items = Object.keys(scope.map).reduce(function(list, key){
                        list.push({name: key, count: scope.map[key]});
                        return list;
                    },[]);
                }
            });
        }
    };
});
