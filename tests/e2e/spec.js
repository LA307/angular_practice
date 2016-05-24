'use strict';

/*describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    browser.get('https://angularjs.org');

    element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    element(by.css('[value="add"]')).click();

    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    todoList.get(2).element(by.css('input')).click();
    var completedAmount = element.all(by.css('.done-true'));
    expect(completedAmount.count()).toEqual(2);
  });
});*/


describe('UsersStatus list', function() {
  it('should add a todo', function() {
    browser.get('http://127.0.0.1:8080/');


    var todoList = element.all(by.repeater('user in filteredUsers'));
    // 10 users loaded
    expect(todoList.count()).toEqual(10);
    
    element(by.css('input[type=checkbox]')).click();
    element(by.css('#search')).sendKeys('bl');

    expect(todoList.count()).toEqual(2);


    
/*    element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    element(by.css('[value="add"]')).click();

    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    todoList.get(2).element(by.css('input')).click();
    var completedAmount = element.all(by.css('.done-true'));
    expect(completedAmount.count()).toEqual(2);*/
  });
});
/*

describe('UserStatus e2e tests', function() {
  beforeEach(function() {
    browser().navigateTo('http://127.0.0.1:8080/');
  });

  describe('Main view - UsersList', function() {
    //browser.get('http://127.0.0.1:8080');
    it('should display the search activator', function() {
      expect(element('input[type=text]').html()).toBeDefined();
    });
*/

/*
    it('should display the correct route', function() {
      var a = browser().location().path();
      console.log(a);
       expect(a).toBe('#/users/');
      expect(browser.getCurrentUrl()).toMatch('/#/users/');
    });
  
    it('Should have 4 posts', function() {
      var posts = element.all(by.repeater('post in posts'));
      expect(posts.count()).toBe(4); // we have 4 hard coded posts
    });*/
  
/*    it('Should be 10 posts', function() {
      var posts = element.all("img.avatar");
      expect(posts.count()).toBe(10);*/
      /*posts.first().then(function(postElem) {
        postElem.findElement(by.tagName('a')).then(function(a) {
          a.click(); //click the title link of 1st post
          expect(ptor.getCurrentUrl()).toMatch('/posts/1/simple-title1');
        });
      });*/
 /*   });
    
  });
});*/