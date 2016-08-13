var mysql = require('mysql');
var xml = require('xml');
var js2xmlparser = require("js2xmlparser");
var json2html = require('node-json2html');




function wspaysa_ROUTER(router,connection,md5) {
	var self = this;
	self.handleRoutes(router,connection,md5);
}

wspaysa_ROUTER.prototype.handleRoutes= function(router,connection,md5) {

//	Mensaje de funcionamiento
	/*	router.get("/",function(req,res){
        res.json({"Message" : "Prueba de WebService wsPaysa MTI 2015!"});
    });
	 */

	/*****************************************ESTABLECIMIENTOS****************************************/	
	/*************************************************************************************************/

//	********OK
//	GET All establecimiento 
	router.get("/establecimientos",function(req,res){
		var  data = {};
		var query = "SELECT * FROM ??";
		var table = ["establecimiento"];
		query = mysql.format(query,table);

		connection.query(query,function(err,rows){
			if(rows.length != 0){
				res.format({
					json: function(){
						data["establecimientos"] = rows;
						res.header("Content-Type", "application/json; charset=utf-8");
						res.status(200).json(data);
					},
					html: function(){
						data["establecimientos"] = rows;
						res.header("Content-Type", "text/html; charset=utf-8");
						var transform = [{
							"tag": "div",
							"class": "id_establecimiento",
							"html": "${id_establecimiento}"
						}, {
							"tag": "div",
							"class": "direccion",
							"html": "${direccion}"
						}, {
							"tag": "div",
							"class": "ciudad",
							"html": "${ciudad}"
						}, {
							"tag": "div",
							"class": "pais",
							"html": "${pais}"
						}, {
							"tag": "div",
							"class": "telefono",
							"html": "${telefono}"
						}];
						var header = '<head></head>';
						var body = '<div id="establecimientos">'; 
						for(var i=0;i<rows.length;i++){
							body=body + '<div id="establecimiento">';
							body=body + json2html.transform(data['establecimientos'][i],transform);
							body=body + '</div>';
						}

						var body = body + '</div>';
						var out = '<!DOCTYPE html><html>' + header + '<body>' + body + '</body></html>';

						res.status(200).send(out);
					},
					xml: function(){
						data["establecimiento"] = rows;
						res.header("Content-Type", "application/xml; charset=utf-8");
						var body='';
						body=body + js2xmlparser("establecimientos",data);
						body=body +'';

						res.status(200).send(body);
					},

				default: function() {
					res.status(406).send('Not Acceptable');
				}
				})
			}else{
				res.format({
					json: function(){
						data["establecimientos"] = '';
						res.header("Content-Type", "application/json; charset=utf-8");
						res.status(200).json(data);
					},

					html: function(){
						data["establecimiento"] = rows;
						res.header("Content-Type", "text/html; charset=utf-8");
						var header = '<head></head>';
						var body = '<div id="establecimientos"></div>';
						var out = '<!DOCTYPE html><html>' + header + '<body>' + body + '</body></html>';
						res.status(200).send(out);
					},
					xml: function(){
						data["establecimientos"] = rows;
						res.header("Content-Type", "application/xml; charset=utf-8");
						res.status(200).send(js2xmlparser("establecimientos",data));
					},
				default: function() {
					res.status(406).send('Not Acceptable');
				}
				})
			}
		});
	});

//	***OK
//	GET establecimiento by Id
	router.get("/establecimientos/:id_establecimiento",function(req,res){
		var data = {};
		var query = "SELECT * FROM ?? WHERE ??=?";
		var table = ["establecimiento","id_establecimiento",req.params.id_establecimiento];
		query = mysql.format(query,table);

		connection.query(query,function(err,rows){
			if(rows.length != 0){
				data["establecimiento"] = rows;
				res.format({
					json: function(){
						res.header("Content-Type", "application/json; charset=utf-8");
						res.status(200).json(data["establecimiento"][0]);
					},
					xml: function(){
						res.header("Content-Type", "application/xml; charset=utf-8");
						res.status(200).send(js2xmlparser("establecimiento",data["establecimiento"][0]));
					},
					html: function(){
						res.header("Content-Type", "text/html; charset=utf-8");
						var transform = [{
							"tag": "div",
							"class": "id_establecimiento",
							"html": "${id_establecimiento}"
						}, {
							"tag": "div",
							"class": "direccion",
							"html": "${direccion}"
						}, {
							"tag": "div",
							"class": "ciudad",
							"html": "${ciudad}"
						}, {
							"tag": "div",
							"class": "pais",
							"html": "${pais}"
						}, {
							"tag": "div",
							"class": "telefono",
							"html": "${telefono}"
						}];
						var header = '<head></head>';
						var body = '<div id="establecimiento">' + json2html.transform(data["establecimiento"][0],transform) + '</div>';
						var out = '<!DOCTYPE html><html><head>' + header + '</head><body>' + body + '</body></html>';
						res.status(200).send(out);
					}
				});
			}else{
				//data["establecimiento"] = '';
				res.format({
					json: function(){
						res.header("Content-Type", "application/json; charset=utf-8");
						res.status(200).json(data);
					},
					html: function(){
						res.header("Content-Type", "text/html; charset=utf-8");
						var header = '<head></head>';
						var body = '';
						var out = '<!DOCTYPE html><html>' + header + '<body>' + body + '</body></html>';
						res.status(200).send(out);
					},
					xml: function(){
						res.header("Content-Type", "application/xml; charset=utf-8");
						res.status(200).send(js2xmlparser("establecimiento",data));
					},
				default: function() {
					res.status(406).send('Not Acceptable');
				}
				});
			}//fin else

		});
	});

//	PUT establecimiento by Id
	router.put("/establecimientos/:id_establecimiento",function(req,res){

		var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
		var table = ["establecimiento","direccion",req.body.direccion,"ciudad",req.body.ciudad,"pais",req.body.pais,"telefono",req.body.telefono,"id_establecimiento",req.body.id_establecimiento];

		query = mysql.format(query,table);
		connection.query(query,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query. Err: " + err});
			} else {
				res.status(201).json({"Error" : false, "Message" : "Actualizacion establecimiento por Id "+req.body.id_establecimiento});
			}
		});
	});


