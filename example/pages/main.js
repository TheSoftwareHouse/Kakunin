'use strict';

const { BasePage } = require('kakunin');

class MainPage extends BasePage {
  constructor() {
    super();

    this.url = '/examples/react/#/';

    this.addTodoForm = $('.todoapp');

    this.todoInput = $('input.new-todo');

    this.todos = $$('.todo-list .view');
    this.todoLabel = by.css('label');

    this.todo = this.todos.get(0);

    this.removeTodoButton = this.todo.$('button.destroy');
    this.completeTodoButton = this.todo.$('input.toggle');
    this.toBeCompletedCount = $('.todo-count strong');

    this.showAllButton = $('.filters a[href="#/"]');
    this.showActiveButton = $('.filters a[href="#/active"]');
    this.showCompletedButton = $('.filters a[href="#/completed"]');
    this.clearTodosButton = $('button.clear-completed');
  }
}

module.exports = new MainPage();
