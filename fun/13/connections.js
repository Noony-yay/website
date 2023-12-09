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
  $('#reveal-next-button').on('click', revealNextSolution);
  $('#show-lose-dialog-button').on('click', showLossDialog);
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
    niceAlert('יש לבחור ארבע מילים ואז ללחוץ על "אישור".');
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
    $('.mistake-circle:first').animate(
      {width: 0, height: 0},
      400,
      () => {$('.mistake-circle:first').remove();}
    );
    if ($('.mistake-circle').length > 1) {
      niceAlert('טעות בידך :(');
    } else {
      $('#no-mistakes-left').show();
      $('.mistake-container').css('font-weight', 300);
      $('.play-button').hide();
      $('.reveal-answers-mode').show();
    }
    return;
  }

  // Correct submission.
  updateHtmlForSolvedRow(showWinDialog);
}

/**
 * Take the four currently selected items, assume they are correct,
 * animate them to the top available row, and replace them with a
 * solved-item.
 * @param onFullySolved Function to call after animation is complete,
 *   but only if the board is now fully solved.
 * @returns 
 */
function updateHtmlForSolvedRow(onFullySolved) {
  const submittedAssignments = $('.selected-item').map(
    (n, item) => settings.correctAssignments[$(item).text()]);
  const solvedGroup = submittedAssignments[0];
  const allEqual = [...submittedAssignments].every(
    val => (val === solvedGroup));
  if (!allEqual) {
    alert('Internal error in updateHtmlForSolvedRow!');
    return;
  }
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
        onFullySolved();
      }
    }, 350);
  }, numRowsAlreadySolved < 3 ? 500 : 0);
  return;
}

function revealNextSolution() {
  $('#reveal-next-button').text('המשך >>');
  $('.selected-item').removeClass('selected-item');
  // Choose which category to reveal this time.
  const revealedCategory =
      settings.correctAssignments[$('.grid-item:first').text()];
  // Select all items from the correct category.
  $('.grid-item').each((n, item) => {
    item = $(item);
    if (settings.correctAssignments[item.text()] == revealedCategory) {
      item.addClass('selected-item');
    }
  });
  updateHtmlForSolvedRow(() => {
    $('.reveal-answers-mode').hide();
    $('#show-lose-dialog-button-wrapper').show();
  });
}

function showLossDialog() {
  showDialog('הפסדתם :(', 'לא נורא, נסו שוב בשבוע הבא.');
}

function showWinDialog() {
  showDialog('נצחון!', 'כל הכבוד! חזרו אלינו בשבוע הבא.');
}

function showDialog(title, text) {
  const dialog = $('<div class="dialog">');
  dialog
      .append($('<div class="dialog-frame">')
      .append($('<div class="dialog-content">')
        .append($('<div class="dialog-title">').text(title))
        .append($('<div class="dialog-text">').text(text))
        .append($('<div class="dialog-buttons">')
          .append($('<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">')
            .text('שיתוף')
            .on('click', () => {dialog.hide();})
          )
        )
      )
    );
  $('body').append(dialog);
}

function niceAlert(text) {
  $('#alert-text').text(text);
  $('#alert').css('opacity', 1).show();
  setTimeout(() => {
    $('#alert').animate({opacity: 0}, {complete: () => $('#alert').hide()});
  }, 2500);
}

$(document).ready(initializeHtml);
