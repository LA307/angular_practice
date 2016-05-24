angular
  .module("UserStatus")
    .directive("gravatar", function () {
      return {
        restrict: 'E',
        templateUrl: '../templates/gravatar.html',
        replace: true,
        scope: {
          photoSrc: '='
        }
      };
    })
    .directive("userList", function () {
      return {
        restrict: 'E',
        templateUrl: '../templates/userlist.html',
        controller: 'UserListController',
        controllerAs: 'userListCtrl',
        scope: {
           users: "=",
           searchText: "=",
           enableSearch: "=",
           localeParams: "="
        }
      };
    });