//se define modulo angular
//angular.module("nameApp",[dependencies])


var app= angular.module("paysaApp",['ngRoute']);

// configuración de rutas
app.config(function($routeProvider){
	$routeProvider
	// pagina principal del sitio.
	.when("/", {
		templateUrl: "info.html"
	})
	// Establecimiento
	.when("/listaEstablecimiento", {
		templateUrl: "listaEstablecimiento.html",
		controller: "EstablecimientoController",
		resolve: {
			establecimientos: function(Establecimientos) {
				return Establecimientos.getEstablecimientos();
			}
		}
	})
	//Nuevo Establecimiento
	.when("/new/establecimiento", {
		controller: "NewEstablecimientoController",
		templateUrl: "establecimiento-form.html"
	})
	//Buscar Establecimiento
	.when("/establecimiento/:id_establecimiento", {
		controller: "EditEstablecimientoController",
		templateUrl: "establecimiento.html"
	})
	// Producto
	.when("/listaProducto", {
		templateUrl: "listaProducto.html",
		controller: "ProductoController",
		resolve: {
			productos: function(Productos) {
				return Productos.getProductos();
			}
		}
	})
	//Nuevo producto
	.when("/new/producto", {
		controller: "NewProductoController",
		templateUrl: "producto-form.html"
	})
	//Busqueda producto por codigo
	.when("/producto/:codigo", {
		controller: "EditProductoController",
		templateUrl: "producto.html"
	})
	
	//Inventario
	.when("/listaInventario", {
		templateUrl: "listaInventario.html",
		controller: "InventarioController",
		resolve: {
			establecimientos: function(Establecimientos) {
				return Establecimientos.getEstablecimientos();
			}
		}
	})
	
	//Nuevo inventario
	.when("/new/inventario", {
		controller: "NewInventarioController",
		templateUrl: "inventario-form.html"
	})
	//Busqueda inventario por codigo
	.when("/inventario/:id_lineaInventario", {
		controller: "EditInventarioController",
		templateUrl: "inventario.html"
	})
	
	
	
	// otros casos del sitio, redirigen a la pagina del sitio principal
	.otherwise({
		redirectTo: "/"
	})
});// fin config

// SERVICIOS REST
// servicio Establecimientos
app.service("Establecimientos", function($http) {
	this.getEstablecimientos = function() {
		return $http.get("/establecimientos").
		then(function(response) {
			return response;
		}, function(response) {
			alert("Error encontrando los establecimientos");
		});
	}
	this.createEstablecimiento = function(establecimiento) {
		return $http.post("/establecimientos", establecimiento).
		then(function(response) {
			return response;
		}, function(response) {
			alert("Error creando nuevo establecimiento.");
		});
	}
	this.getEstablecimiento = function(id_establecimiento) {
		var url = "/establecimientos/" +id_establecimiento;
		return $http.get(url).
		then(function(response) {
			return response;
		}, function(response) {
			alert("Error encontrando el establecimiento solicitado.");
		});
	}
	this.editEstablecimiento = function(establecimiento) {
		var url = "/establecimientos/" + establecimiento.id_establecimiento;
		console.log(establecimiento.id_establecimiento);
		return $http.put(url, establecimiento).
		then(function(response) {
			return response;
		}, function(response) {
			alert("Error editando el establecimiento seleccionado.");
			console.log(response);
		});
	}
	this.deleteEstablecimiento = function(id_establecimiento) {
		var url = "/establecimientos/" + id_establecimiento;
		return $http.delete(url).
		then(function(response) {
			return response;
		}, function(response) {
			alert("Error elimiando establecimiento seleccionado.");
			console.log(response);
		});
	}
});

// Servicios producto
app.service("Productos", function($http) {
	this.getProductos = function() {
		return $http.get("/productos").
		then(function(response) {
			return response;
		}, function(response) {
			alert("Error encontrando los productos");
		});
	}
	this.createProducto = function(producto) {
		return $http.post("/productos", producto).
		then(function(response) {
			return response;
		}, function(response) {
			alert("Error creando nuevo producto.");
		});
	}
	this.getProducto = function(codigo) {
		var url = "/productos/" +codigo;
		return $http.get(url).
		then(function(response) {
			return response;
		}, function(response) {
			alert("Error encontrando el producto solicitado.");
		});
	}
	this.editProducto = function(producto) {
		var url = "/productos/" + producto.codigo;
		console.log(producto.codigo);
		return $http.put(url, producto).
		then(function(response) {
			return response;
		}, function(response) {
			alert("Error editando el producto seleccionado.");
			console.log(response);
		});
	}
	this.deleteProducto = function(codigo) {
		var url = "/productos/" + codigo;
		return $http.delete(url).
		then(function(response) {
			return response;
		}, function(response) {
			alert("Error elimiando producto seleccionado.");
			console.log(response);
		});
	}
});

