var filterstr = require('./FilterStruct');
var parameters = require('./Parameters');
var fs = require('fs');
var parseString = require('xml2js').parseString;


function JSONtoFilters(result) {
    var items = result['filterList']['Details'];

    items.forEach(function(item) {
        parameters.filtersList.push({
            make: item.Marke,
            model: item.Modell.toString().toUpperCase(),
            priceLimit: Number(item.Preisbis),
            ConstructionYearFrom: Number(item.Ezvon),
            fuel: item.Fuel.toString().toUpperCase(),
            gearBox: item.Getriebe.toString().toUpperCase(),
            form: item.Aufbau.toString().toUpperCase()
        });
    });

   // variablen.filters.forEach(function(item) {
   //     console.log('-' + item.make + ':' + item.model + ':' + item.priceLimit);
   // });
}

var getFilters = function(path, callback) {
    console.log('Load "filters.xml" gestartet');
    fs.readFile(path, function(err, content) {
        if (!err) {
            parseString(content.toString(), function(err, result) {
                if (!err) {
                   // var items = result['filterList']['Details'];
                    JSONtoFilters(result);
                    /*items.forEach(function(item) {
                       var afilter = new filterstr(item['Marke'], item['Modell'],
                            Number(item['Preisbis']), Number(item['Ezvon']),
                            item['Fuel'], item['Getriebe'], item['Aufbau']);
                        variablen.filters.push(item);
                        
                        variablen.filters.push(afilter);
                        //JSONtoFilters(item);
                    });*/
                    callback();
                }
            });
        }

    })

}


function filterMercedes(amodell, afilModell){
     var modell = amodell.toString();
    var filModell = afilModell.toString();

    if ((filModell == "ALLE") || (filModell == "ANDERE") || (filModell == ""))
        return true;
    else if ((modell == filModell) || modell.includes(filModell))
        return true;
    else if (filModell.includes("A-KLASSE (ALLE)") && (modell.indexOf("A") == 0))
        return true;
    else if (filModell.includes("B-KLASSE (ALLE)") && (modell.indexOf("B") == 0))
        return true;
    else if (filModell.includes("C-KLASSE (ALLE)") && (modell.indexOf("C") == 0))
        return true;
    else if (filModell.includes("CE-KLASSE (ALLE)") && (modell.indexOf("CE") == 0))
        return true;
    else if (filModell.includes("CL-KLASSE (ALLE)") && (modell.indexOf("CL") == 0))
        return true;
    else if (filModell.includes("CLC-KLASSE (ALLE)") && (modell.indexOf("CLC") == 0))
        return true;
    else if (filModell.includes("CLK-KLASSE (ALLE)") && (modell.indexOf("CLK") == 0))
        return true;
    else if (filModell.includes("CLS-KLASSE (ALLE)") && (modell.indexOf("CLS") == 0))
        return true;
    else if (filModell.includes("E-KLASSE (ALLE)") && (modell.indexOf("E") == 0))
        return true;
    else if (filModell.includes("G-KLASSE (ALLE)") && (modell.indexOf("G") == 0))
        return true;
    else if (filModell.includes("GL-KLASSE (ALLE)") && (modell.indexOf("GL") == 0))
        return true;
    else if (filModell.includes("GLK-KLASSE (ALLE)") && (modell.indexOf("GLK") == 0))
        return true;
    else if (filModell.includes("ML-KLASSE (ALLE)") && (modell.indexOf("ML") == 0))
        return true;

    else if (filModell.includes("R-KLASSE (ALLE)") && (modell.indexOf("R") == 0))
        return true;
    else if (filModell.includes("S-KLASSE (ALLE)") && (modell.indexOf("S") == 0))
        return true;
    else if (filModell.includes("SLK-KLASSE (ALLE)") && (modell.indexOf("SLK") == 0))
        return true;
    else if (filModell.includes("SL-KLASSE (ALLE)") && (modell.indexOf("SL") == 0))
        return true;
    else if (filModell.includes("V-KLASSE (ALLE)") && (modell.indexOf("V") == 0))
        return true;

    return false;
}

