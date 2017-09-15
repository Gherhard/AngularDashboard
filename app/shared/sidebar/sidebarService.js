myApp.service('sidebarService', function () {

    var _agg = {};
    var _perc = {};

    return {
        getAgg: function () {
            return _agg;
        },
        setAgg: function (value) {
            _agg = value;
        },
        getPerc: function () {
            return _perc;
        },
        setPerc: function (value) {
            _perc = value;
        }

    };

});
