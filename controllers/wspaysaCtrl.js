var mysql = require('mysql');


function wspaysa_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

wspaysa_ROUTER.prototype.handleRoutes= function(router,connection,md5) {

// Mensaje de funcionamiento
/*	router.get("/",function(req,res){
        res.json({"Message" : "Prueba de WebService wsPaysa MTI 2015!"});
    });
	*/
	
/*****************************************ESTABLECIMIENTOS****************************************/	
/*************************************************************************************************/
	
//GET All establecimiento
	router.get("/establecimientos",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["establecimiento"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                //res.json({"Error" : true, "Message" : "Error ejecutando MySQL query. Err: "+ err});
            	res.json({"Error" : true, "Message" : "Error ejecutando MySQL query. Err: "+ err});
            } else {
                //res.json({"Error" : false, "Message" : "Exito", "establecimientos" : rows});
            	res.status(200).json(rows);
            }
        });
    });

//GET establecimiento by Id
    router.get("/establecimientos/:id_establecimiento",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["establecimiento","id_establecimiento",req.params.id_establecimiento];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error ejecutando MySQL query. Err: "+ err});
            } else {
                res.status(200).json(rows);
            }
        });
    });
    
//PUT establecimiento by Id
    router.put("/establecimientos/:id_establecimiento",function(req,res){
    	
      	var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
    	var table = ["establecimiento","direccion",req.body.direccion,"ciudad",req.body.ciudad,"pais",req.body.pais,"telefono",req.body.telefono,"id_establecimiento",req.body.id_establecimiento];
    	
    	query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query. Err: " + err});
            } else {
                res.status(200).json({"Error" : false, "Message" : "Actualizacion establecimiento por Id "+req.body.id_establecimiento});
            }
        });
    });
        
    
//POST establecimiento
	 router.post("/establecimientos",function(req,res){
	        var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
	        
	        var table = ["establecimiento","direccion","ciudad","pais","telefono",req.body.direccion,req.body.ciudad,req.body.pais,req.body.telefono];
	        query = mysql.format(query,table);
	        connection.query(query,function(err,rows){
	            if(err) {
	                res.json({"Error" : true, "Message" : "Error ejecutando MySQL query. Err: "+ err});
	            } else {
	                res.status(200).json({"Error" : false, "Message" : "Establecimiento Agregado !"});
	            }
	        });
	    });
	 
//DELETE establecimiento by Id
	 router.delete("/establecimientos/:id_establecimiento",function(req,res){
	        var query = "DELETE FROM ?? WHERE ?? = ?";
	        var table = ["establecimiento","id_establecimiento",req.params.id_establecimiento];
	        query = mysql.format(query,table);
	        connection.query(query,function(err,rows){
	            if(err) {
	                res.json({"Error" : true, "Message" : "Error ejecutando MySQL query. Err: "+ err});
	            } else {
	                res.status(200).json({"Error" : false, "Message" : "Establecimiento eliminado por Id "+req.params.id_establecimiento});
	            }
	        });
	    });
	 
 
/*****************************************PRODUCTOS****************************************/	
/*************************************************************************************************/	 
	 
//GET All producto
		router.get("/productos",function(req,res){
	        var query = "SELECT * FROM ??";
	        var table = ["producto"];
	        query = mysql.format(query,table);
	        connection.query(query,function(err,rows){
	            if(err) {
	                res.json({"Error" : true, "Message" : "Error ejecutando MySQL query. Err: "+ err});
	            } else {
	                res.status(200).json({"Error" : false, "Message" : "Exito", "productos" : rows});
	            }
	        });
	    });

//GET producto by Id
	    router.get("/productos/:id_producto",function(req,res){
	        var query = "SELECT * FROM ?? WHERE ??=?";
	        var table = ["producto","codigo",req.params.id_producto];
	        query = mysql.format(query,table);
	        connection.query(query,function(err,rows){
	            if(err) {
	                res.json({"Error" : true, "Message" : "Error ejecutando MySQL query. Err: "+ err});
	            } else {
	                res.status(200).json({"Error" : false, "Message" : "Exito", "producto" : rows});
	            }
	        });
	    });
			 