function filterBMW(amodell,afilModell){
    var modell = amodell.toString();
    var filModell = afilModell.toString();
    if ((filModell == "ALLE") || (filModell == "ANDERE") || (filModell == ""))
        return true;
    else if ((modell == filModell) || modell.includes(filModell))
        return true;
    else if (filModell.includes("1ER (ALLE)") && (modell.indexOf("1") == 0))
        return true;
    else if (filModell.includes("3ER (ALLE)") && (modell.indexOf("3") == 0))
         return true;
    else if (filModell.includes("5ER (ALLE)") && (modell.indexOf("5") == 0))
        return true;
     else if (filModell.includes("6ER (ALLE)") && (modell.indexOf("6") == 0))
        return true;
    else if (filModell.includes("7ER (ALLE)") && (modell.indexOf("7") == 0))
        return true;
     else if (filModell.includes("8ER (ALLE)") && (modell.indexOf("8") == 0))
        return true;
    else if (filModell.includes("M-REIHE (ALLE)") && (modell.indexOf("M") == 0))
        return true;
     else if (filModell.includes("X-REIHE (ALLE)") && (modell.indexOf("X") == 0))
        return true;
    else if (filModell.includes("Z-REIHE (ALLE)") && (modell.indexOf("Z") == 0))
        return true;
    return false;
}


function filterLexus(amodell,afilModell){
    var modell = amodell.toString();
    var filModell = afilModell.toString();
    if ((filModell == "ALLE") || (filModell == "ANDERE") || (filModell == ""))
        return true;
    else if ((modell == filModell) || modell.includes(filModell))
        return true;
    else if (filModell.includes("GS-SERIE (ALLE)") && (modell.indexOf("GS") == 0))
        return true;
    else if (filModell.includes("IS-SERIE (ALLE)") && (modell.indexOf("IS") == 0))
        return true;
    else if (filModell.includes("LS-SERIE (ALLE)") && (modell.indexOf("LS") == 0))
        return true;
    else if (filModell.includes("LX-SERIE (ALLE)") && (modell.indexOf("LX") == 0))
        return true;
    else if (filModell.includes("SC-SERIE (ALLE)") && (modell.indexOf("SC") == 0))
        return true;
    return false;
}

function filterAudi(amodell,afilModell){
    var modell = amodell.toString();
    var filModell = afilModell.toString();
    if ((filModell == "ALLE") || (filModell == "ANDERE") || (filModell == ""))
        return true;
    else if ((modell == filModell) || modell.includes(filModell))
        return true;
    else if (filModell.includes("TT (ALLE)") && (modell.indexOf("TT") == 0))
        return true;          
    return false;
}

function filterFord(amodell,afilModell){
    var modell = amodell.toString();
    var filModell = afilModell.toString();
    if ((filModell == "ALLE") || (filModell == "ANDERE") || (filModell == ""))
        return true;
    else if ((modell == filModell) || modell.includes(filModell))
        return true;
    else if (filModell.includes("TRANSIT (ALLE)") && (modell.indexOf("TRANSIT") != -1))
        return true;
    return false;
}


function filterVW(amodell,afilModell){
    var modell = amodell.toString();
    var filModell = afilModell.toString();
    if ((filModell == "ALLE") || (filModell == "ANDERE") || (filModell == ""))
        return true;
    else if ((modell == filModell) || modell.includes(filModell))
        return true;
    else if (filModell.includes("GOLF (ALLE)") && (modell.indexOf("GOLF") != -1))                
        return true;
    else if (filModell.includes("PASSAT (ALLE)") && (modell.indexOf("PASSAT") != -1))
        return true;
    else if (filModell.includes("POLO (ALLE)") && (modell.indexOf("POLO") != -1)) 
        return true;
    else if (filModell.includes("T3 (ALLE)") && (modell.indexOf("T3") != -1)) 
        return true;
    else if (filModell.includes("T4 (ALLE)") && (modell.indexOf("T4") != -1))
        return true;
    else if (filModell.includes("T5 (ALLE)") && (modell.indexOf("T5") != -1))
        return true;
    else if (filModell.includes("TOURAN (ALLE)") && (modell.indexOf("TOURAN") != -1))
        return true;     
    return false;
}


