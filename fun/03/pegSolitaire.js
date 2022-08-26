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
    if (middleId != '') {
        target.outerHTML = '<div id="' + idTarget + '" class="peg slot" draggable="true" ondragstart="dragStart(event);"><img src="peg2.png"/></div>';
        source.outerHTML = '<div id="' + idSource + '" class="empty-slot slot" ondragover="allowDrop(event);" ondrop="drop(event);"><img src="emptySlot.png"/></div>';
        document.getElementById(middleId).outerHTML =
            '<div id="' + middleId + '" class="empty-slot slot" ondragover="allowDrop(event);" ondrop="drop(event);"><img src="emptySlot.png"/></div>';
    }
}