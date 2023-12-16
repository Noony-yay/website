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

// List of tuples of words already revealed to be in the same quartet.
var hints = [];

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
  $('#hint-button').on('click', clickHint);
  $('#deselect-button').on('click', deselectAll);
  // TODO: Load `settings` via ajax
  populateInitialBoard();
  $('#instructions').on('click', () => {$('#instructions').hide();})
  $('#reveal-next-button').on('click', revealNextSolution);
  $('#show-lose-dialog-button').on('click', showLossDialog);
}

function deselectAll() {
  $('.selected-item').removeClass('selected-item');
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
  // Collect the correct assignment for each of the four selected items.
  const submittedAssignments = $('.selected-item').map(
    (n, item) => settings.correctAssignments[$(item).text()]).get();
  // Check if the assignments of all selected items are equal.
  const solvedGroup = submittedAssignments[0];
  const allEqual = submittedAssignments.every(
    val => (val === solvedGroup));
  
  if (!allEqual) {
    // Incorrect submission.
    const lifesLeft = $('.mistake-circle').length - 1;
    removeOneLife();
    if (lifesLeft > 0) {
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

function removeOneLife() {
  $('.mistake-circle:first').animate(
    {width: 0, height: 0},
    400,
    () => {$('.mistake-circle:first').remove();}
  );
}

/**
 * Take the four currently selected items, assume they are correct,
 * animate them to the top available row, and replace them with a
 * solved-item.
 * @param onFullySolved Function to call after animation is complete,
 *   but only if the board is now fully solved.
 */
function updateHtmlForSolvedRow(onFullySolved) {
  const submittedWords = $('.selected-item').map(
    (n, item) => $(item).text()).get();
  const submittedAssignments = submittedWords.map(
    text => settings.correctAssignments[text]);
  const solvedGroup = submittedAssignments[0];
  const allEqual = submittedAssignments.every(
    val => (val === solvedGroup));
  if (!allEqual) {
    alert('Internal error in updateHtmlForSolvedRow!');
    return;
  }

  // Remove any hints for the solved quartet.
  $('.selected-item').each(
    (n, item) => {
      removeHintConnector($(item).attr('row'), $(item).attr('col'));
    }
  );
  for (let i = hints.length - 1; i >= 0; i--) {
    if (submittedWords.some(word => hints[i].includes(word))) {
      hints.splice(i, 1);
    }
  }

  const numRowsAlreadySolved = $('.solved-row').length;

  // All remaining hints must be moved one row down, to make room
  // for the solved row.
  for (let i = hints.length - 1; i >= 0; i--) {
    for (let j = 0; j < hints[i].length; j++) {
      swapGridItems(
        numRowsAlreadySolved + i,     3 - j,
        numRowsAlreadySolved + i + 1, 3 - j);
      moveHintConnector(
        numRowsAlreadySolved + i,     3 - j,
        numRowsAlreadySolved + i + 1, 3 - j);
    }
  }

  // Animate items, except for the last row.
  if (numRowsAlreadySolved < 3) {
    $('.selected-item').each((n, item) => {
      item = $(item);
      swapGridItems(
          item.attr('row'), item.attr('col'), numRowsAlreadySolved, n);
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

function swapGridItems(row1, col1, row2, col2) {
  const item1 = $(`.grid-item[row="${row1}"][col="${col1}"]`);
  const item2 = $(`.grid-item[row="${row2}"][col="${col2}"]`);
  item1.attr('row', row2).attr('col', col2);
  item2.attr('row', row1).attr('col', col1);
}

function clickHint() {
  if ($('.selected-item').length != 2) {
    niceAlert('כדי לקבל רמז, יש לבחור שתי מילים ואז ללחוץ על "רמז".');
    return;
  }
  if ($('.mistake-circle').length <= 1) {
    niceAlert('לא ניתן לקבל רמז כי לא נותרו מספיק ניחושים.');
    return;
  }
  // Get the two selected words.
  const selectedItems = $('.selected-item');
  const selectedWords = selectedItems.map((n, item) => $(item).text()).get();
  deselectAll();
  if (settings.correctAssignments[selectedWords[0]] != 
      settings.correctAssignments[selectedWords[1]]) {
    removeOneLife();
    niceAlert(`המילים "${selectedWords[0]}" ו"${selectedWords[1]}" אינן שייכות לאותה רביעייה.`);
    return;
  }
  // Check whether one or both words have already been revealed.
  var matchWords = [-1, -1];  // Tuple already containing selectedWord[j].
  for (let i = 0; i < hints.length; ++i) {
    for (let j = 0; j < 2; ++j) {
      if (hints[i].includes(selectedWords[j])) {
        matchWords[j] = i;
      }
    }
  }
  if (matchWords[0] == matchWords[1] && matchWords[0] != -1) {
    niceAlert('כבר ידוע כי שתי מילים אלה נמצאות באותה רביעיה.');
    return;
  }
  removeOneLife();

  if (matchWords[0] == -1 && matchWords[1] == -1) {
    // Neither word has been revealed until now.
    const targetRow = hints.length + $('.solved-row').length;
    hints.push(selectedWords);
    for (let i = 0; i < 2; ++i) {
      swapGridItems(
        $(selectedItems[i]).attr('row'), $(selectedItems[i]).attr('col'),
        targetRow, i + 2);
    }
    addHintConnector(targetRow, 2);
  } else if (matchWords[0] >= 0 && matchWords[1] == -1) {
    // selectedWords[0] has been revealed, but not selectedWords[1].
    hints[matchWords[0]].push(selectedWords[1]);
    const targetRow = matchWords[0] + $('.solved-row').length;
    const targetCol = 4 - hints[matchWords[0]].length;
    swapGridItems(
      $(selectedItems[1]).attr('row'), $(selectedItems[1]).attr('col'),
      targetRow, targetCol);
    addHintConnector(targetRow, targetCol);
  } else if (matchWords[1] >= 0 && matchWords[0] == -1) {
    // selectedWords[1] has been revealed, but not selectedWords[0].
    hints[matchWords[1]].push(selectedWords[0]);
    const targetRow = matchWords[1] + $('.solved-row').length;
    const targetCol = 4 - hints[matchWords[1]].length;
    swapGridItems(
      $(selectedItems[0]).attr('row'), $(selectedItems[0]).attr('col'),
      targetRow, targetCol);
    addHintConnector(targetRow, targetCol);
  } else {
    // Both words have been revealed, but not to each other.
    const targetRow = matchWords[0] + $('.solved-row').length;
    for (let i = 0; i < hints[matchWords[1]].length; ++i) {
      hints[matchWords[0]].push(hints[matchWords[1]][i]);
      const source = $(`.grid-item:contains(${hints[matchWords[1]][i]})`);
      const sourceRow = source.attr('row');
      const sourceCol = source.attr('col');
      removeHintConnector(sourceRow, sourceCol);
      const targetCol = 4 - hints[matchWords[0]].length;
      swapGridItems(
        sourceRow, sourceCol, targetRow, targetCol);
      addHintConnector(targetRow, targetCol);
    }
    hints.splice(matchWords[1], 1);
  }
}

function addHintConnector(row, col) {
  const hintConnector = $('<div class="hint-connector fade-out">');
  hintConnector.attr('row', row).attr('col', col);
  $('.grid-container').append(hintConnector);
  setTimeout(() => {
    hintConnector.animate(
      {opacity: 1},
      250,
      () => {hintConnector.removeClass('fade-out').css('opacity', '');}
    );
  }, 250);
}

function removeHintConnector(row, col) {
  $(`.hint-connector[row="${row}"][col="${col}"]`).remove();
}

function moveHintConnector(sourceRow, sourceCol, targetRow, targetCol) {
  $(`.hint-connector[row="${sourceRow}"][col="${sourceCol}"]`)
    .attr('row', targetRow).attr('col', targetCol);
}

$(document).ready(initializeHtml);
