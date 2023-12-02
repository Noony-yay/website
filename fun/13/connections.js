'use strict';

const settings = {
  initialBoard: [
    [ 'לוי', 'כהן', 'דליה', 'שושנה' ],
    [ 'חפציבה', 'נורית', 'גד', 'חניתה' ],
    [ 'כומר', 'נעמי', 'דן', 'אשר' ],
    [ 'שאמאן', 'דפנה', 'יפה', 'נזיר' ],
  ],
  correctAssignments: {
    'שושנה': 0,
    'נורית': 0,
    'יפה': 0,
    'נעמי': 0,
    'אשר': 1,
    'גד': 1,
    'דן': 1,
    'לוי': 1,
    'כומר': 2,
    'שאמאן': 2,
    'נזיר': 2,
    'כהן': 2,
    'דליה': 3,
    'חפציבה': 3,
    'דפנה': 3,
    'חניתה': 3,
  },
  groupDescriptors: [
    ['זמרות זוכות פרס ישראל', 'שושנה, נורית, יפה, נעמי'],
    ['שבטי ישראל', 'אשר, גד, דן, לוי'],
    ['אנשי דת', 'כומר, שאמאן, נזיר, כהן'],
    ['קיבוצים בצפון', 'דליה, חפציבה, דפנה, חניתה'],
  ],
};

function initializeHtml() {
  for (let row = 0; row < 4; ++row) {
    for (let col = 0; col < 4; ++col) {
      $('.grid-container').append(
        $('<div class="grid-item">').append(
          $('<div class="item-text">')
        ).on('click', clickItem)
      );
    }
  }
  $('#submit-button').on('click', clickSubmit);
  // TODO: Load `settings` via ajax
  populateInitialBoard();
}

function populateInitialBoard() {
  for (let row = 0; row < 4; ++row) {
    for (let col = 0; col < 4; ++col) {
      $('.item-text').eq(row * 4 + col).text(
        settings.initialBoard[row][col]
      );
      // Adjust font size to avoid overflow.
      const curGridItem = $('.grid-item').eq(row * 4 + col);
      let fontSize = 17;
      while (curGridItem[0].scrollWidth > curGridItem[0].clientWidth) {
        curGridItem.css('font-size', fontSize);
        fontSize--;
        if (fontSize < 11) break;
      }
    }
  }
}

function clickItem(evt) {
  const gridItem = $(evt.currentTarget);
  if (gridItem.hasClass('selected-item')) {
    gridItem.removeClass('selected-item');
    return;
  }
  if ($('.selected-item').length < 4) {
    gridItem.addClass('selected-item');
  }
}

function clickSubmit() {
  if ($('.selected-item').length != 4) {
    alert('יש לבחור ארבע מילים ואז ללחוץ על "אישור".');
    return;
  }
  // Collect the correct assignment for each selected item.
  const submittedAssignments = $('.selected-item').map(
    (n, item) => settings.correctAssignments[$(item).text()]);
  // Check if the assignments of all selected items are equal.
  const solvedGroup = submittedAssignments[0];
  const allEqual = [...submittedAssignments].every(
    val => (val === solvedGroup));
  
  if (!allEqual) {
    // Incorrect submission.
    alert('טעות בידך :(');
    return;
  }

  // Correct submission.
  // TODO: Fancy animation magic.
  $('.selected-item').remove();
  const solvedRow = $('<div class="solved-row">')
  solvedRow.append($('<div class="solved-heading">')
    .text(settings.groupDescriptors[solvedGroup][0]));
  solvedRow.append($('<div class="solved-items">')
    .text(settings.groupDescriptors[solvedGroup][1]));
  const numRowsAlreadySolved = $('.solved-row').length;
  if (numRowsAlreadySolved == 0) {
    $('.grid-container').prepend(solvedRow);
  } else {
    solvedRow.insertAfter(
      `.grid-container > div:nth-child(${numRowsAlreadySolved})`);
  }

  if (numRowsAlreadySolved == 3) {
    // Victory!
    alert('כל הכבוד! ניצחת!');
  }
}

$(document).ready(initializeHtml);
