myApp.service('autoTabService', function ($log, socket) {

    return {
        sendDataRequestMessage: function (agg, perc) {
            $log.info("Sending request to the server");
            socket.emit('message', {
                //messageId: "univoco",
                type: "scatter_data.request",
                payload: {
                    aggregation: agg,
                    perc: perc,
                    limit: "0,1000"
                }
            });
        }
    };

});
