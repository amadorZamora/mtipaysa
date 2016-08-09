var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var wspaysaCtrl = require("./controllers/wspaysaCtrl.js");
var app  = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

function WSPAYSA(){
    var self = this;
    self.connectMysql();
};

WSPAYSA.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        //host     : 'us-cdbr-iron-east-04.cleardb.net',
        //user     : 'b261b8c5cca238',
        //password : '3a3d600f',
        //database : 'heroku_a9c433b2475ef33',
		
		
		host     : 'gx97kbnhgjzh3efb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com	',
        user     : 'g2llgdab0ia3l5in',
        password : 'ksepru6m1zp96qk2',
        database : 'ap1zdxjlrsdqeib5',
		
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

WSPAYSA.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use('/', router);
      var rest_router = new wspaysaCtrl(router,connection,md5);
      self.startServer();
}

WSPAYSA.prototype.startServer = function() {
     	var server = app.listen(process.env.PORT || 8080,function(){
    	  var port = server.address().port;
    	  console.log("WEB SERVICE FUNCIONANDO EN EL PUERTO " + port);
      });
}

WSPAYSA.prototype.stop = function(err) {
    console.log("PROBLEMA CON MYSQL n" + err);
    process.exit(1);
}

new WSPAYSA();