//PUT producto by Id
	    router.put("/productos/:codigo",function(req,res){
	    	
	      	var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
	    	var table = ["producto","nombre",req.body.nombre,"moneda",req.body.moneda,"descripcion",req.body.descripcion,"precio",req.body.precio,"codigo",req.body.codigo];
	    	
	    	query = mysql.format(query,table);
	    	
	        connection.query(query,function(err,rows){
	            if(err) {
	                res.json({"Error" : true, "Message" : "Error executing MySQL query. Err: " + err});
	            } else {
	                res.status(200).json({"Error" : false, "Message" : "Actualizacion producto por Id "+req.body.codigo});
	            }
	        });
	    });
		    
//POST producto
		 router.post("/productos",function(req,res){
		        var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
		        var table = ["producto","codigo","nombre","moneda","descripcion","precio",req.body.codigo,req.body.nombre,req.body.moneda,req.body.descripcion,req.body.precio];
		        query = mysql.format(query,table);
		        	        
		        connection.query(query,function(err,rows){
		            if(err) {
		                res.json({"Error" : true, "Message" : "Error ejecutando MySQL query. Err: "+ err});
		            } else {
		                res.status(200).json({"Error" : false, "Message" : "Producto Agregado !"});
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
		                res.status(200).json({"Error" : false, "Message" : "Producto eliminado por Id "+req.params.codigo});
		            }
		        });
		    });	 
	 

/*****************************************INVENTARIO****************************************/	
/*************************************************************************************************/	 		 
	 
//GET All lineaInventario
		router.get("/inventarios",function(req,res){
		        var query = "SELECT * FROM ??";
		        var table = ["lineaInventario"];
		        query = mysql.format(query,table);
		        connection.query(query,function(err,rows){
		            if(err) {
		                res.json({"Error" : true, "Message" : "Error ejecutando MySQL query. Err: "+ err});
		            } else {
		                res.status(200).json({"Error" : false, "Message" : "Exito", "lineasInventario" : rows});
		            }
		        });
		    });		 
		 
		 
		 
//GET LINEA_INVENTARIO by id_establecimiento
	    router.get("/inventarios/:id_establecimiento",function(req,res){
		        var query = "SELECT * FROM ?? WHERE ??=?";
		        var table = ["lineaInventario","establecimiento_id_establecimiento",req.params.id_establecimiento];	        
		        query = mysql.format(query,table);
		        connection.query(query,function(err,rows){
		            if(err) {
		                res.json({"Error" : true, "Message" : "Error ejecutando MySQL query. Err: "+ err});
		            } else {
		                res.status(200).json({"Error" : false, "Message" : "Exito", "lineasInventario" : rows});
		            }
		        });
		    });	 
	 

		    
//POST lineaProducto
		 router.post("/inventarios",function(req,res){
		        var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
		        var table = ["lineaInventario","establecimiento_id_establecimiento","producto_codigo","cantidadProductos",req.body.id_establecimiento,req.body.codigo,req.body.cantidadProductos];
		        query = mysql.format(query,table);
		        connection.query(query,function(err,rows){
		            if(err) {
		                res.json({"Error" : true, "Message" : "Error ejecutando MySQL query. Err: "+ err});
		            } else {
		                res.status(200).json({"Error" : false, "Message" : "Linea de Inventario Agregada !"});
		            }
		        });
		    });
		 
		 

//PUT lineaInventario by Id , only cantidadProductos
		 router.put("/inventarios/:id_lineaInventario",function(req,res){
			    	
			      	var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
			      	var table = ["lineaInventario","cantidadProductos",req.body.cantidadProductos,"id_LineaInventario",req.body.id_lineaInventario];
			    	query = mysql.format(query,table);
			        connection.query(query,function(err,rows){
			            if(err) {
			                res.json({"Error" : true, "Message" : "Error executing MySQL query. Err: " + err});
			            } else {
			                res.status(200).json({"Error" : false, "Message" : "Actualizacion cantidad de productos en la linea Id "+req.body.id_lineaInventario});
			            }
			        });
			    });		 


//DELETE lineaInventario by id_establecimiento y producto_codigo
		 router.delete("/inventarios/:id_lineaInventario",function(req,res){
		        var query = "DELETE FROM ?? WHERE ?? = ?";
		        var table = ["lineaInventario","id_lineaInventario",req.params.id_lineaInventario];
		        query = mysql.format(query,table);
		        connection.query(query,function(err,rows){
		            if(err) {
		                res.json({"Error" : true, "Message" : "Error ejecutando MySQL query. Err: "+ err});
		            } else {
		                res.status(200).json({"Error" : false, "Message" : "Producto eliminado por Id "+req.params.id_lineaInventario});
		            }
		        });
		    });	 	    
}
module.exports = wspaysa_ROUTER;