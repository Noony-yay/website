function allowDrop(event) {
    event.preventDefault();
}
function dragStart(event) {
    event.dataTransfer.setData("text", event.target.parentElement.id);
}
function getMiddleId(idSource, idTarget) {
    var sourceRow = parseInt(idSource[4]);
    var targetRow = parseInt(idTarget[4]);
    var sourceColumn = parseInt(idSource[5]);
    var targetColumn = parseInt(idTarget[5]);
    if (sourceRow == targetRow) {
        if (sourceColumn - targetColumn == 2) {
            var middleId = 'slot' + sourceRow + (sourceColumn - 1);
            var middle = document.getElementById(middleId);
            if (middle.classList[0] == 'peg') {
                return middleId;
            }
            return '';
        }
        if (sourceColumn - targetColumn == -2) {
            var middleId = 'slot' + sourceRow + (sourceColumn + 1);
            var middle = document.getElementById(middleId);
            if (middle.classList[0] == 'peg') {
                return middleId;
            }
            return '';
        }
        return '';
    }
    if (sourceColumn == targetColumn) {
        if (sourceRow - targetRow == 2) {
            var middleId = 'slot' + (sourceRow - 1) + sourceColumn;
            var middle = document.getElementById(middleId);
            if (middle.classList[0] == 'peg') {
                return middleId;
            }
            return '';
        }
        if (sourceRow - targetRow == -2) {
            var middleId = 'slot' + (sourceRow + 1) + sourceColumn;
            var middle = document.getElementById(middleId);
            if (middle.classList[0] == 'peg') {
                return middleId;
            }
            return '';
        }
        return '';
    }
    return '';
}
function drop(event) {
    event.preventDefault();
    var idSource = event.dataTransfer.getData("text");
    var target = event.target.parentElement;
    var idTarget = target.id;
    var source = document.getElementById(idSource);
    var middleId = getMiddleId(idSource, idTarget);
    var pegsLeft = document.getElementById('pegs-left');
    var pegsListLength = document.getElementsByClassName('peg').length;
    if (middleId != '') {
        target.outerHTML = '<div id="' + idTarget + '" class="peg slot" draggable="true" ondragstart="dragStart(event);"><img src="peg2.png"/></div>';
        source.outerHTML = '<div id="' + idSource + '" class="empty-slot slot" ondragover="allowDrop(event);" ondrop="drop(event);"><img src="emptySlot.png"/></div>';
        document.getElementById(middleId).outerHTML =
            '<div id="' + middleId + '" class="empty-slot slot" ondragover="allowDrop(event);" ondrop="drop(event);"><img src="emptySlot.png"/></div>';
    }
    if (pegsListLength == 2) {
        pegsLeft.innerHTML = 'You have 1 peg left!';
    }
    else {
        pegsLeft.innerHTML = 'You have ' + (pegsListLength - 1) + ' pegs left!';
    }
    if (
        !Array.from(document.getElementsByClassName('peg')).some(isAbleToMove)
       )
    {
        var gameOverDiv = document.getElementById('gameOver');
        var gameOverTitle = document.getElementById('gameOverTitle')
        var gameOverText = document.getElementById('gameOverText')
        gameOverDiv.style.display = 'flex';
        if (pegsListLength == 2) {
            gameOverTitle.innerHTML = 'CONGRATULATIONS!';
            gameOverText.innerHTML = "You've got only 1 peg left! Amazing!"
        }
        else {
            gameOverTitle.innerHTML = 'NO MOVES LEFT!'
            gameOverText.innerHTML = "You've got " + (pegsListLength - 1) + " pegs left."
        }
    }
}
function isAbleToMove(peg) {
    var pegId = peg.id;
    var pegRow = parseInt(pegId[4]);
    var pegColumn = parseInt(pegId[5]);
    var nextTo = document.getElementById('slot' + (pegRow - 1) + pegColumn);
    if (nextTo != undefined) {
        if (nextTo.classList[0] == 'peg') {
            var nextToNextTo = document.getElementById('slot' + (pegRow - 2) + pegColumn);
            if (nextToNextTo != undefined) {
                if (nextToNextTo.classList[0] == 'empty-slot') {
                    return true;
                }
            }
        }
    }
    var nextTo = document.getElementById('slot' + (pegRow + 1) + pegColumn);
    if (nextTo != undefined) {
        if (nextTo.classList[0] == 'peg') {
            var nextToNextTo = document.getElementById('slot' + (pegRow + 2) + pegColumn);
            if (nextToNextTo != undefined) {
                if (nextToNextTo.classList[0] == 'empty-slot') {
                    return true;
                }
            }
        }
    }
    var nextTo = document.getElementById('slot' + pegRow + (pegColumn - 1));
    if (nextTo != undefined) {
        if (nextTo.classList[0] == 'peg') {
            var nextToNextTo = document.getElementById('slot' + pegRow + (pegColumn - 2));
            if (nextToNextTo != undefined) {
                if (nextToNextTo.classList[0] == 'empty-slot') {
                    return true;
                }
            }
        }
    }
    var nextTo = document.getElementById('slot' + pegRow + (pegColumn + 1));
    if (nextTo != undefined) {
        if (nextTo.classList[0] == 'peg') {
            var nextToNextTo = document.getElementById('slot' + pegRow + (pegColumn + 2));
            if (nextToNextTo != undefined) {
                if (nextToNextTo.classList[0] == 'empty-slot') {
                    return true;
                }
            }
        }
    }
    return false;
}