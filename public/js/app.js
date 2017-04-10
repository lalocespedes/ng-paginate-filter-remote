(function () {
    'use strict';

    angular.module('lalocespedes', [
        'ngResource',
        'angularUtils.directives.dirPagination'
    ]);
})();

(function () {
    'use strict';

    angular
        .module('lalocespedes')
        .service('ServiceSuperheroes', ServiceSuperheroes);

    ServiceSuperheroes.inject = ['$log', '$resource'];
    function ServiceSuperheroes($log, $resource) {

        return $resource('/superheroes');

    }
})();

(function () {
    'use strict';

    angular
        .module('lalocespedes')
        .controller('SuperheroesController', SuperheroesController);

    SuperheroesController.inject = ['ServiceSuperheroes', '$log', '$scope'];
    function SuperheroesController(ServiceSuperheroes, $log, $scope) {
        var vm = this;

        vm.totalSuperheroes = 0;

        activate(1);

        vm.pagination = {
            current: 1
        };

        vm.filter = function () {
            activate(1);
        }

        $scope.$watch('vm.pagination.current', function (newValue, oldValue) {
            
            if (newValue !== oldValue && !vm.query) {
                return activate(newValue);
            }
        });

        ////////////////

        function activate(pageNumber) {

            return ServiceSuperheroes.query({
                name_like: vm.query,
                _page: pageNumber,
                _start: 0,
                _end: 10
            }, function (data, headers, status) {
                vm.superheroes = data;
                vm.totalSuperheroes = parseInt(headers('x-total-count'));
                return vm.superheroes;
            });
        }
    }

})();
