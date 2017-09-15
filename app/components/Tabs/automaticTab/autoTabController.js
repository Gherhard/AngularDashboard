myApp.controller('autoTabController', autoTabController);

function autoTabController($rootScope, $scope, $log, sidebarService, autoTabService, dataserv, manualTabGraphService) {

    var vm = this;
    vm.options = {
        responsive: true,
        layout: {
            padding: {
                left: 10,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'y'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'n'
                }
            }]
        },
        pan: {
            // Boolean to enable panning
            enabled: true,

            // Panning directions. Remove the appropriate direction to disable 
            // Eg. 'y' would only allow panning in the y direction
            mode: 'xy'
        },

        // Container for zoom options
        zoom: {
            // Boolean to enable zooming
            enabled: true,

            // Zooming directions. Remove the appropriate direction to disable 
            // Eg. 'y' would only allow zooming in the y direction
            mode: 'xy',
        },
        tooltips: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            callbacks: {
                label: function (tooltipItem, data) {
                    var multitipstring = [];
                    var comp = 'Componente: ' + data.datasets[0].data[tooltipItem.index].Componente;
                    var quota = 'Quota: ' + data.datasets[0].data[tooltipItem.index].Quota;
                    var stampo = 'Stampo: ' + data.datasets[0].data[tooltipItem.index].Stampo;
                    var x = 'x: ' + data.datasets[0].data[tooltipItem.index].x;
                    var y = 'y: ' + data.datasets[0].data[tooltipItem.index].y;
                    var n = 'n: ' + data.datasets[0].data[tooltipItem.index].x;
                    var size = 'size: ' + data.datasets[0].data[tooltipItem.index].r;
                    multitipstring.push(comp);
                    multitipstring.push(quota);
                    multitipstring.push(stampo);
                    multitipstring.push(x);
                    multitipstring.push(y);
                    multitipstring.push(n);
                    multitipstring.push(size);
                    return multitipstring;
                }
            },
            displayColors: false
        }
    };

    $scope.$on("changedValueAgg", function (event, options) {
        if (sidebarService.getPerc() == 'NO_perc' || sidebarService.getPerc() == 'OK_perc' || sidebarService.getPerc() == 'OKL_perc') {
            autoTabService.sendDataRequestMessage(sidebarService.getAgg(), sidebarService.getPerc());
        }
    });

    $scope.$on("changedValuePerc", function (event, options) {
        vm.options.scales.yAxes[0].scaleLabel.labelString = sidebarService.getPerc();
        if (sidebarService.getAgg() == 'quota' || sidebarService.getAgg() == 'componente' || sidebarService.getAgg() == 'stampo') {
            autoTabService.sendDataRequestMessage(sidebarService.getAgg(), sidebarService.getPerc());
        }
    });

    $scope.$on("newData", function (event, data) {
        vm.data = dataserv.getData();
        vm.tdata = [];
        vm.tdata.push(vm.data[0].values);

    });

    $scope.onClick = function (points, evt) {
        var clickedElementindex = points[0]._index;
        var datiman = vm.tdata[0][clickedElementindex];
        manualTabGraphService.sendManualMessage(sidebarService.getAgg(), sidebarService.getPerc(), datiman.Quota, datiman.Componente, datiman.Stampo, 1);
        $rootScope.$broadcast("updateSelections", datiman);
        var r = confirm("You will see the selected point in manual selection,is that ok?");
        if (r == true) {
            //change tab
            //$scope.('.nav-tabs > .active').next('li').find('a').trigger('click');
        }

    };
    vm.colors = ["#068906"];

};
