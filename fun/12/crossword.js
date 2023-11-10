'use strict';

// TODO: add grid numbers from left to right in the end

const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';    

class Placement {
    constructor(word, row, column, direction) {
        this.word = word;
        this.row = row;
        this.column = column;
        this.direction = direction;
    }
}

/**
 * creates an empty grid
 */
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

/**
 * generates html for the given grid
 */
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

/**
 * Chooses a random word, places it on the grid and adds the Placement
 * to the Placements list.
 * The grid is assumed to have previously been empty.
 * @param {*} grid empty grid to which the word is added
 */
function addFirstWord(grid, placements) {
    for (var attempt = 0; attempt < 1000; attempt++) {
        var chosenWord = words[getRandomWord()];
        var chosenWordEnglish = chosenWord.english;
        if (chosenWordEnglish.length <= grid[0].length) {
            var chosenRow = getRandomInt(grid.length);
            var chosenColumn = getRandomInt(grid[0].length - chosenWordEnglish.length);
            for (var i = 0; i < chosenWordEnglish.length; i++) {
                grid[chosenRow][chosenColumn + i].letter = chosenWordEnglish[i];
            }
            var targetPlacement = new Placement(chosenWord, chosenRow, chosenColumn, HORIZONTAL);
            placements.push(targetPlacement);
            return;
        }
    }
    alert('Error: could not construct crossword');
}

/**
 * Checks if given Placement can be added to the grid without interfering
 * with other words.
 * @returns true or false
 */
function isValidPlacement(placement, grid) {
    if(placement.row < 0) {
        return false;
    }
    if(placement.column < 0) {
        return false;
    }
    if (placement.direction == VERTICAL) {
        if(placement.row + placement.word.english.length > grid.length) {
            return false;
        }
        if(placement.column >= grid[0].length) {
            return false;
        }
        for(var i = 0; i < placement.word.english.length; i++) {
            const targetRow = placement.row + i;
            const targetColumn = placement.column;
            const targetLetter = grid[targetRow][targetColumn].letter;
            if(targetLetter != placement.word.english[i] && targetLetter != '') {
                return false;
            }
        }
    } else {
        if(placement.column + placement.word.english.length > grid[0].length) {
            return false;
        }
        if(placement.row >= grid.length) {
            return false;
        }
        for(var i = 0; i < placement.word.english.length; i++) {
            const targetRow = placement.row;
            const targetColumn = placement.column + i;
            const targetLetter = grid[targetRow][targetColumn].letter;
            if(targetLetter != placement.word.english[i] && targetLetter != '') {
                return false;
            }
        }
    }
    return true;
}

function addSecondWord(grid, placements) {
    for (var attempt = 0; attempt < 1000; attempt++) {
        var chosenWord = words[getRandomWord()];
        var chosenWordEnglish = chosenWord.english;
        if (chosenWordEnglish.length > grid.length) {
            continue;
        }
        for (var i = 0; i < chosenWordEnglish.length; i++) {
            if (!placements[0].word.english.includes(chosenWordEnglish[i])) {
                continue;
            }
            const matchingLetterIndex = placements[0].word.english.indexOf(chosenWordEnglish[i]);
            const targetColumn = placements[0].column + matchingLetterIndex;
            const targetRow = placements[0].row - i;
            const targetPlacement = new Placement(chosenWord, targetRow, targetColumn, VERTICAL);
            if(!isValidPlacement(targetPlacement, grid)) {
                continue;
            }
            for(var j = 0; j < chosenWordEnglish.length; j++) {
                grid[targetRow + j][targetColumn].letter = chosenWordEnglish[j];
            }
            placements.push(targetPlacement);
            return;
        }
    }
    alert('Error: could not construct crossword');
}

function main() {
    for(var i = 0; i < words.length; i++){
        words[i].english = words[i].english.toUpperCase();
    }
    var wordPlacements = [];
    var grid = createGrid(6, 6);
    addFirstWord(grid, wordPlacements);
    addSecondWord(grid, wordPlacements);
    gridToHtml(grid);
}