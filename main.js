'use strict'; 

var app = angular.module('MyApp', ['ngStorage']);
var i;

app.controller('mainCtrl', function($scope, $localStorage, $sessionStorage) {
  $scope.$storage = $localStorage;
  if(!$scope.$storage.contacts) {
    $scope.$storage = $localStorage.$default({
      contacts: [
        { name: 'Sally', email: 'sally@email.com', phone: '555-347-9876' },
        { name: 'Bill', email: 'bill@email.com', phone: '555-983-4472' },
        { name: 'John', email: 'john@email.com', phone: '555-393-4921' },
        { name: 'Lisa', email: 'lisa@email.com', phone: '555-742-3390' }
      ]
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

  $scope.startEdit = function(contact) {
    $scope.editing = !$scope.editing;
    $('#editName').val(contact.name);
    $('#editEmail').val(contact.email);
    $('#editPhone').val(contact.phone);
    i = $scope.contacts.indexOf(contact);
  }

  $scope.sortContact = function(key) {
    $scope.sortText = $scope.sortText === key ? ('-' + key) : key;
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

