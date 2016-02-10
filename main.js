'use strict'; 

var app = angular.module('MyApp', ['ngStorage']);
var i;

app.controller('mainCtrl', function($scope, $localStorage, $sessionStorage) {
  $scope.$storage = $localStorage;
  if(!$scope.$storage.contacts) {
    $scope.$storage = $localStorage.$default({
      contacts: []
    });
  }
  console.log('hello from mainCtrl!');

  $scope.keys = Object.keys;

  $scope.contacts = $scope.$storage.contacts;

  $scope.editing = false;
  $scope.searching = false;

  $scope.addContact = function() {
    $scope.contacts.push($scope.newContact);
    $scope.newContact = {};
  }

  $scope.deleteContact = function(contact) {
    var index = $scope.contacts.indexOf(contact);
    $scope.contacts.splice(index, 1);
  }

  $scope.sortContact = function(key) {
    $scope.sortText = $scope.sortText === key ? ('-' + key) : key;
  }

  $scope.startEdit = function(contact) {
    $scope.editing = !$scope.editing;
    $('#editName').val(contact.name);
    $('#editEmail').val(contact.email);
    $('#editPhone').val(contact.phone);
    i = $scope.contacts.indexOf(contact);
  }

  $scope.editContact = function() {
    var editedContact = {};
    editedContact.name = $('#editName').val();
    editedContact.email = $('#editEmail').val();
    editedContact.phone = $('#editPhone').val();
    $scope.contacts.splice(i, 1, editedContact);
    $scope.editing = !$scope.editing;
  }

  $scope.showSearch = function() {
    $scope.searching = !$scope.searching;
  }

});

