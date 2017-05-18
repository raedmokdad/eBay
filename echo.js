/*
 * IP*Works! 2016 Node.js Edition - Demo Application
 *
 * Copyright (c) 2017 /n software inc. - All rights reserved. - www.nsoftware.com
 *
 */

var readline = require("readline");
var ipworks = require("ipworks");

if(!ipworks) {
  console.error("Cannot find ipworks.");
  return 1;
}
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var argv = process.argv;
if(argv.length != 4) {
	console.log("Usage: node echoclient.js server port");
	console.log("");
	console.log("  server  the address of the remote host.");
	console.log("  port	   the TCP port in the remote host");
	console.log("Example: node echoclient.js localhost 777");
	return;
}

var ipport = new ipworks.ipport();

function clientprompt(){
  process.stdout.write('> ');
}


ipport.on('SSLServerAuthentication', function(e){
	e.accept=true;
});

ipport.on('DataIn', function(e){
	console.log('Received: ' + e.text.toString());
	clientprompt();
});

ipport.on('Disconnected', function(e){
	console.log('Disconnected: ' + e.description);
	process.exit();
});

ipport.connect(argv[2],argv[3],function(err){
	if(err) {
		console.log(err);
		return;
	}
	console.log('Connecting to ' + ipport.getRemoteHost());
	console.log('Connected.\r\nEnter data to send. Send \'quit\' to quit.');
	clientprompt();
})

ipport.doEvents(function(err){
	if(err) {
		console.log(err);
		return;
	}
})

rl.on('line', function(line) {
  if(line.toLowerCase() == 'quit')
  {
    console.log('Quitting');
    process.exit();
  }
  else
  {
    var buf = new Buffer(line);
	ipport.send(buf.toString() + "\r\n",function(err){
      if(err) {
        console.log(err);
        return;
      }
      clientprompt();
    });
  }
});

function prompt(promptName, label, punctuation, defaultVal)
{
  lastPrompt = promptName
  lastDefault = defaultVal
  process.stdout.write(label + ' [' + defaultVal + '] ' + punctuation + ' ');
}
