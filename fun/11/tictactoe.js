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
    var cellsAfterD1 = [...cellsNow];
    var okayMoves = [];
    for (var i = 0; i < 9; i++) {
        if (cellsAfterD1[i] != "e") {
            continue;  // Can't put an O here.
        }
        cellsAfterD1[i] = "o";
        if (getWinner(cellsAfterD1) == "o") {
            console.log('Definite win!')
            return i + 1;
        }
        // check if the player can win.
        // if the player can win, then don't do this.
        // if not, we might want to do this.
        var canPlayerWin = false;
        for (var j = 0; j < 9; j++) {
            if (cellsAfterD1[j] != "e") {
                continue;  // Can't put an X here.
            }
            var cellsAfterD2 = [...cellsAfterD1];
            cellsAfterD2[j] = "x";
            if (getWinner(cellsAfterD2) == "x") {
                canPlayerWin = true;
            }
        }
        if (!canPlayerWin) {
            okayMoves.push(i + 1);
        }
        cellsAfterD1 = [...cellsNow];
    }
    if (okayMoves.length == 0) {
        // If I will definitely lose, I won't tell the player so maybe they will be stupid!
        console.log('Oh no, I lose.')
        return randomEmptyCell(cellsNow);
    }
    console.log('I dont really know who will win. Okay moves: ' + okayMoves)
    return okayMoves[Math.floor(Math.random() * okayMoves.length)];
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
    assert(computersTurn(["x", "x", "e", "e", "x", "x", "o", "o", "e"]) == 9);
    assert(computersTurn(["x", "x", "e", "x", "x", "x", "o", "o", "x"]) == 3);
}

runTests();
