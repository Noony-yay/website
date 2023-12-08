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
        $('<div>')
          .addClass('grid-item')
          .attr('row', row)
          .attr('col', col)
          .append($('<div class="item-text">'))
          .on('click', clickItem)
      );
    }
  }
  $('#submit-button').on('click', clickSubmit);
  $('#deselect-button').on('click', () => {
    $('.selected-item').removeClass('selected-item');
  });
  // TODO: Load `settings` via ajax
  populateInitialBoard();
  $('#instructions').on('click', () => {$('#instructions').hide();})
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
        curGridItem
          .css('font-size', `${fontSize}px`)
          .css('line-height', `${fontSize+1}px`);
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
    if ($('.mistake-circle').length > 1) {
      alert('טעות בידך :(');
      $('.mistake-circle:first').remove();
      return;
    }
    showLossDialog();
    return;
  }

  // Correct submission.
  const numRowsAlreadySolved = $('.solved-row').length;
  // Animate items, except for the last row.
  if (numRowsAlreadySolved < 3) {
    $('.selected-item').each((n, item) => {
      item = $(item);
      const swapItem = $(
          `.grid-item[row="${numRowsAlreadySolved}"][col="${n}"]`);
      swapItem.attr('row', item.attr('row')).attr('col', item.attr('col'));
      item.attr('row', numRowsAlreadySolved).attr('col', n);
    });
  }
  const solvedRow = $('<div class="solved-row fade-out">')
  .attr('row', numRowsAlreadySolved)
  .append($('<div class="solved-heading">')
    .text(settings.groupDescriptors[solvedGroup][0]))
  .append($('<div class="solved-items">')
    .text(settings.groupDescriptors[solvedGroup][1]));
  $('.grid-container').append(solvedRow);
  setTimeout(() => {
    $('.selected-item').addClass('fade-out');
    $('.solved-row').removeClass('fade-out');
    // Show solved row.
    setTimeout(() => {
      $('.selected-item').remove();
      if (numRowsAlreadySolved == 3) {
        showWinDialog();
      }
    }, 350);
  }, numRowsAlreadySolved < 3 ? 750 : 0);
  return;
}

function showLossDialog() {
  showDialog('הפסדתם :(', 'לא נורא, נסו שוב בשבוע הבא.');
}

function showWinDialog() {
  showDialog('נצחון!', 'כל הכבוד! חזרו אלינו בשבוע הבא.');
}

function showDialog(title, text) {
  const dialog = $('<div class="dialog">')
    .append($('<div class="dialog-frame">')
      .append($('<div class="dialog-content">')
        .append($('<div class="dialog-title">').text(title))
        .append($('<div class="dialog-text">').text(text))
        .append($('<div class="dialog-button">').text('אישור'))
      )
    );
  $('body').append(dialog);
}

$(document).ready(initializeHtml);
