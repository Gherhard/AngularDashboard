myApp.service('mandataserv', function () {

    var _data = [];
    var format = d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ");
    var content = [{
        key: "",
        values: []
    }];
    return {
        getData: function () {
            return content;
        },
        setData: function (bits, agg, prec) {
            if (_data.length != 0) {
                _data = [];
            }
            var tempy;
            switch (prec) {
                case 'NO_perc':
                    tempy = 'NO_perc';
                    break;
                case 'OK_perc':
                    tempy = 'OK_perc';
                    break;
                case 'OKL_perc':
                    tempy = 'OKL_perc';
                    break;
                default:
                    tempy = '';
            }
            for (var i = 0; i < bits.length; i++) {
                _data.push({
                    Data: bits[i].Data,
                    y: bits[i][tempy],
                    x: format.parse(bits[i].Data),
                    StatoStampo: bits[i].StatoStampo,
                });
            }
            content = [{
                key: "Gruppo 1",
                values: _data
            }];
        }
    };
});
