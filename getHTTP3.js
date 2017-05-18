var fetch = require('node-fetch');


dnscache = require('dnscache')({
			 "enable" : true,
			 "ttl" : 300,
			 "cachesize" : 1000
	 });

var x = 0;
var ip = '';
dnscache.lookup('www.ebay-kleinanzeigen.de', (err,address,family) => {
	ip = address;
	console.log(ip);
});

setInterval(function(){
		x++;
		console.log('Request Nr.: '+ x);
		console.time(x);

fetch('https://'+'www.ebay-kleinanzeigen.de'+'/s-druckansicht.html?adId=629497966')
    .then(function(res) {

        return res.text();
    }).then(function(body) {
        console.timeEnd(x); //console.log(body);
    });
    },1500);
