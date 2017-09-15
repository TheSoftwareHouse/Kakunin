'use strict';

const { BasePage } = require('kakunin');

class DragAndDropPage extends BasePage {
  constructor() {
    super();

    this.url = '/drag-and-drop';

    this.kittens = $('#draggable');
    this.target = $('#droppable');
    this.kittensInsideTarget = $('.ui-state-highlight');
  }
}

module.exports = new DragAndDropPage();
