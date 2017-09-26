myApp.controller('manualTabController', manualTabController);

function manualTabController($rootScope, $log, $scope, sidebarService, manserv, dataserv, mandataserv, socket, manualTabGraphService) {

    manserv.setDays(20);
    var vm = this;
    vm.quote = {
        availableOptions: [],
        selectedOption: {
            id: '0',
            name: ''
        },
    };
    vm.componenti = {
        availableOptions: [],
        selectedOption: {
            id: '0',
            name: ''
        },
    };
    vm.stampi = {
        availableOptions: [],
        selectedOption: {
            id: '0',
            name: ''
        },
    };

    vm.slider = {
        value: 20,
        options: {
            floor: 0,
            ceil: 50,
            showTicks: true,
            step: 1,
            onChange: function () {
                vm.changedValueDays();
            }
        }
    };

    vm.display1 = function () {
        var newValue = sidebarService.getAgg();
        if (newValue != null) {
            if (newValue == 'quota') {
                return true;
            } else
                return false;
        }
    };

    vm.display2 = function () {
        var newValue = sidebarService.getAgg();
        if (newValue != null) {
            if (newValue == 'quota' || newValue == 'componente') {
                return true;
            } else
                return false;
        }
    };

    vm.display3 = function () {
        var newValue = sidebarService.getAgg();
        if (newValue != null) {
            if (newValue == 'componente' || newValue == 'quota' || newValue == 'stampo') {
                return true;
            } else
                return false;
        }
    };

    vm.changedValueQuota = function (item) {
        manserv.setQuota(item);
        vm.componenti.selectedOption = {};
        vm.stampi.selectedOption = {};
        manserv.setDays(20);
        manualTabGraphService.sendCompMessage(sidebarService.getAgg(), item);
    };

    vm.changedValueComp = function (item) {
        manserv.setComp(item);
        vm.stampi.selectedOption = {};
        manserv.setDays(20);
        if (manserv.getDays().length == 0)
            $log.info("what is days before: " + manserv.getDays());
        manualTabGraphService.sendStampoMessage(sidebarService.getAgg(), manserv.getQuota(), item, manserv.getDays());
    };

    vm.changedValueStampo = function (item) {
        manserv.setStampo(item);
        $rootScope.$broadcast("newManDataToSend");
    };

    vm.changedValueDays = function (value) {
        manserv.setDays(vm.slider.value);
        vm.stampi.selectedOption = {};
        manualTabGraphService.sendStampoMessage(sidebarService.getAgg(), manserv.getQuota(), manserv.getComp(), manserv.getDays());
    };

    $scope.$on("newData", function (event, data) {
        handleData("newData");
    });

    $scope.$on("newCompData", function (event, data) {
        handleData("newCompData");
    });

    $scope.$on("newStampoData", function (event, data) {
        handleData("newStampoData");
    });

    $scope.$on("updateSelections", function (event, data) {
        //$log.info(data);
        vm.stampi.selectedOption = {};
        vm.componenti.selectedOption = {};
        vm.quote.selectedOption = {};

        //update the selectedOption in those select menus
        vm.quote.selectedOption = data.Quota;
        vm.componenti.availableOptions = [data.Componente];
        vm.componenti.selectedOption = data.Componente;
        vm.stampi.availableOptions = [data.Stampo];
        vm.stampi.selectedOption = data.Stampo;
        manserv.setQuota(data.Quota);
        manserv.setComp(data.Componente);
        manserv.setStampo(data.Stampo);
        manserv.setDays(1);

    });


    function handleData(dataType) {
        switch (dataType) {
            case 'newData':
                var d = dataserv.getData();
                var dati = d[0].values;
                for (var i = 0; i < dati.length; i++) {
                    if (sidebarService.getAgg() == 'quota') {
                        if ((vm.quote.availableOptions.indexOf(dati[i].Quota)) == -1)
                            vm.quote.availableOptions.push(dati[i].Quota);
                    }
                    if (sidebarService.getAgg() == 'componente') {
                        if ((vm.componenti.availableOptions.indexOf(dati[i].Componente)) == -1) {
                            vm.componenti.availableOptions.push(dati[i].Componente);
                        }
                    }
                    if (sidebarService.getAgg() == 'stampo') {
                        if ((vm.stampi.availableOptions.indexOf(dati[i].Stampo)) == -1)
                            vm.stampi.availableOptions.push(dati[i].Stampo);
                    }
                }
                break;
            case 'newCompData':
                vm.componenti.availableOptions = {};
                var td = dataserv.getDataComp();
                vm.componenti.availableOptions = td;
                break;
            case 'newStampoData':
                vm.stampi.availableOptions = {};
                var td = dataserv.getDataStampo();
                vm.stampi.availableOptions = td;
                if (td.length == 0) {
                    vm.stampi.availableOptions = ["No entries available"];
                }
                break;
        }
    };
};