//	POST establecimiento
	router.post("/establecimientos",function(req,res){
		var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";

		var table = ["establecimiento","direccion","ciudad","pais","telefono",req.body.direccion,req.body.ciudad,req.body.pais,req.body.telefono];
		query = mysql.format(query,table);
		connection.query(query,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error ejecutando MySQL query. Err: "+ err});
			} else {
				//res.status(200).json({"Error" : false, "Message" : "Establecimiento Agregado !"});
				res.status(204).end();
			}
		});
	});

//	DELETE establecimiento by Id
	router.delete("/establecimientos/:id_establecimiento",function(req,res){
		var query = "DELETE FROM ?? WHERE ?? = ?";
		var table = ["establecimiento","id_establecimiento",req.params.id_establecimiento];
		query = mysql.format(query,table);
		connection.query(query,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error ejecutando MySQL query. Err: "+ err});
			} else {
				//res.status(200).json({"Error" : false, "Message" : "Establecimiento eliminado por Id "+req.params.id_establecimiento});
				res.status(204).end();
			}
		});
	});


	/*****************************************PRODUCTOS****************************************/	
	/*************************************************************************************************/	 

//	**OK
//	GET All producto
	router.get("/productos",function(req,res){
		var data={};
		var query = "SELECT * FROM ??";
		var table = ["producto"];
		query = mysql.format(query,table);


		connection.query(query,function(err,rows){
			if(rows.length != 0){
				res.format({
					json: function(){
						data["productos"] = rows;
						res.header("Content-Type", "application/json; charset=utf-8");
						res.status(200).json(data);
					},
					html: function(){
						data["productos"] = rows;
						res.header("Content-Type", "text/html; charset=utf-8");
						var transform = [{
							"tag": "div",
							"class": "codigo",
							"html": "${codigo}"
						}, {
							"tag": "div",
							"class": "nombre",
							"html": "${nombre}"
						}, {
							"tag": "div",
							"class": "moneda",
							"html": "${moneda}"
						}, {
							"tag": "div",
							"class": "descripcion",
							"html": "${descripcion}"
						}, {
							"tag": "div",
							"class": "precio",
							"html": "${precio}"
						}];
						var header = '<head></head>';
						var body = '<div id="productos">'; 
						for(var i=0;i<rows.length;i++){
							body=body + '<div id="producto">';
							body=body + json2html.transform(data['productos'][i],transform);
							body=body + '</div>';
						}

						var body = body + '</div>';
						var out = '<!DOCTYPE html><html>' + header + '<body>' + body + '</body></html>';

						res.status(200).send(out);
					},
					xml: function(){
						data["producto"] = rows;
						res.header("Content-Type", "application/xml; charset=utf-8");
						var body='';
						body=body + js2xmlparser("productos",data);
						body=body +'';

						res.status(200).send(body);
					},

				default: function() {
					res.status(406).send('Not Acceptable');
				}
				});
			}else{
				res.format({
					json: function(){
						data["productos"] = '';
						res.header("Content-Type", "application/json; charset=utf-8");
						res.status(200).json(data);
					},

					html: function(){
						data["producto"] = rows;
						res.header("Content-Type", "text/html; charset=utf-8");
						var header = '<head></head>';
						var body = '<div id="productos"></div>';
						var out = '<!DOCTYPE html><html>' + header + '<body>' + body + '</body></html>';
						res.status(200).send(out);
					},
					xml: function(){
						data["productos"] = rows;
						res.header("Content-Type", "application/xml; charset=utf-8");
						res.status(200).send(js2xmlparser("productos",data));
					},
				default: function() {
					res.status(406).send('Not Acceptable');
				}
				});
			}
		});
	});


