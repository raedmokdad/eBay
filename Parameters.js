var PORT_VERTEILER = 5552; // Phonerverteiler
var PORT_LISTENER = 6789;
var PORT_SENDER = 4544;
var IPS_ANLAGE ;

var IPS_DENNIS =  "146.0.43.18";
var IPS_SENDER = "37.157.249.174";
var IPS_PHONERVERT = "85.190.0.200";
var IPS_ALISALAMI = ["213.202.212.182","213.202.252.30","213.202.212.2",
"89.163.255.68","89.163.255.76","213.202.212.158","89.163.209.147",
"89.163.209.213","89.163.255.64","213.202.212.76","213.202.212.209",
"89.163.132.251","89.163.132.33","89.163.209.186","213.202.247.98",
"213.202.247.101","213.202.247.103",
"213.202.247.106","213.202.247.107","213.202.247.116","213.202.247.118",
"213.202.247.135","213.202.247.156","213.202.247.157","213.202.247.158",
"213.202.247.159","213.202.247.160","89.163.132.164","89.163.132.206",
"89.163.132.254","89.163.209.90","89.163.209.149","89.163.209.150",
"89.163.209.153","213.202.212.251","89.163.209.241","89.163.227.36",
"89.163.132.174","213.202.212.154","89.163.255.78"];


var WS_HOST = 'ws://85.190.0.200:9090';

var testData = ['623638646','623638644','623638638','623638609','623638546','623638527','623637149','623638448','623638448'];
var url = 'https://www.ebay-kleinanzeigen.de/s-druckansicht.html?adId='


var filterPath = './filters.xml';
var filtersAsText = '';
var filtersList = [];

var preisLimit = 50;
var TelLengthLimit = 8;


exports.PORT_VERTEILER = PORT_VERTEILER;
exports.PORT_LISTENER = PORT_LISTENER;
exports.PORT_SENDER = PORT_SENDER;

exports.IPS_DENNIS = IPS_DENNIS;
exports.IPS_ALISALAMI = IPS_ALISALAMI;
exports.IPS_SENDER = IPS_SENDER;

exports.IPS_PHONERVERT = IPS_PHONERVERT;
exports.IPS_ANLAGE = IPS_ANLAGE;

exports.WS_HOST = WS_HOST;
exports.filterPath = filterPath;
exports.filtersList = filtersList;

exports.filtersAsText = filtersAsText;
exports.testData = testData;
exports.url = url;
exports.preisLimit = preisLimit;
exports.TelLengthLimit = TelLengthLimit;
