myApp.controller('manualTabGraphController', manualTabGraphController);

function manualTabGraphController($rootScope, $scope, $log, sidebarService, manualTabGraphService, mandataserv, manserv) {

    var vm = this;
    var pointColors = [];
    vm.options = {
        responsive: true,
        line: {
            tension: 0
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'y'
                },
                type: 'linear',
                ticks: {
                    //suggestedMin: -0.1,
                    //suggestedMax: 1.01,
                    min: -0.05,
                    max: 1.05
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'n'
                },
                type: 'time',
                time: {
                    displayFormats: {
                        'day': 'MMM DD YYYY',
                        'week': 'MMM DD YYYY',
                        'month': 'MMM DD YYYY',
                        'quarter': 'MMM DD YYYY',
                        'year': 'MMM DD YYYY'
                    }
                }
            }]
        },
        elements: {
            line: {
                tension: 0,
                fill: false,
                borderWidth: 1.5
            },
            point: {
                radius: 6
            }
        },
        tooltips: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            callbacks: {
                label: function (tooltipItem, data) {
                    var multitipstring = [];
                    var statostampo = 'Stato Stampo: ' + data.datasets[0].data[tooltipItem.index].StatoStampo;
                    var x = 'x: ' + data.datasets[0].data[tooltipItem.index].x;
                    var y = 'y: ' + data.datasets[0].data[tooltipItem.index].y;
                    multitipstring.push(statostampo);
                    multitipstring.push(x);
                    multitipstring.push(y);
                    return multitipstring;
                }
            },
            displayColors: false
        }

    };

    $scope.$on("changedValueAgg", function (event, options) {
        if (sidebarService.getPerc() == 'NO_perc' || sidebarService.getPerc() == 'OK_perc' || sidebarService.getPerc() == 'OKL_perc') {
            $rootScope.$broadcast("newManDataToSend");
        }
    });

    $scope.$on("changedValuePerc", function (event, options) {
        vm.options.scales.yAxes[0].scaleLabel.labelString = sidebarService.getPerc();
        if (sidebarService.getAgg() == 'quota' || sidebarService.getAgg() == 'componente' || sidebarService.getAgg() == 'stampo') {
            $rootScope.$broadcast("newManDataToSend");
        }

    });
    $scope.$on("newManDataToSend", function (event, data) {
        manualTabGraphService.sendManualMessage(sidebarService.getAgg(), sidebarService.getPerc(), manserv.getQuota(), manserv.getComp(), manserv.getStampo(), manserv.getDays());
    });
    $scope.$on("newManDataReceived", function (event, data) {
        vm.data = mandataserv.getData();
        vm.tdata = [];
        vm.tdata.push(vm.data[0].values);
    });
    vm.colors = ["#ff3333", "#009933", "#3333ff"];

};
