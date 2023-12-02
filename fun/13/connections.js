'use strict';

const initialSetting = [
  []
];

function initializeHtml() {
  for (let row = 1; row <= 4; ++row) {
    for (let col = 1; col <= 4; ++col) {
      $('.grid-container').append(
        $('<div class="grid-item">').append(
          $('<div class="item-text">')
        )
      );
    }
  }
}

$(document).ready(initializeHtml);
