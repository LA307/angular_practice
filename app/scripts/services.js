angular.module("UserStatus.Services", [])
  
  .factory('UsersService', function($q, $http, $cookies) {

    var service = {};

    $cookies.remove('users_list');
    var users = [];

    // sorting Users by First Name
    var compareNames = function (a, b) {
      var textA = a.name.first.toUpperCase();
      var textB = b.name.first.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    };

    var fixStatuses = function (a) {
      a.status = a.status ? a.status : 'empty';
      return a;
    };
    
    service.getUsersList = function () {

      var deferred = $q.defer();

      if(users.length){
        deferred.resolve(users);
      } else {
        $http.get('../users.json').then(
            function (response) {
              users = response.data.sort(compareNames).map(fixStatuses);
              $cookies.put('users_list', JSON.stringify(users));
              deferred.resolve(users);
            },
            function () {
              deferred.reject();
            });
      } 
      return deferred.promise;
    };

    service.getUser = function (userId) {

      var deferred = $q.defer();
      if(users.length){
        deferred.resolve(users.filter(function (a) {
          return a.id === userId;
        }));
      } else {
        $http.get('../users.json').then(
          function (response) {
            users = response.data.sort(compareNames).map(fixStatuses);
            $cookies.put('users_list', JSON.stringify(users));
            deferred.resolve(users.filter(function (a) {
              return a.id === userId;
            }));
          },
          function () {
            deferred.reject();
          });
      }
      return deferred.promise;
    };

    service.updateUser =  function (user) {
      for (var i in users) {
        if (users[i].id == user.id) {
          users[i] = user;
          $cookies.put('users_list', JSON.stringify(users));
          break; //Stop this loop, we found it!
        }
      }
    };

    return service;
  })
  
  .factory('LocaleService', function($rootScope, $http, $cookies) {
    
    var locale = {},
        languages = ['en', 'de', 'uk'],
        default_lang = 'en';
  
    locale.langParams = {};
    // detect privious saved or browsers language
    var language = $cookies.get('language') || window.navigator.userLanguage || window.navigator.language;

    locale.getLanguages = function() {
      return languages;
    };
    
    locale.setLangParams = function(lang) {
 
      if(!lang || languages.indexOf(lang) === -1) {
        lang = default_lang;
      }
      $http.get('scripts/locale/' + lang + '.txt')
          .success(function(data) {
            locale.langParams = parseParameters(data);
            $cookies.put('language', lang);
            $cookies.put('language_parameters', locale.langParams);
            $rootScope.$broadcast('language_changed', locale.langParams);
          });
      return locale;
    };

    // init languages parameters by browser language (if present translation, else set english)
    locale.setLangParams(language);
    
    locale.getLangParams = function() {
      return locale.langParams;
    };

    locale.getLanguage = function() {
      return language;
    };
    
    // Parsing language parameters from .txt file formatted (name=value)
    var parseParameters = function(data) {

      var lines = data.split( /\r\n|\n\r|\n|\r/g );

      var arrLength = lines.length;
      var objectParams = {};
      var tmpItem = [];
      for (var i = 0; i < arrLength; i++) {
        tmpItem = lines[i].split('=');
        if(tmpItem.length === 2){
          objectParams[tmpItem[0]] = tmpItem[1];
        }
      }
      return objectParams;
    };

    return locale;
  });