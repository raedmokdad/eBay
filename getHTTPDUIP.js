var request = require('request');
var cheerio = require('cheerio');
var https = require('https');
var parameters  = require('./Parameters.js');
var carLibrary = require('./carlibrary.js').carLibrary;
var filterCar = require('./filterMethoden').filterCar;
var socket = require('./socket');
var now = require("performance-now");



process.on('message' , function(m){


	if(m.cmd === 'GETID'){

		//var url = parameters.url.toString() + m.ID;
		var cookies = m.COOK;
		console.log('newID : '+ m.ID+ ' ' + cookies);
		getHTTP(m.ID,cookies,function(result){
				//console.log(result.toString());
				process.send({answer: result});

		});

	}
});

 var getHTTP = function(id,cookies,callback) {

 	process.nextTick( function(){

 	var aUrl  = parameters.url.toString() + id;//url.toString();
 	var aCook = cookies.toString();
 	var options = {
    	method: 'GET',
    	url: aUrl,
			headers: {
			 accept: 'text/html',
			 userAgent : 'node.js',
			 'Cookie': cookies
		 }
		};
var start = now();
 	request(options, function(err, response, body) {
		var end = now();

		console.log('----- REQUEST TIME : ' + (end -start ).toFixed(3) + ' MILLISECONDS');
    	if (err) return console.log(err);

    	var result = '';

				var body1 = body;
				var start1 = now();
    	if (body.toString().includes('Anzeigennummer:')){

				socket.sendData('FOUNDED#'+id,parameters.IPS_SENDER, parameters.PORT_SENDER);
    		if (body.toString().includes('Erstzulassungsjahr:')){
    				var aCar = carLibrary;

    				if(body.toString().includes('Weitere Informationen bei</a>')){
    					return;//aCar.boerse = 'mobile';
						}
    				else aCar.boerse = 'eBay';

    				aCar.anbieter = 'Privat';
						aCar.farbe = "";
						aCar.image1 = "";
						aCar.image2 = "";
						aCar.image3 = "";
						aCar.unfall = "";
						aCar.klima = "";
						aCar.link = "";
						aCar.tel1 = "";
						aCar.tel2 = "";
						aCar.tueren = "";
						aCar.plz = "";
						aCar.ort = "";
						aCar.km = "";
						aCar.ez = "";
						aCar.aufbau = "";
						aCar.kw = "";
						aCar.fuel = "";
						aCar.getriebe = "";
						aCar.beschreibung  = "";
						aCar.Marke = "";
						aCar.Modell = "";
						aCar.id = id;
						var pos1 = 0;
            // Preis
            try
            {
							  //var start1 = now();
                pos1 = body.indexOf("adprice");
                body = body.slice( pos1 + 16);
								pos1 = body.indexOf("</strong>");
                aCar.preis = body.substring(0,pos1);
								var matches = aCar.preis.match(/\d+\.?\d*/gi);
      					if(matches != null){
      					var ret = matches[0];
      					aCar.preis = parseFloat(ret.replace(".", ""));
							} else return;
            }
        catch (err ) { return; }

				// Ort
				try
					 {
							 pos1 = body.indexOf("Ort:</dt>");
							 body = body.slice(pos1 + 9);
							 pos1 = body.indexOf("</dd>");
							 aCar.ort = body.substring(0, pos1);

							var matches =  aCar.ort.match(/\d{5}/gi);
							if(matches != null){
								aCar.plz = matches[0];
								pos1 = aCar.ort.indexOf(aCar.plz);
								aCar.ort = aCar.ort.slice(pos1 + 5);
								pos1 = aCar.ort.indexOf("</span>");
								aCar.ort ='eBay-DJS '   +aCar.ort.substring(0,pos1).trim();
							}
					 }

					 catch (err) { aCar.ort = ""; aCar.plz = ""; }

					 if (body.includes("Rufnummer des Anbieters:")){
          	try {
            	pos1 = body.indexOf("attributelist--value print") + 28;
              body = body.slice(pos1);
              pos1 = body.indexOf("</dd>");
              aCar.tel1 = body.substring(0,pos1);
							matches =  aCar.tel1.match(/\d{1,25}/gi);
			        aCar.tel1 = "";
							if(matches != null){
								for(var i = 0; i<matches.length; ++i)
									aCar.tel1 += matches[i];
							} else return;
							if (aCar.tel1.substring(0, 3) == "490") {
								aCar.tel1 = '0' + aCar.tel1.toString().replace("490", "");
							} else if (aCar.tel1.substring(0, 2) == "49") {
	              	aCar.tel1 = '0' + aCar.tel1.toString().replace("49", "");
	            }
							else if (aCar.tel1.substring(0, 3) == "+49") {
	              	aCar.tel1 = '0' + aCar.tel1.toString().replace("+49", "");
	            }
	          	if (aCar.tel1.length < parameters.TelLengthLimit) return;

						} catch (err) {   return; }
						}


						//txtArbeiter.AppendText("Tel. !" +aCar.tel1 + " ");
					 // Marke
				pos1 = body.indexOf("Marke:");
				if (pos1 != -1){
					try
					{
						body = body.slice(pos1+5);
						pos1 = body.indexOf("<a href=") + 8;
						body = body.slice(pos1);
						pos1 = body.indexOf("</a>");
						pos2 = body.indexOf(">") + 1;
						aCar.Marke = body.substring(pos2, pos1 ).toUpperCase().trim();
						body = body.slice(pos2 + 3);
						if (aCar.Marke == "WEITERE AUTOS")
							return;
						else if (aCar.Marke == "VOLKSWAGEN")
							aCar.Marke = "VW";
						else if (aCar.Marke == "MERCEDES BENZ")
							aCar.Marke = "MERCEDES-BENZ";
						else if (aCar.Marke == "ANDERE")
							return;
						} catch(err) {   return; }
				} else return;

					 // Modell
			 pos1 = body.indexOf("Modell:");
			 if (pos1 != -1){
				try
				{
						body = body.slice(pos1 + 5);
						pos1 = body.indexOf("<a href=") + 8;
						body = body.slice( pos1);
						pos1 = body.indexOf("</a>");
						pos2 = body.indexOf(">") + 1;
						aCar.Modell = (body.substring(pos2, pos1).trim());
						if ((aCar.Modell == " ") || (aCar.Modell == "") || (aCar.modell == "Andere") ) return;
						body = body.slice(pos2 + 3);
					} catch (err) {   return; }
				}

			pos1 = body.indexOf("Kilometerstand:");
			if (pos1 != -1 ) {
				try {
							body = body.slice(pos1 + 15);
							pos1 = body.indexOf("<span>") + 6;
							pos2 = body.indexOf("</span>");
							aCar.km = body.substring(pos1, pos2).trim();
						} catch (err) {  }
				}

				// Erstzulassungsjahr:
				pos1 = body.indexOf("Erstzulassungsjahr:");
			if (pos1 != -1 ) {
				try {
							body = body.slice(pos1 + 19);

							pos1 = body.indexOf("</span>");
							aCar.ez = body.substring(pos1 -4 , pos1 );
							body = body.slice(pos1 + 6);
						} catch (err) {  }
			}

			// Fahrzeugtyp:
			pos1 = body.indexOf("Fahrzeugtyp:");
		   if (pos1= -1) {
		    try {
		      body = body.slice(pos1 + 12);
		      pos1 = body.indexOf("<a href=") + 8;
		      body = body.slice( pos1);
		      pos1 = body.indexOf("</a>");
		      pos2 = body.indexOf(">") + 1;
		      aCar.aufbau = body.substring(pos2, pos1).trim();
		      switch (aCar.aufbau) {
		          case "Cabrio": aCar.aufbau = "Cabrio/Roadster"; break;
		          case "OffRoad": aCar.aufbau = "Gelaendewagen/Pickup"; break;
		          case "SmallCar": aCar.aufbau = "Kleinwagen"; break;
		          case "EstateCar": aCar.aufbau = "Kombi"; break;
		          case "Limousine": aCar.aufbau = "Limousine"; break;
		          case "SportsCar": aCar.aufbau = "Kleinwagen"; break;
		          case "Van": aCar.aufbau = "Van/Kleinbus"; break;
		          case "OtherCar": aCar.aufbau = "Andere"; break;
		          default: break;
		          }
		     body = body.slice(pos2 + 3);
			 } catch (err) {  }
			}


			//Kraftstoffart:
			pos1 = body.indexOf("Kraftstoffart:");
       if (pos1= -1) {
        try {
            body = body.slice(pos1 + 14);
           pos1 = body.indexOf("<a href=") + 8;
            body = body.slice( pos1);
            pos1 = body.indexOf("</a>");
            pos2 = body.indexOf(">") + 1;
            aCar.fuel = body.substring(pos2, pos1 );
            body = body.slice(pos2 + 3);
        } catch (err) {   }
			}


			pos1 = body.indexOf("Getriebe:");
			 if (pos1 != -1) {
					try {
							 body = body.slice(pos1 + 9);
								pos1 = body.indexOf("<span>") + 6;
								pos2 = body.indexOf("</span>");
								aCar.getriebe = body.substring(pos1, pos2 ).trim();
								switch (aCar.getriebe) {
									case "Manuell": aCar.getriebe = "Schaltgetriebe"; break;
											// case "SEMIAUTOMATIC_GEAR": aCar.getriebe = "Halbautomatik"; break;
									case "Automatik": aCar.getriebe = "Automatik"; break;
											 //default: break;
									}
						} catch (err) {  }
				 	}

					pos1 = body.indexOf("<h2>Beschreibung</h2>");
					if (pos1 != -1) {
						try {
									 body = body.slice(pos1 + 21);
									 pos2 = body.indexOf("</p>");
									 aCar.beschreibung = body.slice(0, pos2 );
									// Regex textreplace = new Regex("<br />");
									 //aCar.beschreibung = regex.replace(aCar.beschreibung, /\t|\n|\r/, "");
									// aCar.beschreibung = (textreplace.Replace(aCar.beschreibung, "")).Trim();
								} catch (err) {  }
					}
					var end1 = now();
					console.log('pasrse  '+ (end1 -start1 ).toFixed(3) + ' MILLISECONDS');


/*
						var start3 = now();
    				var $ = cheerio.load(body1);
    				$('strong.adprice').each(function(i,element){
    					var a = $(this).text().trim();
      					var matches = a.match(/\d+\.?\d*/    //gi);
/*      					if(matches != null){
      					var ret = matches[0];
      					aCar.preis = parseFloat(ret.replace(".", ""));
      					} else aCar.preis = 0;
    				});

						if (aCar.preis < parameters.preisLimit) return;

					$('h2').each(function(i,element){
    					var a = $(this).text().trim();
       					var b  = $(this).next();
   // 					console.log(a + '- ' + b);
      					if(a == 'Beschreibung')
      						aCar.beschreibung = b;
      					else aCar.beschreibung = '';
    				});

    				$('dd.attributelist--value').each(function(i, element){
      				var a = $(this).text().trim();//.prev();
      				var b = $(this).prev().text().trim();
      				switch(b){
      					case 'Marke:' : aCar.Marke = a.toUpperCase(); break;
      					case 'Modell:' : aCar.Modell = a; break;
      					case 'Kilometerstand:' : aCar.km  = a; break;
      					case 'Erstzulassungsjahr:' : aCar.ez = Number(a); break;
      					case 'Fahrzeugtyp:' : aCar.aufbau = a; break;
      					case 'Anzeigennummer:' : aCar.id = a; break;
      					case 'Leistung (PS):' : aCar.kw = a; break;
      					case 'Getriebe:' : aCar.getriebe = a; break;
								case 'Kraftstoffart:' : aCar.fuel = a; break;
      					case 'Rufnummer des Anbieters:' : aCar.tel1 = a; break;
      					case 'Ort:' : 	aCar.plz = a.substring(0,5).trim();
      									aCar.ort =  'eBay-DJS ' + a.substring(6,a.lenght).trim();
      									break;
      				}
    				//result += b+' ' +a+'\n';
    			});

					if (aCar.tel1 != ''){
						//aCar.tel1 = aCar.tel1.toString();
						var regex =  /[0-9]/g;
					  aCar.tel1  = aCar.tel1.match(regex);
						aCar.tel1 = aCar.tel1.toString().replace(/,/g, "");
						//console.log(aCar.tel1);

						if (aCar.tel1.substring(0, 3) == "490") {
							aCar.tel1 = '0' + aCar.tel1.toString().replace("490", "");
						} else if (aCar.tel1.substring(0, 2) == "49") {
              	aCar.tel1 = '0' + aCar.tel1.toString().replace("49", "");
            }
						else if (aCar.tel1.substring(0, 3) == "+49") {
              	aCar.tel1 = '0' + aCar.tel1.toString().replace("+49", "");
            }

          	if (aCar.tel1.length < parameters.TelLengthLimit) return;
						console.log('TEl' + aCar.tel1+"##");
					}

						var end3 = now();
						console.log('pasrse cheerio  '+ (end3 -start3 ).toFixed(3) + ' MILLISECONDS');
*/

						var start2 = now();
    				var  message = "MOBI\r\n" +
    							aCar.id + "\r\n" +
                                aCar.Marke + "\r\n" +
                                aCar.Modell + "\r\n" +
                                aCar.farbe + "\r\n" +
                                aCar.ez + "\r\n" +
                                aCar.preis + "\r\n" +
                                aCar.ort + "\r\n" +
                                aCar.plz + "\r\n" +
                                "" + " " + "" + "\r\n" +
                                aCar.km + "\r\n" +
                                aCar.kw + "\r\n" +
                                aCar.aufbau + "\r\n" +
                                aCar.klima + "\r\n" +
                                aCar.fuel + "\r\n" +
                                aCar.tel1 + "\r\n" +
                                aCar.tel2 + "\r\n" +
                                aCar.getriebe + "\r\n" +
                                aCar.beschreibung + "\r\n" +
                                aCar.tueren + "\r\n" +
                                aCar.unfall + "\r\n" +
                                aCar.image1 + "\r\n" +
                                aCar.image2 + "\r\n" +
                                aCar.image3 + "\r\n" +
                                aCar.link + "\r\n" + "ENDMOB\r\n";
								var mess = message.toString();
								result = mess;


								socket.sendData(mess,parameters.IPS_PHONERVERT, parameters.PORT_VERTEILER);
								socket.sendData(mess,parameters.IPS_DENNIS, parameters.PORT_VERTEILER);

								for (var i = 0, len = parameters.IPS_ALISALAMI.length; i < len; i++) {
										socket.sendData(mess,parameters.IPS_ALISALAMI[i], parameters.PORT_VERTEILER);
									}
									var end2 = now();

									console.log('----- SEND TIME : ' + (end2 -start2 ).toFixed(3) + ' MILLISECONDS');

								//}
    		}  else result = 'Kein Auto';
		} else
		{
			if (body.toString().includes('Error 429')){
				var message = id+'#429';
				socket.sendData(message,parameters.IPS_SENDER, parameters.PORT_SENDER);
				result = message + ' Too Many requests';
			}
			else result = 'noch nicht Da';
		}

    	callback(result);
	});
	},0);

};


exports.getHTTP = getHTTP;
