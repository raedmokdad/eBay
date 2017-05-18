'use strict';




var parameters = require('./Parameters');
var socket = require('./socket');
var loadFil = require('./filterMethoden');
var getHTTP = require('./getHTTP.js').getHTTP;
var fork = require('child_process').fork;
var exec = require('child_process').exec;
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var getHTTP = require('./getHTTP.js').getHTTP;

var child1 = fork(__dirname + '/getHTTP.js');
var child2 = fork(__dirname + '/getHTTP.js');
//var child3 = fork(__dirname + '/getHTTP.js');
//var child4 = fork(__dirname + '/getHTTP.js');


var whichChild = 1;

function execute(command, callback){
    console.log('-- command');
    exec(command, function(error, stdout, stderr){ callback(stdout); });
}
child1.on ('message' , function(m){
        console.log('\npr1 The answer is: ', m.answer);
    //  process.stdout.write('\npr1 The answer is: ', m.answer);
    child1.send({cmd: 'done'});
    });
child2.on ('message' , function(m){
    console.log('pr2 The answer is: ', m.answer);
    child2.send({cmd: 'done'});
    });

/*
child3.on ('message' , function(m){
    console.log('pr3 The answer is: ', m.answer);
    child3.send({cmd: 'done'});
    });


child4.on ('message' , function(m){
    console.log('pr4 The answer is: ', m.answer);
    child4.send({cmd: 'done'});
  });
*/
var StartChild = function(command,id,cookie){
    console.log('SOCKET : ' + parameters.filtersList.length.toString());
    var comm = {cmd: command, ID: id.toString(), COOK:cookie.toString()};
    switch(whichChild){
        case 1 : child1.send(comm); ++whichChild; break;
        //case 2 : child2.send(comm); ++whichChild; break;
        //case 3 : child3.send(comm); ++whichChild; break;
       case 2 : child2.send(comm); whichChild=1; break;
        default : break;
    }

};


server.on('error', function (err) {
    console.log('server error:\n ' + err.stack);
    server.close();
});


server.on('message', function (msg, rinfo) {
    var mess = msg.toString();
    var data = mess.split('#');
     console.log(mess);
    if (data.length > 0) {
        switch(data[0]){
            case 'GETID':
                var id = data[1];
                var cook = data[2];
                /*getHTTP(id,cook,function(result){
            				console.log(result.toString());
            				//process.send({answer: result});

            		});*/
                StartChild('GETID',id,cook);
                break;

            case 'SHUTDOWN':  execute('shutdown -r now', function(callback){
                                console.log(callback);}); break;
        }
    }
});

server.on('listening', function () {
    var address = server.address();
    console.log('server listening ' + address.address + ':' + address.port);
});

var startUDP = function (udpPort) {
  console.log('startudp');
    server.bind({
        address: '0.0.0.0',
        port: udpPort,
    });
};



var processFilters = function() {
    console.log('Load "filters.xml" abgeschlossen ' + parameters.filtersList.length.toString());

};


startUDP(parameters.PORT_LISTENER);

/*getHTTP('628718519','JSESSIONID=517EF4A513834109B5E939DA07DEF468-mc5.koeb47-14_i01_1001',function(result){
    //console.log(result.toString());
    console.log(result);
});
*/

/*for (var i = 0, len = parameters.IPS_ALISALAMI.length; i < len; i++) {
    console.log(parameters.IPS_ALISALAMI[i]);//socket.sendData(mess,arr[i], parameters.PORT_VERTEILER);
  }*/
loadFil.getFilters(parameters.filterPath, processFilters);
