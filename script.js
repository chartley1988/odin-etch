let size = 64;
const grid = document.getElementById('grid-container')
let gridCells // Is an array of all cells
document.addEventListener('DOMContentLoaded', init) // Calls init() once when page is loaded


function init() { // Executes once when page is loaded.
    updateGridSizeStyle(size)
    generateCells();
    gridCells = getGridCells();
    
    gridCells.forEach(element => {
        element.addEventListener("mouseenter", function() {
            colors = getColors();
            updateColor(element);
            element.style.backgroundColor = colors[3];
        })
    });
}


// Generate cells, qty determined by grid size
function generateCells () {
    let cellCount = size * size;
    for(i=cellCount; i>0; i--) {
        let newCell = document.createElement('div');
        newCell.classList.add('grid-cell');
        grid.appendChild(newCell);
    }
}

// Deletes all grid cells
function deleteCells () {

}

function updateGridSizeStyle(newSize) {
    document.documentElement.style.setProperty('--gridSize', newSize)
}

function getGridCells() {
    let cells = document.getElementsByClassName('grid-cell');
    let cellsArray = Array.from(cells);
    return cellsArray;
}

function getColors() {
    let color1 = getComputedStyle(document.documentElement).getPropertyValue('--color1');
    let color2 = getComputedStyle(document.documentElement).getPropertyValue('--color2');
    let color3 = getComputedStyle(document.documentElement).getPropertyValue('--color3');
    let color4 = getComputedStyle(document.documentElement).getPropertyValue('--color4');
    let color5 = getComputedStyle(document.documentElement).getPropertyValue('--color5');
    return [color1, color2, color3, color4, color5]
}

function updateColor(element) {
    let currentColor = getComputedStyle(element).getPropertyValue('--current-color');
    console.log(currentColor);
}