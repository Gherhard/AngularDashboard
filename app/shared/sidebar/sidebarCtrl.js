myApp.controller('sidebarCtrl', sidebarCtrl);

function sidebarCtrl($rootScope, $log, sidebarService) {

    var vm = this;

    vm.data1 = {
        availableOptions: [
            {
                id: '1',
                name: 'Quota',
                sname: 'quota'
            },
            {
                id: '2',
                name: 'Componente',
                sname: 'componente'
            },
            {
                id: '3',
                name: 'Stampo',
                sname: 'stampo'
            }
        ]
    };

    vm.selectedAgg = this.data1.availableOptions[0];

    vm.data2 = {
        availableOptions: [
            {
                id: '1',
                name: 'Percentuali non conformi',
                sname: 'NO_perc'
            },
            {
                id: '2',
                name: 'Percentuali conformi (OK)',
                sname: 'OK_perc'
            },
            {
                id: '3',
                name: 'Percentuali conformi (OKL)',
                sname: 'OKL_perc'
            }
        ]
    };

    vm.selectedPerc = this.data2.availableOptions[0];

    vm.changedValueAgg = function (item) {
        sidebarService.setAgg(item.sname);
        $log.info("Aggregazione changed to " + item.name);
        $rootScope.$broadcast("changedValueAgg");
    }

    vm.changedValuePerc = function (item) {
        sidebarService.setPerc(item.sname);
        $log.info("Percentuale changed to " + item.name);
        $rootScope.$broadcast("changedValuePerc");
    }
};