//	***** OK
//	GET producto by Id
	router.get("/productos/:id_producto",function(req,res){
		var data = {};
		var query = "SELECT * FROM ?? WHERE ??=?";
		var table = ["producto","codigo",req.params.id_producto];
		query = mysql.format(query,table);

		connection.query(query,function(err,rows){
			if(rows.length != 0){
				data["producto"] = rows;
				res.format({
					json: function(){
						res.header("Content-Type", "application/json; charset=utf-8");
						res.status(200).json(data["producto"][0]);
					},
					xml: function(){
						res.header("Content-Type", "application/xml; charset=utf-8");
						res.status(200).send(js2xmlparser("producto",data["producto"][0]));
					},
					html: function(){
						res.header("Content-Type", "text/html; charset=utf-8");
						var transform = [{
							"tag": "div",
							"class": "codigo",
							"html": "${codigo}"
						}, {
							"tag": "div",
							"class": "nombre",
							"html": "${nombre}"
						}, {
							"tag": "div",
							"class": "moneda",
							"html": "${moneda}"
						}, {
							"tag": "div",
							"class": "descripcion",
							"html": "${descripcion}"
						}, {
							"tag": "div",
							"class": "precio",
							"html": "${precio}"
						}];
						var header = '<head></head>';
						var body = '<div id="producto">' + json2html.transform(data["producto"][0],transform) + '</div>';
						var out = '<!DOCTYPE html><html><head>' + header + '</head><body>' + body + '</body></html>';
						res.status(200).send(out);
					}
				});
			}else{
				res.format({
					json: function(){
						res.header("Content-Type", "application/json; charset=utf-8");
						res.status(200).json(data);
					},
					html: function(){
						res.header("Content-Type", "text/html; charset=utf-8");
						var header = '<head></head>';
						var body = '';
						var out = '<!DOCTYPE html><html>' + header + '<body>' + body + '</body></html>';
						res.status(200).send(out);
					},
					xml: function(){
						res.header("Content-Type", "application/xml; charset=utf-8");
						res.status(200).send(js2xmlparser("producto",data));
					},
				default: function() {
					res.status(406).send('Not Acceptable');
				}
				});
			}//fin else

		});
	});

