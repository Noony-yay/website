function gid(id) {
    return document.getElementById(id);
}


var turn = "x";
function cellClicked(clickedElementId) {
    var clickedElementClasses = gid(clickedElementId).className;
    if (clickedElementClasses != "cell empty") {
        return;
    }
    gid(clickedElementId).className = "cell " + turn;
    turn = (turn == 'x' ? 'o' : 'x');
    var winner = getWinner();
    if (winner == null) {
        return;
    }
    winnerDetected(winner);
}

function getWinner() {
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
    gid("winner").innerHTML = winner;
    gid("won-modal").style.display = "flex";
}