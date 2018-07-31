'use strict';

var app = angular.module('olimpiadasApp', ['ngRoute', 'ngResource']).run(function($rootScope, $http) {
});

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'main.html',
            controller: 'mainController'
        })
});



app.factory('preguntaService', function($http, $resource) {
    var tmp =  $resource('/api/pregunta/:id');
    return tmp;
});
app.factory('categoriaService', function($http, $resource) {
    return $resource('/api/categoria/:id');
});
app.factory('olimpiadaService', function($http, $resource) {
    return $resource('/api/olimpiada/:id');
});

app.controller('mainController', function($rootScope, $scope, preguntaService, categoriaService, olimpiadaService) {
    $rootScope.limpiar = function(){
        $scope.nuevaPregunta = {
            intId: -1,
            intIdCategoria: -1,
            intIdOlimpiada: -1,
            txtPregunta: "",
            txtCorrecta: "",
            txtRespuesta1: "",
            txtRespuesta2: "",
            txtRespuesta3: ""
        };
    }


    $scope.olimpiadas = olimpiadaService.query();
    $scope.categorias = categoriaService.query();
    $scope.preguntas = preguntaService.query();

    $scope.nuevaPregunta = {
        intId: -1,
        intIdCategoria: -1,
        intIdOlimpiada: -1,
        txtPregunta: "",
        txtCorrecta: "",
        txtRespuesta1: "",
        txtRespuesta2: "",
        txtRespuesta3: ""
    };
    
    $scope.post = function() {
        $scope.nuevaPregunta.intIdCategoria = $scope.selectedCategoria.intId;
        $scope.nuevaPregunta.intIdOlimpiada = $scope.selectedOlimpiada.intId;

        preguntaService.save($scope.nuevaPregunta, function(putResponseHeaders) {
            $scope.preguntas = preguntaService.query();
            $scope.nuevaPregunta.intId = putResponseHeaders.last_insert_rowid;
            /*
            $scope.nuevaPregunta = {
                intId: -1,
                intIdCategoria: -1,
                intIdOlimpiada: -1,
                txtPregunta: "",
                txtCorrecta: "",
                txtRespuesta1: "",
                txtRespuesta2: "",
                txtRespuesta3: ""
            };
            */
        });
    }
});
