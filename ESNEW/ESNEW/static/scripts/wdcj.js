(function () {
    var myConnector = tableau.makeConnector();
	 // myConnector.init = function(initCallback) {
      //tableau.authType = tableau.authTypeEnum.basic;  
       // tableau.username = "ajaveed";
	  //tableau.password = "ajaveed";
	//	initCallback();   
	  
  //}
myConnector.getSchema = function (schemaCallback) {
    var cols = [
        { id : "alertid", alias : "alertid", dataType : tableau.dataTypeEnum.int },
		{ id : "event_heading", alias : "event_heading", dataType : tableau.dataTypeEnum.string },
		{ id : "timestamp", alias : "timestamp", dataType : tableau.dataTypeEnum.string },
		{ id : "event_heading", alias : "event_heading", dataType : tableau.dataTypeEnum.string },
		{ id : "reporting_host", alias : "reporting_host", dataType : tableau.dataTypeEnum.string },
		{ id : "dst_ip", alias : "dst_ip", dataType : tableau.dataTypeEnum.string },
		{ id : "reporting_source", alias : "reporting_source", dataType : tableau.dataTypeEnum.string },
		{ id : "rule_id", alias : "rule_id", dataType : tableau.dataTypeEnum.string },
		{ id : "level", alias : "level", dataType : tableau.dataTypeEnum.string },
		{ id : "event_information", alias : "event_information", dataType : tableau.dataTypeEnum.string },
		{ id : "ident", alias : "ident", dataType : tableau.dataTypeEnum.string },
		{ id : "auth", alias : "auth", dataType : tableau.dataTypeEnum.string },
		{ id : "verb", alias : "verb", dataType : tableau.dataTypeEnum.string },
		{ id : "request", alias : "request", dataType : tableau.dataTypeEnum.string },
		{ id : "httpversion", alias : "httpversion", dataType : tableau.dataTypeEnum.string },
		{ id : "response", alias : "response", dataType : tableau.dataTypeEnum.string },
		{ id : "link", alias : "link", dataType : tableau.dataTypeEnum.string },
		{ id : "countrycode2", alias : "countrycode2", dataType : tableau.dataTypeEnum.string },
		{ id : "countrycode3", alias : "countrycode3", dataType : tableau.dataTypeEnum.string },
		{ id : "countryname", alias : "countryname", dataType : tableau.dataTypeEnum.string },
		{ id : "continentcode", alias : "continentcode", dataType : tableau.dataTypeEnum.string },
		{ id : "regionname", alias : "regionname", dataType : tableau.dataTypeEnum.string },
		{ id : "cityname", alias : "cityname", dataType : tableau.dataTypeEnum.string },
		{ id : "latitude", alias : "latitude", dataType : tableau.dataTypeEnum.string },
		{ id : "longitude", alias : "longitude", dataType : tableau.dataTypeEnum.string },
		{ id : "dmacode", alias : "dmacode", dataType : tableau.dataTypeEnum.string },
		{ id : "areacode", alias : "areacode", dataType : tableau.dataTypeEnum.string },
		{ id : "timezone", alias : "timezone", dataType : tableau.dataTypeEnum.string },
		{ id : "realregion_name", alias : "realregion_name", dataType : tableau.dataTypeEnum.string },
		{ id : "geoipip", alias : "geoipip", dataType : tableau.dataTypeEnum.string },
		{ id : "srcip1", alias : "srcip1", dataType : tableau.dataTypeEnum.string },
		{ id : "srcip2", alias : "srcip2", dataType : tableau.dataTypeEnum.string },
    ];

    var tableInfo = {
        id : "wonder",
        alias : "wonder",
        columns: cols,
        incrementColumnId: "alertid"
    };

    schemaCallback([tableInfo]);
};



    myConnector.getData = function(table, doneCallback) {
    var lastId = parseInt(table.incrementValue || -1);
    $.getJSON("http://localhost:5558/contact", function(resp) {
//		var feat = resp['hits']['hits'].map(function(i){return i['_source'];}),
		var feat = resp.mydata,
            tableData = [];
			//var el1 = {name:'ronaldo', team: 'europe/spain/realmadrid'}
//var el2 = {name:'messi', team: 'europe/spain/barcelona'}
//var el3 = {name:'gerald', team: 'europe/england/liverpool'}
//var el4 = {name:'unknown english', team: 'europe/england'}

//data = [el1,el2,el3,el4]
        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {				
//				if (typeof feat[i].geoip === undefined){
//							feat[i].geoip = []
//							}
//				if (typeof feat[i].geoip.ip === undefined){
//							feat[i].geoip.ip = "123"
//							}
							
			tableData.push({
							"alertid": feat[i].alertid,
							"event_heading": feat[i].event_heading,
							"timestamp": feat[i].timestamp,
							"event_heading": feat[i].event_heading,
							"reporting_host": feat[i].reporting_host,
							"dst_ip": feat[i].dst_ip,
							"reporting_source": feat[i].reporting_source,
							"rule_id": feat[i].rule_id,
							"level": feat[i].level,
							"event_information": feat[i].event_information,
							"ident": feat[i].ident,
							"auth": feat[i].auth,
							"verb": feat[i].verb,
							"request": feat[i].request,
							"httpversion": feat[i].httpversion,
							"response": feat[i].response,
							"link": feat[i].link,
							"countrycode2": feat[i].countrycode2,
							"countrycode3": feat[i].countrycode3,
							"countryname": feat[i].countryname,
							"continentcode": feat[i].continentcode,
							"regionname": feat[i].regionname,
							"cityname": feat[i].cityname,
							"latitude": feat[i].latitude,
							"longitude": feat[i].longitude,
							"dmacode": feat[i].dmacode,
							"areacode": feat[i].areacode,
							"timezone": feat[i].timezone,
							"realregionname": feat[i].realregionname,
							"geoipip": feat[i].geoipip,
							"srcip1": feat[i].srcip1,
							"srcip2": feat[i].srcip2
							
            });
		   
        }

        table.appendRows(tableData);
        doneCallback();
    });
};


    tableau.registerConnector(myConnector);
	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Wonder";
        tableau.submit();
    });
});
})
();