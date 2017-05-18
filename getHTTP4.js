var dns = require('dns'),
    dnscache = require('dnscache')({
        "enable" : true,
        "ttl" : 300,
        "cachesize" : 1000
    });

    //to use the cached dns either of dnscache or dns can be called.
    //all the methods of dns are wrapped, this one just shows lookup on an example

    //will call the wrapped dns


var x = 0;

setInterval(function(){
		x++;
		console.log('Request Nr.: '+ x);
		console.time(x);

    dnscache.lookup('https://www.ebay-kleinanzeigen.de/s-druckansicht.html?adId=629497966', function(err, result) {
        //do something with result
        console.timeEnd(x);
        console.log(result.toString());
    });


},1500);
