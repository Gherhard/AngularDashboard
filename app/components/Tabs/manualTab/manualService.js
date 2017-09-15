myApp.service('manserv', function () {

    var _comp = {};
    var _quota = {};
    var _stampo = {};
    var _days = {};

    return {
        getComp: function () {
            return _comp;
        },
        setComp: function (value) {
            _comp = value;
        },
        getQuota: function () {
            return _quota;
        },
        setQuota: function (value) {
            _quota = value;
        },
        getStampo: function () {
            return _stampo;
        },
        setStampo: function (value) {
            _stampo = value;
        },
        getDays: function () {
            return _days;
        },
        setDays: function (value) {
            _days = value;
        }
    };
});
