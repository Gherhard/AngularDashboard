myApp.service('manualTabGraphService', function ($log, socket) {

    return {

        sendManualMessage: function (agg, perc, quota, comp, stampo, days) {
            $log.info("Sending manual request to the server");
            socket.emit('message', {
                type: 'temporal_data.request',
                payload: {
                    aggregation: agg,
                    quota: quota,
                    componente: comp,
                    stampo: stampo,
                    perc: perc,
                    limit: '0,1000',
                    controlli: days
                }
            });
        },
        sendCompMessage: function (agg, qt) {
            $log.info("Sending componente request to the server");
            socket.emit('message', {
                type: "get_filter_componente.request",
                payload: {
                    aggregation: agg,
                    quota: qt
                }
            });
        },

        sendStampoMessage: function (agg, quota, comp, days) {
            $log.info("Sending stampo request to the server");
            socket.emit('message', {
                type: "get_filter_stampo.request",
                payload: {
                    aggregation: agg,
                    quota: quota,
                    componente: comp,
                    controlli: days
                }
            });
        }
    };
});
