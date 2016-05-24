angular.module("UserStatus.Controllers", [])
    
  .controller("UsersController", function(UsersService){
    var that = this;
    
    that.loadingProcess = true;
    that.loadError = false;

    UsersService.getUsersList().then(function(userslist){
      that.users = userslist;
      that.loadingProcess = false;
    }).catch(function(err){
      that.loadError = true;
      that.loadingProcess = false;
    });
  })

  .controller("UserListController", function($scope, $location, LocaleService){
    var that = this;
    
    that.localeParams = LocaleService.getLangParams();
    $scope.$on('language_changed', function(event, params) {
      that.localeParams = params;
    });

    that.editUser = function(id) {
      $location.path('/user/' + id);
    };
  })
  
  .controller('UserDetailsController', function($scope, $routeParams, UsersService, $location, $timeout){
    var that = this;
    that.userId = $routeParams.userId;
    that.user = {};
    that.changed = false;
    that.savedUser = {};

    that.loadingProcess = true;
    that.loadError = false;

    that.statuses = [
      "online",
      "offline"
    ];

    UsersService.getUser(that.userId).then(function(user){
      that.user = user[0];
      that.savedUser.status = user[0].status;
      that.loadingProcess = false;
    }).catch(function(){
      that.loadError = true;
      that.loadingProcess = false;
      $timeout(function() {
        that.gotoUsers();
      }, 3000);
    });

    that.saveChanges = function() {
      UsersService.updateUser(that.user);
      that.savedUser.status = that.user.status;
      that.changed = false;
    };
    
    that.gotoUsers = function() {
      that.user.status = that.savedUser.status;
      $location.path('/user/');
    };
  
  })

  .controller("LocaleController", function($scope, LocaleService){
    var that = this;
    that.currentLanguage = LocaleService.getLanguage();
    that.languages = LocaleService.getLanguages();
    that.localeParams = LocaleService.getLangParams();
    that.setLocale = function(lang) {
      that.localeParams = LocaleService.setLangParams(lang);
      that.currentLanguage = lang;
    };
    $scope.$on('language_changed', function(event, params) {
        that.localeParams = params;
    });
  });