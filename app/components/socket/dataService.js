myApp.service('dataserv', function () {

    var _data = [];
    var content = [{
        key: "",
        values: []
    }];
    var _datacomp = {};
    var _datastampo = {};

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
                    tempy = 'NO_perc_mean';
                    break;
                case 'OK_perc':
                    tempy = 'OK_perc_mean';
                    break;
                case 'OKL_perc':
                    tempy = 'OKL_perc_mean';
                    break;
                default:
                    tempy = '';
            }
            for (var i = 0; i < bits.length; i++) {
                _data.push({
                    Componente: bits[i].Componente,
                    y: bits[i][tempy],
                    x: bits[i].n,
                    Stampo: bits[i].Stampo,
                    Quota: bits[i].Quota,
                    n: bits[i].n,
                    r: 10
                });
            }
            content = [{
                key: "Gruppo 1",
                values: _data
            }];
        },
        getDataComp: function () {
            return _datacomp;
        },
        setDataComp: function (value) {
            _datacomp = value;
        },
        getDataStampo: function () {
            return _datastampo;
        },
        setDataStampo: function (value) {
            _datastampo = value;
        }
    };
});
