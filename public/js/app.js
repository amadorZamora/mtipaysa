angular.module("paysaApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
        	//Establecimiento
        	.when("/", {
                templateUrl: "listaEstablecimiento.html",
                controller: "EstablecimientoController",
                resolve: {
                    establecimientos: function(Establecimientos) {
                        return Establecimientos.getEstablecimientos();
                    }
                }
            })
            .when("/new/establecimiento", {
                controller: "NewEstablecimientoController",
                templateUrl: "establecimiento-form.html"
            })
            .when("/establecimiento/:id_establecimiento", {
                controller: "EditEstablecimientoController",
                templateUrl: "establecimiento.html"
            })
            //Producto
            .when("/producto", {
                templateUrl: "listaProducto.html",
                controller: "ProductoController",
                resolve: {
                    productos: function(Productos) {
                        return Productos.getProductos();
                    }
                }
            })
            .when("/new/producto", {
                controller: "NewProductoController",
                templateUrl: "producto-form.html"
            })
            .when("/producto/:codigo", {
                controller: "EditProductoController",
                templateUrl: "producto.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    //Servicios  establecimientos 
    .service("Establecimientos", function($http) {
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
    })
    
    //Controllers
    
    //Controller Establecimiento
    .controller("EstablecimientoController", function(establecimientos, $scope) {
    	$scope.establecimientos = establecimientos.data;
    })
    //Create
    .controller("NewEstablecimientoController", function($scope, $location, Establecimientos) {
        $scope.back = function() {
            $location.path("#/");
        }
        $scope.saveEstablecimiento = function(establecimiento) {
            Establecimientos.createEstablecimiento(establecimiento).then(function(doc) {
                var contactUrl = "/establecimientos/" + doc.data._id;
                $location.path(contactUrl);
            }, function(response) {
                alert(response);
            });
        }
    })
    //Edit
    .controller("EditEstablecimientoController", function($scope, $routeParams, Establecimientos) {
    	//llamada servicio
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
            $scope.contactFormUrl = "";
        }
        $scope.saveEstablecimiento = function(establecimiento) {
            //llamada servicio
        	Establecimientos.editEstablecimiento(establecimiento);
            $scope.editMode = false;
            $scope.contactFormUrl = "";
        }
        $scope.deleteEstablecimiento = function(id_establecimiento) {
            //llamada servicio
        	Establecimientos.deleteEstablecimiento(id_establecimiento);
        }
    });