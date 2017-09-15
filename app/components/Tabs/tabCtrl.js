myApp.controller('TabController', TabController);

function TabController($scope, $log) {
    this.tab = 1;

    this.selectTab = function (setTab) {
        this.tab = setTab;
    };
    this.isSelected = function (checkTab) {
        return this.tab === checkTab;
    };
};
