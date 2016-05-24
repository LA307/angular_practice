angular
  .module("UserStatus", [
    "UserStatus.Controllers",
    "UserStatus.Services",
    "ngRoute",
    "ngCookies"
  ])
  .config(config);

function config($routeProvider) {
  $routeProvider
    .when('/users/', {
      templateUrl: 'templates/users.html',
      controller: 'UsersController',
      controllerAs: 'usersCtrl'
    })
    .when('/user/:userId', {
      templateUrl: 'templates/user_details.html',
      controller: 'UserDetailsController',
      controllerAs: 'userDetailsCtrl'
    })
    .otherwise({
      redirectTo: '/users/'
    });
}