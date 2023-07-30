'use strict';

function gid(id) {
    return document.getElementById(id);
}


function cellClicked(clickedElementId) {
    var clickedElementClasses = gid(clickedElementId).className;
    if (clickedElementClasses != "cell empty") {
        return;
    }
    gid(clickedElementId).className = "cell x";
    var winner = getWinner(makeCellList());
    if (winner != null) {
        winnerDetected(winner);
        return;
    }
    gid("thinking-modal").style.display = "flex";
    setTimeout(() => {
        gid("thinking-modal").style.display = "none";
        gid("cell" + computersTurn(makeCellList())).className = "cell o";
        winner = getWinner(makeCellList());
        if (winner != null) {
            winnerDetected(winner);
            return;
        }
    }, 500);
}

/** Who won in the current board.
 * @returns: 'o' if O won, 'x' if X won, 't' if the game ended in a tie, and null if the game is not over yet.
 * @param board: list of current board state.
 */
function getWinner(board) {
    if (board[0] == board[1] && board[0] == board[2]) {
        if (board[0] != "e") {
            return board[0];
        }
    }
    if (board[3] == board[4] && board[3] == board[5]) {
        if (board[3] != "e") {
            return board[3];
        }
    }
    if (board[6] == board[7] && board[6] == board[8]) {
        if (board[6] != "e") {
            return board[6];
        }
    }
    if (board[0] == board[3] && board[0] == board[6]) {
        if (board[0] != "e") {
            return board[0];
        }
    }
    if (board[1] == board[4] && board[1] == board[7]) {
        if (board[1] != "e") {
            return board[1];
        }
    }
    if (board[2] == board[5] && board[2] == board[8]) {
        if (board[2] != "e") {
            return board[2];
        }
    }
    if (board[2] == board[4] && board[2] == board[6]) {
        if (board[2] != "e") {
            return board[2];
        }
    }
    if (board[0] == board[4] && board[0] == board[8]) {
        if (board[0] != "e") {
            return board[0];
        }
    }
    for (var i = 0; i < 9; i++) {
        if (board[i] == "e") {
            break;
        }
        if (i == 8) {
            return "t";
        }
    }
}

function who(cellNum) {
    // returns first letter of the second class - "o", "x" or "e" (for "empty")
    return gid("cell" + cellNum).className[5];
}
function winnerDetected(winner) {
    if (winner != "t") {
        gid("winner").innerHTML = winner;
        gid("won-modal").style.display = "flex";
    }
    else {
        gid("won-text").innerHTML = "Tie!";
        gid("won-modal").style.display = "flex";
    }
}

/**
 * If the computer can win with one step, it takes this step.
 * If not, it checks all options.
 * For each option, if the player can win, it won't take the step that leads to this option.
 * Then, it chooses randomly from the options that don't lead to the player winning.
 * @param cellsNow - list of the current board state.
 * @returns The number of the cell to play (1-9).
 */
function computersTurn(cellsNow) {
    var cellsAfter = [...cellsNow];
    var tieMoves = [];
    for (var i = 0; i < 9; i++) {
        if (cellsAfter[i] != "e") {
            continue;  // Can't put an O here.
        }
        cellsAfter[i] = "o";
        var currentOutcome = outcome(cellsAfter, 'x', 7);
        if (currentOutcome == "o") {
            console.log('Definite win!')
            return i + 1;
        }
        else {
            if (currentOutcome == "t") {
                tieMoves.push(i + 1);
            }
        }
        cellsAfter = [...cellsNow];
    }
    if (tieMoves.length == 0) {
        // If I will definitely lose, I won't tell the player so maybe they will be stupid!
        console.log('Oh no, I lose.')
        return randomEmptyCell(cellsNow);
    }
    console.log('I cannot win, but I can do these things to get a tie: ' + tieMoves)
    return tieMoves[Math.floor(Math.random() * tieMoves.length)];
}

/** Who can win in the current state.
 * @returns:
 * 'o' if o can force a win
 * 'x' if x can force a win
 * 't' if neither can force a win within the depth specified
 * @param cellsNow: list of current board
 * @param whoseTurn: 'x' or 'o'
 * @param depth: how many turns to check
 */
function outcome(cellsNow, whoseTurn, depth) {
    var cellsAfter = [...cellsNow];
    var innerOutcomeCounts = {'o': 0, 'x': 0, 't': 0};
    var opponent = (whoseTurn == 'o' ? 'x' : 'o');
    for (var i = 0; i < 9; i++) {
        if (cellsAfter[i] != "e") {
            continue;  // Can't put anything here.
        }
        cellsAfter[i] = whoseTurn;
        var winner = getWinner(cellsAfter);
        if (winner != null && winner != 't') {
            return winner;
        }
        if (depth > 1) { // recursion!
            innerOutcomeCounts[outcome(cellsAfter, opponent, depth - 1)] += 1;
        }
        cellsAfter = [...cellsNow];
    }
    console.log(innerOutcomeCounts);
    if (innerOutcomeCounts[whoseTurn] > 0) {
        return whoseTurn;
    }
    if (innerOutcomeCounts[whoseTurn] == 0 &&
        innerOutcomeCounts['t'] == 0 &&
        innerOutcomeCounts[opponent] > 0) {
        return opponent;
    }
    return 't';
}

/**
 * Returns a random number in the range 1-9.
 */
function oneToNine() {
    //chooses an int from 1 to 9
    var num = Math.floor(Math.random() * 9) + 1;
    return num;
}
function randomEmptyCell(board) {
    var randomCellNum = oneToNine();
    while (board[randomCellNum - 1] != "e") {
        // continues until it finds an empty cell
        randomCellNum = oneToNine();
    }
    // when it finds an empty cell - returns the cell's id
    return randomCellNum;
}

function makeCellList() {
    // makes a list of all the cells
    var cellList = [];
    for (var i = 1; i <= 9; i++) {
        cellList.push(who(i));
    }
    return cellList;
}

function assert(condition) {
    if (!condition) {
        throw 'Test failed!';
    }
}

function runTests() {
    assert(computersTurn(
        ["x", "x", "e", "x", "x", "x", "o", "o", "x"]) == 3);
    assert(outcome(
        ["o", "e", "o", "e", "x", "o", "e", "x", "x"], 'o', 1) == 'o');
    assert(outcome(
        ["o", "e", "o", "e", "x", "o", "e", "x", "x"], 'x', 1) == 'x');
    assert(outcome(
        ["x", "e", "e", "e", "x", "e", "e", "e", "o"], 'o', 1) == 't');
    assert(outcome(
        ["x", "e", "e", "e", "x", "e", "e", "e", "o"], 'x', 1) == 't');
    assert(outcome(
        ["o", "e", "o", "e", "x", "o", "e", "x", "x"], 'o', 2) == 'o');
    assert(outcome(
        ["o", "e", "o", "e", "x", "o", "e", "x", "x"], 'x', 2) == 'x');
    assert(outcome(
        ["x", "e", "e", "e", "x", "e", "e", "e", "o"], 'o', 2) == 't');
    assert(outcome(
        ["x", "e", "e", "e", "x", "e", "e", "e", "o"], 'x', 2) == 't');
    assert(outcome(
        ["o", "e", "o", "e", "x", "e", "e", "e", "e"], 'x', 2) == 't');
    assert(outcome(
        ["o", "e", "o", "e", "x", "e", "x", "e", "o"], 'x', 2) == 'o');
    assert(outcome(
        ["o", "e", "x", "e", "o", "e", "x", "e", "e"], 'x', 2) == 't');
}

runTests();
