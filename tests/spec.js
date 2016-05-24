describe('Testing a UserList Controller that uses a Promise', function () {
  var $scope;
  var $q;
  var deferred;
  var UsersController;
  
  beforeEach(module('UserStatus'));
  
  beforeEach(inject(function ($httpBackend) {
    httpBackend = $httpBackend;
  }));
  
  beforeEach(inject(function($controller, _$rootScope_, _$q_, UsersService) {
    $q = _$q_;
    $scope = _$rootScope_.$new();

    // We use the $q service to create a mock instance of defer
    deferred = _$q_.defer();
   
    // Use a Jasmine Spy to return the deferred promise
    spyOn(UsersService, 'getUsersList').and.returnValue(deferred.promise);

    // Init the controller, passing our spy service instance
    UsersController = $controller('UsersController', {
      $scope: $scope,
      UsersService: UsersService
    });
    httpBackend.expectGET("templates/users.html").respond({ hello: 'world'})
  }));

  it('UsersService.getUsersList resolve promise', function () {
    // Setup the data we wish to return for the .then function in the controller
    var res = deferred.resolve([{ id: 1 }, { id: 2 }]);

    // We have to call apply for this to work
    $scope.$apply();
   
    // Since we called apply, not we can perform our assertions
    expect(UsersController.users).not.toBe(undefined);
    expect(UsersController.loadError).toBe(false);
  });

  it('UsersService.getUsersList reject promise', function () {
    // This will call the .catch function in the controller
    deferred.reject();

    // We have to call apply for this to work
    $scope.$apply();
    
    // Since we called apply, not we can perform our assertions
   
    expect(UsersController.users).toBe(undefined);
    expect(UsersController.loadError).toBeTruthy();
  });

});




describe("Testing a UserService, sorting users", function () {
  var userService, httpBackend;

  beforeEach(module('UserStatus'));

  beforeEach(inject(function (UsersService, $httpBackend) {
    userService = UsersService;
    httpBackend = $httpBackend;
  }));

  it("should do something", function () {
    httpBackend.expectGET("templates/users.html").respond({ hello: 'world'})
    httpBackend.whenGET("../users.json").respond(
        [
          {
            "id" : "89",
            "status" : "offline",
            "name": {
              "title": "mr",
              "first": "Wanuel",
              "last": "calvo"
            },
            "email": "manuel.calvo@example.com",
            "username": "ticklishgoose153",
            "picture": "https://randomuser.me/api/portraits/thumb/men/89.jpg"
          },
          {
            "id" : "55",
            "status" : "online",
            "name": {
              "title": "ms",
              "first": "Dennifer",
              "last": "mendoza"
            },
            "email": "jennifer.mendoza56@example.com",
            "username": "redgoose941",
            "picture": "http://api.randomuser.me/portraits/women/55.jpg"
          },
          {
            "id" : "66",
            "status" : "",
            "name": {
              "title": "ms",
              "first": "Ara",
              "last": "james"
            },
            "email": "tara.james77@example.com",
            "username": "tinywolf933",
            "picture": "http://api.randomuser.me/portraits/women/66.jpg"
          }]
    );
    userService.getUsersList().then(function(userslist) {
      // check if empty status has value "empty"
      expect(userslist[0].status).toBe("empty");

      // check if users are sorted by name.first
      expect(userslist[0].name.first <= userslist[1].name.first && userslist[1].name.first <= userslist[2].name.first).toBeTruthy();
    });
    httpBackend.flush();
  });

});
