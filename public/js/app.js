angular.module("paysaApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            
        	//OK
        	.when("/", {
                templateUrl: "list.html",
                controller: "EstablecimientoController",
                resolve: {
                    establecimientos: function(Establecimientos) {
                        return Establecimientos.getEstablecimientos();
                    }
                }
            })
            
            //OK
            .when("/new/establecimiento", {
                controller: "NewEstablecimientoController",
                templateUrl: "contact-form.html"
            })
            
            
            .when("/establecimiento/:id_establecimiento", {
                controller: "EditEstablecimientoController",
                templateUrl: "contact.html"
            })
            
            //OK
            .otherwise({
                redirectTo: "#/"
            })
    })
    
    //Servicios
    
    .service("Establecimientos", function($http) {
        
    	//OK
    	this.getEstablecimientos = function() {
            return $http.get("/establecimientos").
                then(function(response) {
                	return response;
                }, function(response) {
                    alert("Error encontrando los establecimientos");
                });
        }
        
    	//OK
        this.createEstablecimiento = function(establecimiento) {
            return $http.post("/establecimientos", establecimiento).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error creando nuevo establecimiento.");
                });
        }
        
        //OK
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
    
    //OK
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
            $scope.contactFormUrl = "contact-form.html";
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