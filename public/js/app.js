angular.module("paysaApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "ListController",
                resolve: {
                    establecimientos: function(Establecimientos) {
                        return Establecimientos.getEstablecimientos();
                    }
                }
            })
            .when("/new/establecimiento", {
                controller: "NewContactController",
                templateUrl: "contact-form.html"
            })
            .when("/establecimiento/:id_establecimiento", {
                controller: "EditContactController",
                templateUrl: "contact.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    .service("Establecimientos", function($http) {
        this.getEstablecimientos = function() {
            return $http.get("/establecimiento").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error encontrando los establecimientos");
                });
        }
        this.createEstablecimiento = function(establecimiento) {
            return $http.post("/establecimiento", establecimiento).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error creando nuevo establecimiento.");
                });
        }
        this.getEstablecimiento = function(id_establecimiento) {
            var url = "/establecimiento/" +id_establecimiento;
            return $http.get(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error encontrando el establecimiento solicitado.");
                });
        }
        this.editEstablecimiento = function(establecimiento) {
            var url = "/establecimiento/" + establecimiento.id_establecimiento;
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
            var url = "/establecimiento/" + id_establecimiento;
            return $http.delete(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error elimiando establecimiento seleccionado.");
                    console.log(response);
                });
        }
    })
    .controller("ListController", function(establecimientos, $scope) {
        $scope.establecimientos = establecimientos.data;
    })
    .controller("NewContactController", function($scope, $location, Establecimientos) {
        $scope.back = function() {
            $location.path("#/");
        }

        $scope.saveEstablecimiento = function(establecimiento) {
            Establecimientos.createEstablecimiento(establecimiento).then(function(doc) {
                var contactUrl = "/establecimiento/" + doc.data._id;
                $location.path(contactUrl);
            }, function(response) {
                alert(response);
            });
        }
    })
    .controller("EditContactController", function($scope, $routeParams, Contacts) {
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
            Establecimientos.editEstablecimiento(establecimiento);
            $scope.editMode = false;
            $scope.contactFormUrl = "";
        }

        $scope.deleteEstablecimiento = function(id_establecimiento) {
            Establecimientos.deleteEstablecimiento(id_establecimiento);
        }
    });