function filterMINI(amodell,afilModell){
    var modell = amodell.toString();
    var filModell = afilModell.toString();

    if ((filModell == "ALLE") || (filModell == "ANDERE") || (filModell == ""))
        return true;
    else if ((modell == filModell) || modell.includes(filModell))
        return true;
    else if (filModell.includes("CABRIO (ALLE)") && (modell.indexOf("CABRIO") != -1))
        return true;
    else if (filModell.includes("CLUBMAN (ALLE)") && (modell.indexOf("CLUBMAN") != -1))
        return true;
    else if (filModell.includes("COUNTRYMAN (ALLE)") && (modell.indexOf("COUNTRYMAN") != -1))
        return true;
    else if (filModell.includes("COUPE (ALLE)") && (modell.indexOf("COUPE") != -1))
        return true;
    else if (filModell.includes("JOHN COOPER WORKS (ALLE)") && (modell.indexOf("JOHN COOPER WORKS") != -1))
        return true;
    else if (filModell.includes("MINI (ALLE)") && (modell.indexOf("MINI") != -1))
        return true;
    else if (filModell.includes("PACEMAN (ALLE)") && (modell.indexOf("PACEMAN") != -1))
        return true;
    else if (filModell.includes("ROADSTER (ALLE)") && (modell.indexOf("ROADSTER") != -1))
        return true;
    return false;
}


function filter(aCar, aFilter) {
   var result = true;
   
    var model = aCar.Modell.toString().toUpperCase();
    var marke = aCar.Marke.toString();
    var fuel = aCar.fuel.toString().toUpperCase();
    var aufbau = aCar.aufbau.toString().toUpperCase();
    var getriebe = aCar.getriebe.toString().toUpperCase();

    console.log('FILER: ' + marke +':' +aFilter.make + ' ' + model+':'+aFilter.model+ ' '+
        fuel+':'+aFilter.fuel+ ' '+aufbau+':'+aFilter.form+ ' '+getriebe+':'+aFilter.gearBox+'.');

    if (aFilter.make == "ALLE" || aFilter.make == "")
        result = true;
   else if (marke == aFilter.make)
    {
        if (marke == "MERCEDES-BENZ")
             result = filterMercedes(model, aFilter.model);
        else if (marke == "BMW")
                result = filterBMW(model, aFilter.model);
       else if (marke == "LEXUS")
                 result = filterLexus(modell, aFilter.modell);
        else if (marke == "AUDI")
                result = filterAudi(modell, aFilter.modell);
        else if (marke == "FORD")
                 result = filterFord(modell, aFilter.modell);
        else if (marke == "MINI")
                 result = filterMINI(modell, aFilter.modell);
        else if (marke == "VW")
                result = filterVW(modell, aFilter.modell);
        else
        if ((model == "") || (model == "ANDERE")) return false;
        else if (aFilter.model == "ALLE" || aFilter.model == "ANDERE" || aFilter.model == "")
                result = true;
        else if ( (model == aFilter.model) || (model.includes(aFilter.model)) ){
                result = true;
            }
        else
                return   false;
    }
    else return false;
    
   /* if (result == false)
     {
        if (Description.includes(aCar.modell.ToUpper()))
            result = true;
        else return false;
    }*/

  /* if (!result) return false;
    
    if ((aFilter.fuel == "ALLE") || (fuel == aFilter.fuel) || (aFilter.fuel == "ANDERE") || (aFilter.fuel == ""))
        result = true;
    else return false;

    
    if ((aFilter.form == "ALLE") || (aufbau == aFilter.form) || (aFilter.form == "ANDERE") || (aFilter.form == ""))
         result = true;
    else return false;

    
    if ((aFilter.gearBox == "ALLE") || (getriebe == aFilter.gearBox) || (aFilter.gearBox == "ANDERE") || (aFilter.gearBox == ""))
        result = true;
    else return false;*/

  /*  var price = 0;
    var baujahr = 0;
    try
    {
        price = Convert.ToInt32(aCar.preis);
    }
    catch (err) { price = 0;}

    if (aFilter.preisBis >= price)
    {
        result = true;

    }
    else return false;

    try
    {
        baujahr = Convert.ToInt16(aCar.ez);
    }
    catch (err) { baujahr = 2020; }

    if (aFilter.ezVon <= baujahr)
    {
        result = true;
    }
    else return false;*/
    return result;
}

var filterCar = function(aCar) {
    console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF ' + parameters.filtersList.length.toString());
    var result = parameters.filtersList.some(function(item,index,array) {
         if (index>0){
            if (filter(aCar, item)){
                console.log('JA');
                return    true;        
            }
            return false;
        }
    });
    console.log('AUS: ' + result);
    return result;
}

//getFilters(filterPath);

module.exports.getFilters = getFilters;
module.exports.filterCar = filterCar;
