function createGrid(numRows, numColumns) {
    var grid = [];
    var currentRow = [];
    for (row = 0; row < numRows; row++) {
        for (column = 0; column < numColumns; column++) {
            currentRow.push('');
        }
        grid.push(currentRow);
    }
    return grid;
}