// Servicio Inventario
app.service("Inventarios", function($http) {
	
	this.getInventariosFilterByEstablecimientos = function(id_establecimiento) {
		var url="/inventariosFilterByEstablecimiento/"+id_establecimiento;
		return $http.get(url).
		then(function(response) {
			return response;
		}, function(response) {
			alert("Error encontrando las lineas de inventario asociadas al establecimiento");
		});
	}
	this.getInventarios = function() {
			return $http.get("/inventarios").
			then(function(response) {
				return response;
			}, function(response) {
				alert("Error encontrando los inventarios");
			});
		}
	
	this.createInventario = function(inventario) {
		return $http.post("/inventarios", inventario).
		then(function(response) {
			return response;
		}, function(response) {
			alert("Error creando nueva linea de inventario.");
		});
	}
	this.getInventario = function(id_lineaInventario) {
		var url = "/inventarios/" +id_lineaInventario;
		return $http.get(url).
		then(function(response) {
			return response;
		}, function(response) {
			alert("Error encontrando la linea de Inventario solicitada.");
		});
	}
	this.editInventario = function(inventario) {
		var url = "/inventarios/" + inventario.id_lineaInventario;
		console.log(inventario.id_lineaInventario);
		return $http.put(url, inventario).
		then(function(response) {
			return response;
		}, function(response) {
			alert("Error editando la linea de inventario seleccionada.");
			console.log(response);
		});
	}
	this.deleteInventario = function(id_lineaInventario) {
		var url = "/inventarios/" + id_lineaInventario;
		return $http.delete(url).
		then(function(response) {
			return response;
		}, function(response) {
			alert("Error eliminando linea de inventario seleccionada.");
			console.log(response);
		});
	}
});

// CONTROLLERS

// EstablecimientoController
app.controller("EstablecimientoController", function(establecimientos, $scope) {
	$scope.establecimientos = establecimientos.data;
});

// NewEstablecimientoController - Create
app.controller("NewEstablecimientoController", function($scope, $location, Establecimientos) {
	$scope.back = function() {
		$location.path("listaEstablecimiento/");
	}
	$scope.saveEstablecimiento = function(establecimiento) {
		Establecimientos.createEstablecimiento(establecimiento).then(function(doc) {
			var contactUrl = "listaEstablecimiento/"
				$location.path(contactUrl);
		}, function(response) {
			alert(response);
		});
	}
});


// EditEstablecimientoController - Edit
app.controller("EditEstablecimientoController", function($scope, $routeParams, Establecimientos) {
	// llamada servicio
	Establecimientos.getEstablecimiento($routeParams.id_establecimiento).then(function(doc) {
		$scope.establecimiento = doc.data;
	}, function(response) {
		alert(response);
	});
	$scope.toggleEdit = function() {
		$scope.editMode = true;
		$scope.contactFormUrl = "establecimiento-form.html";
	}
	$scope.back = function() {
		$scope.editMode = false;
		$scope.contactFormUrl = "listaEstablecimiento/";
	}
	$scope.saveEstablecimiento = function(establecimiento) {
		// llamada servicio
		Establecimientos.editEstablecimiento(establecimiento);
		$scope.editMode = false;
		$scope.contactFormUrl = "listaEstablecimiento/";
	}
	$scope.deleteEstablecimiento = function(id_establecimiento) {
		// llamada servicio
		Establecimientos.deleteEstablecimiento(id_establecimiento);
	}
});

// ProductoController
app.controller("ProductoController", function(productos, $scope) {
	$scope.productos = productos.data;
});

// NewProductoController
app.controller("NewProductoController", function($scope, $location, Productos) {
	$scope.back = function() {
		$location.path("listaProducto/");
	}
	$scope.saveProducto = function(producto) {
		Productos.createProducto(producto).then(function(doc) {
			var contactUrl = "listaProducto/";
			$location.path(contactUrl);
		}, function(response) {
			alert(response);
		});
	}
});

// EditProductoController
app.controller("EditProductoController", function($scope, $routeParams, Productos) {
	// llamada servicio
	Productos.getProducto($routeParams.codigo).then(function(doc) {
		$scope.producto = doc.data;
	}, function(response) {
		alert(response);
	});
	$scope.toggleEdit = function() {
		$scope.editMode = true;
		$scope.contactFormUrl = "producto-form.html";
	}
	$scope.back = function() {
		$scope.editMode = false;
		$scope.contactFormUrl = "listaProducto/";
	}
	$scope.saveProducto = function(producto) {
		// llamada servicio
		Productos.editProducto(producto);
		$scope.editMode = false;
		$scope.contactFormUrl = "listaProducto/";
	}
	$scope.deleteProducto = function(codigo) {
		// llamada servicio
		Productos.deleteProducto(codigo);
	}

});

// InventarioController
app.controller("InventarioController", function($scope, $routeParams, Inventarios,establecimientos) {
	$scope.establecimientos = establecimientos.data;
	
	$scope.getListaInventario = function(establecimientoSelected) {
		Inventarios.getInventariosFilterByEstablecimientos(establecimientoSelected).then(function(doc){
			$scope.inventarios = doc.data;
		},function(doc){
			alert('Error: No existen datos');
		});
	};
});

//NewInventarioController
app.controller("NewInventarioController", function($scope, $location, Inventarios) {
	$scope.back = function() {
		$location.path("listaInventario/");
	}
	$scope.saveInventario = function(inventario) {
		Inventarios.createInventario(inventario).then(function(doc) {
			var contactUrl = "listaInventario/";
			$location.path(contactUrl);
		}, function(response) {
			alert(response);
		});
	}
});

//EditInventarioController
app.controller("EditInventarioController", function($scope, $routeParams, Inventarios) {
	// llamada servicio
	Inventarios.getInventario($routeParams.id_lineaInventario).then(function(doc) {
		$scope.inventario = doc.data;
	}, function(response) {
		alert(response);
	});
	$scope.toggleEdit = function() {
		$scope.editMode = true;
		$scope.contactFormUrl = "inventario-form.html";
	}
	$scope.back = function() {
		$scope.editMode = false;
		$scope.contactFormUrl = "listaInventario/";
	}
	$scope.saveInventario = function(inventario) {
		// llamada servicio
		Inventarios.editInventario(inventario);
		$scope.editMode = false;
		$scope.contactFormUrl = "listaInventario/";
	}
	$scope.deleteInventario = function(id_lineaInventario) {
		// llamada servicio
		Inventarios.deleteInventario(id_lineaInventario);
	}

});









