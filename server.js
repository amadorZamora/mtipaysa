var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var wspaysaCtrl = require("./controllers/wspaysaCtrl.js");
var app  = express();

function WSPAYSA(){
    var self = this;
    self.connectMysql();
};

WSPAYSA.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'us-cdbr-iron-east-04.cleardb.net',
        user     : 'b06c75a29ad310',
        password : '0681cb27',
        database : 'heroku_6734592a49bb139',
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