//	PUT producto by Id
	router.put("/productos/:codigo",function(req,res){

		var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
		var table = ["producto","nombre",req.body.nombre,"moneda",req.body.moneda,"descripcion",req.body.descripcion,"precio",req.body.precio,"codigo",req.body.codigo];

		query = mysql.format(query,table);

		connection.query(query,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query. Err: " + err});
			} else {
				//res.status(200).json({"Error" : false, "Message" : "Actualizacion producto por Id "+req.body.codigo});
				res.status(204).end();
			}
		});
	});

//	POST producto
	router.post("/productos",function(req,res){
		var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
		var table = ["producto","codigo","nombre","moneda","descripcion","precio",req.body.codigo,req.body.nombre,req.body.moneda,req.body.descripcion,req.body.precio];
		query = mysql.format(query,table);

		connection.query(query,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error ejecutando MySQL query. Err: "+ err});
			} else {
				res.status(201).json({"Error" : false, "Message" : "Producto Agregado !"});
			}
		});
	});

	//DELETE establecimiento by Id
	router.delete("/productos/:codigo",function(req,res){
		var query = "DELETE FROM ?? WHERE ?? = ?";
		var table = ["producto","codigo",req.params.codigo];
		query = mysql.format(query,table);
		connection.query(query,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error ejecutando MySQL query. Err: "+ err});
			} else {
				//res.status(200).json({"Error" : false, "Message" : "Producto eliminado por Id "+req.params.codigo});
				res.status(204).end();
			}
		});
	});	 


	/*****************************************INVENTARIO****************************************/	
	/*************************************************************************************************/	 		 

//	GET All lineaInventario
	router.get("/inventarios",function(req,res){
		var data={};
		var query = "SELECT * FROM ??";
		var table = ["lineaInventario"];
		query = mysql.format(query,table);

		connection.query(query,function(err,rows){
			if(rows.length != 0){
				res.format({
					json: function(){
						data["inventarios"] = rows;
						res.header("Content-Type", "application/json; charset=utf-8");
						res.status(200).json(data);
					},
					html: function(){
						data["inventarios"] = rows;
						res.header("Content-Type", "text/html; charset=utf-8");
						var transform = [{
							"tag": "div",
							"class": "id_lineaInventario",
							"html": "${id_lineaInventario}"
						}, {
							"tag": "div",
							"class": "establecimiento_id_establecimiento",
							"html": "${establecimiento_id_establecimiento}"
						}, {
							"tag": "div",
							"class": "producto_codigo",
							"html": "${producto_codigo}"
						}, {
							"tag": "div",
							"class": "cantidadProductos",
							"html": "${cantidadProductos}"
						}];
						var header = '<head></head>';
						var body = '<div id="inventarios">'; 
						for(var i=0;i<rows.length;i++){
							body=body + '<div id="inventario">';
							body=body + json2html.transform(data['inventarios'][i],transform);
							body=body + '</div>';
						}

						var body = body + '</div>';
						var out = '<!DOCTYPE html><html>' + header + '<body>' + body + '</body></html>';

						res.status(200).send(out);
					},
					xml: function(){
						data["inventario"] = rows;
						res.header("Content-Type", "application/xml; charset=utf-8");
						var body='';
						body=body + js2xmlparser("inventarios",data);
						body=body +'';

						res.status(200).send(body);
					},

				default: function() {
					res.status(406).send('Not Acceptable');
				}
				});
			}else{
				res.format({
					json: function(){
						data["inventarios"] = '';
						res.header("Content-Type", "application/json; charset=utf-8");
						res.status(200).json(data);
					},

					html: function(){
						data["inventario"] = rows;
						res.header("Content-Type", "text/html; charset=utf-8");
						var header = '<head></head>';
						var body = '<div id="inventarios"></div>';
						var out = '<!DOCTYPE html><html>' + header + '<body>' + body + '</body></html>';
						res.status(200).send(out);
					},
					xml: function(){
						data["inventarios"] = rows;
						res.header("Content-Type", "application/xml; charset=utf-8");
						res.status(200).send(js2xmlparser("inventarios",data));
					},
				default: function() {
					res.status(406).send('Not Acceptable');
				}
				});
			}
		});
	});		 

