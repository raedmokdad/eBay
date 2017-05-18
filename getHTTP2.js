var https = require('https');



var options = {
  host: 'www.ebay-kleinanzeigen.de',
  port: 443,
  path: '/s-druckansicht.html?adId=629497966',
  method: 'GET',
  headers: {
    accept: 'text/html',
    userAgent : 'node.js'
  }
};



var x = 0;

setInterval(function(){
		x++;
		console.log('Request Nr.: '+ x);
		console.time(x);

  https.get(options, (res) => {
  console.log('statusCode:', res.statusCode);
  //console.log('headers:', res.headers);

  res.on('data', (d) => {
  //  process.stdout.write(d);
    console.timeEnd(x);
  });

}).on('error', (e) => {
  console.error('ERR : ' + e);
});

},1500);
