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
    var winner = getWinner();
    if (winner != null) {
        winnerDetected(winner);
        return;
    }
    gid("thinking-modal").style.display = "flex";
    setTimeout(() => {
        gid("thinking-modal").style.display = "none";
        gid(computersTurn()).className = "cell o";
        winner = getWinner();
        if (winner != null) {
            winnerDetected(winner);
            return;
        }
    }, 500);
}

function getWinner() {
    for (var i = 1; i <= 9; i++) {
        if (who(i) == "e") {
            break;
        }
        if (i == 9) {
            return "t";
        }
    }
    if (who(1) == who(2) && who(1) == who(3)) {
        if (who(1) != "e") {
            return who(1);
        }
    }
    if (who(4) == who(5) && who(4) == who(6)) {
        if (who(4) != "e") {
            return who(4);
        }
    }
    if (who(7) == who(8) && who(7) == who(9)) {
        if (who(7) != "e") {
            return who(7);
        }
    }
    if (who(1) == who(4) && who(1) == who(7)) {
        if (who(1) != "e") {
            return who(1);
        }
    }
    if (who(2) == who(5) && who(2) == who(8)) {
        if (who(2) != "e") {
            return who(2);
        }
    }
    if (who(3) == who(6) && who(3) == who(9)) {
        if (who(3) != "e") {
            return who(3);
        }
    }
    if (who(3) == who(5) && who(3) == who(7)) {
        if (who(3) != "e") {
            return who(3);
        }
    }
    if (who(1) == who(5) && who(1) == who(9)) {
        if (who(1) != "e") {
            return who(1);
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

function computersTurn() {
    var randomCellNum = oneToNine();
    while (who(randomCellNum) != "e") {
        // continues until it finds an empty cell
        randomCellNum = oneToNine();
    }
    // when it finds an empty cell - returns the cell's id
    return "cell" + randomCellNum;
}
function oneToNine() {
    //chooses an int from 1 to 9
    var num = Math.floor(Math.random() * 9) + 1;
    return num;
}