//	**OK
//	GET All lineaInventarioFilterByEstablecimiento	
	router.get("/inventariosFilterByEstablecimiento/:id_establecimiento",function(req,res){
		var data={};
		var query = "SELECT * FROM ?? WHERE ??=?";
		var table = ["lineaInventario","establecimiento_id_establecimiento",req.params.id_establecimiento];	        
		query = mysql.format(query,table);
		connection.query(query,function(err,rows){
			if(rows.length != 0){
				res.format({
					json: function(){
						data["inventarios"] = rows;
						res.header("Content-Type", "application/json; charset=utf-8");
						res.status(200).json(data);
					},
					html: function(){
						data["inventarios"] = rows;
						res.header("Content-Type", "text/html; charset=utf-8");
						var transform = [{
							"tag": "div",
							"class": "id_lineaInventario",
							"html": "${id_lineaInventario}"
						}, {
							"tag": "div",
							"class": "establecimiento_id_establecimiento",
							"html": "${establecimiento_id_establecimiento}"
						}, {
							"tag": "div",
							"class": "producto_codigo",
							"html": "${producto_codigo}"
						}, {
							"tag": "div",
							"class": "cantidadProductos",
							"html": "${cantidadProductos}"
						}];
						var header = '<head></head>';
						var body = '<div id="inventarios">'; 
						for(var i=0;i<rows.length;i++){
							body=body + '<div id="inventario">';
							body=body + json2html.transform(data['inventarios'][i],transform);
							body=body + '</div>';
						}

						var body = body + '</div>';
						var out = '<!DOCTYPE html><html>' + header + '<body>' + body + '</body></html>';

						res.status(200).send(out);
					},
					xml: function(){
						data["inventario"] = rows;
						res.header("Content-Type", "application/xml; charset=utf-8");
						var body='';
						body=body + js2xmlparser("inventarios",data);
						body=body +'';

						res.status(200).send(body);
					},

				default: function() {
					res.status(406).send('Not Acceptable');
				}
				});
			}else{
				res.format({
					json: function(){
						data["inventarios"] = '';
						res.header("Content-Type", "application/json; charset=utf-8");
						res.status(200).json(data);
					},

					html: function(){
						data["inventario"] = rows;
						res.header("Content-Type", "text/html; charset=utf-8");
						var header = '<head></head>';
						var body = '<div id="inventarios"></div>';
						var out = '<!DOCTYPE html><html>' + header + '<body>' + body + '</body></html>';
						res.status(200).send(out);
					},
					xml: function(){
						data["inventarios"] = rows;
						res.header("Content-Type", "application/xml; charset=utf-8");
						res.status(200).send(js2xmlparser("inventarios",data));
					},
				default: function() {
					res.status(406).send('Not Acceptable');
				}
				});
			}
		});
	});	 		




