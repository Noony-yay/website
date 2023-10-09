'use strict';

function createGrid(numRows, numColumns) {
    var grid = [];
    for (var row = 0; row < numRows; row++) {
        var currentRow = [];
        for (var column = 0; column < numColumns; column++) {
            currentRow.push({'number': 0, 'letter': ''});
        }
        grid.push(currentRow);
    }
    return grid;
}

function createTestCrossword() {
    var grid = createGrid(3, 4);
    grid[0][0].letter = 'A';
    grid[0][0].number = '1';
    grid[1][0].letter = 'L';
    grid[1][0].number = '2';
    grid[2][0].letter = 'L';
    grid[1][1].letter = 'O';
    grid[1][2].letter = 'U';
    grid[1][3].letter = 'D';
    return grid;
}

function gridToHtml(grid) {
    for (var row = 0; row < grid.length; row++) {
        for (var column = 0; column < grid[row].length; column++) {
            var cell = $('<div class="cell">');
            if (grid[row][column].number != 0) {
                var numberDiv = $('<div class="number">');
                numberDiv.text(grid[row][column].number);
                cell.append(numberDiv);
            }
            if (grid[row][column].letter != '') {
                cell.addClass('letter-cell');
                var letterDiv = $('<div class="letter">');
                letterDiv.text(grid[row][column].letter);
                cell.append(letterDiv);
            }
            $('#crossword').append(cell); 
        }
    }
    $('#crossword').css('grid-template-columns', 'repeat(' + grid[0].length + ', 50px');
    $('#crossword').css('grid-template-rows', 'repeat(' + grid.length + ', 50px');    
}
