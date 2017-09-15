myApp.factory('socket', function (socketFactory) {
    var mySocket = io.connect('http://bormioli.netseven.it:6210');
    return mySocket;
});