//	GET LINEA_INVENTARIO by id_establecimiento
	router.get("/inventarios/:id_lineaInventario",function(req,res){
		var data = {};
		var query = "SELECT * FROM ?? WHERE ??=?";
		var table = ["lineaInventario","id_lineaInventario",req.params.id_lineaInventario];	        
		query = mysql.format(query,table);
		connection.query(query,function(err,rows){
			if(rows.length != 0){
				data["inventario"] = rows;
				res.format({
					json: function(){
						res.header("Content-Type", "application/json; charset=utf-8");
						res.status(200).json(data["inventario"][0]);
					},
					xml: function(){
						res.header("Content-Type", "application/xml; charset=utf-8");
						res.status(200).send(js2xmlparser("inventario",data["inventario"][0]));
					},
					html: function(){
						res.header("Content-Type", "text/html; charset=utf-8");
						var transform = [{
							"tag": "div",
							"class": "id_lineaInventario",
							"html": "${id_lineaInventario}"
						}, {
							"tag": "div",
							"class": "establecimiento_id_establecimiento",
							"html": "${establecimiento_id_establecimiento}"
						}, {
							"tag": "div",
							"class": "producto_codigo",
							"html": "${producto_codigo}"
						}, {
							"tag": "div",
							"class": "cantidadProductos",
							"html": "${cantidadProductos}"
						}];
						var header = '<head></head>';
						var body = '<div id="inventario">' + json2html.transform(data["inventario"][0],transform) + '</div>';
						var out = '<!DOCTYPE html><html><head>' + header + '</head><body>' + body + '</body></html>';
						res.status(200).send(out);
					}
				});
			}else{
				res.format({
					json: function(){
						res.header("Content-Type", "application/json; charset=utf-8");
						res.status(200).json(data);
					},
					html: function(){
						res.header("Content-Type", "text/html; charset=utf-8");
						var header = '<head></head>';
						var body = '';
						var out = '<!DOCTYPE html><html>' + header + '<body>' + body + '</body></html>';
						res.status(200).send(out);
					},
					xml: function(){
						res.header("Content-Type", "application/xml; charset=utf-8");
						res.status(200).send(js2xmlparser("inventario",data));
					},
				default: function() {
					res.status(406).send('Not Acceptable');
				}
				});
			}//fin else

		});
	});	 



//	POST lineaInventario
	router.post("/inventarios",function(req,res){
		var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
		var table = ["lineaInventario","establecimiento_id_establecimiento","producto_codigo","cantidadProductos",req.body.establecimiento_id_establecimiento,req.body.producto_codigo,req.body.cantidadProductos];
		query = mysql.format(query,table);
		connection.query(query,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error ejecutando MySQL query. Err: "+ err});
			} else {
				res.status(201).json({"Error" : false, "Message" : "Linea de Inventario Agregada !"});

			}
		});
	});



//	PUT lineaInventario by Id , only cantidadProductos
	router.put("/inventarios/:id_lineaInventario",function(req,res){

		var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
		var table = ["lineaInventario","cantidadProductos",req.body.cantidadProductos,"id_LineaInventario",req.body.id_lineaInventario];
		query = mysql.format(query,table);
		connection.query(query,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error executing MySQL query. Err: " + err});
			} else {
				//res.status(204).json({"Error" : false, "Message" : "Actualizacion cantidad de productos en la linea Id "+req.body.id_lineaInventario});
				res.status(204).end();
			}
		});
	});		 


//	DELETE lineaInventario by id_establecimiento y producto_codigo
	router.delete("/inventarios/:id_lineaInventario",function(req,res){
		var query = "DELETE FROM ?? WHERE ?? = ?";
		var table = ["lineaInventario","id_lineaInventario",req.params.id_lineaInventario];
		query = mysql.format(query,table);
		connection.query(query,function(err,rows){
			if(err) {
				res.json({"Error" : true, "Message" : "Error ejecutando MySQL query. Err: "+ err});
			} else {
				//res.status(204).json({"Error" : false, "Message" : "Producto eliminado por Id "+req.params.id_lineaInventario});
				res.status(204).end();
			}
		});
	});	 	    
}
module.exports = wspaysa_ROUTER;