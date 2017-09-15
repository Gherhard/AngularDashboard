myApp.controller('socketCtrl', function ($rootScope, $log, socket, sidebarService, dataserv, mandataserv) {

    socket.on('connect', function () {
        $log.info("Socket connected ");
    });
    socket.on('disconnect', function () {
        $log.info("Socket disconnected ");
    });
    socket.on('message', function (data) {
        $log.info("Message received");
        handlemessage(data);
    });
    socket.on('welcome', function (data) {
        $log.info("Welcome received");
    });

    function handlemessage(data) {
        if (data.type == 'scatter_data.response.success') {
            var bits = [];
            var agg, prec;
            agg = sidebarService.getAgg();
            prec = sidebarService.getPerc();
            for (var i = 0; i < data.payload.data.length; i++) {
                bits.push(data.payload.data[i]);
            }
            dataserv.setData(bits, agg, prec);
            $log.info("Successful in receiving data");
            $rootScope.$broadcast("newData");
            $rootScope.$digest();
        }
        if (data.type == 'get_filter_componente.response.success') {
            $log.info("Component filter data received!");
            dataserv.setDataComp(data.payload.data.Componente);
            $rootScope.$broadcast("newCompData");
            $rootScope.$digest();
        }
        if (data.type == 'get_filter_stampo.response.success') {
            $log.info("Stampo filter data received!");
            dataserv.setDataStampo(data.payload.data.Stampo);
            $rootScope.$broadcast("newStampoData");
            $rootScope.$digest();
        }
        if (data.type == 'temporal_data.response.success') {
            $log.info("Manual filter data received!");
            mandataserv.setData(data.payload.data, sidebarService.getAgg(), sidebarService.getPerc());
            $rootScope.$broadcast("newManDataReceived");
            $rootScope.$digest();
        }
    }
});
