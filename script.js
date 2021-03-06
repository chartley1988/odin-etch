let size = 64;
const grid = document.getElementById('grid-container')
let gridCells // Is an array of all cells
const inkStyles = ["Shading", "Rainbow"];
let currentStyle = inkStyles[0];

////////////////////////////////// - DAVE
let shadingToggle = false; // basically a holding contact, swaps true/false

const shadingButton = document.getElementById("colorShading"); // grabbing the new button from the html... I think this is the preffered method to adding js to the html file.
shadingButton.addEventListener("click", toggleShadingHolder); // when the buttons clicked, all it does is toggle my shading contact on/ off

function toggleShadingHolder() {
  //this is the function that toggles the true/false.
  shadingToggle === true ? (shadingToggle = false) : (shadingToggle = true);
}
////////////////////////////////// - DAVE

document.addEventListener('DOMContentLoaded', init) // Calls init() once when page is loaded

function init() { // Executes once when page is loaded.
    updateGridSizeStyle(size)
    generateCells();
    gridCells = getGridCells();
    
    gridCells.forEach(element => {
        element.addEventListener("mouseenter", function(e) {
                  //I added the event (e) to your listener... useful badboy that is
      ////////////////////////////////// - DAVE
            if (shadingToggle === true) {
                if (e.target.opacity === undefined) {
          //this will only happen if its the first time entering... if the event target that you mouseentered had no opacity trait then give it one.
                e.target.opacity = 0.2;
                } else {
                    e.target.opacity += 0.2; //if its not the first time, increase by 0.2
                }
            e.target.style.backgroundColor = "black";
            e.target.style.opacity = e.target.opacity;
            } else {
        ////////////////////////////////// - DAVE
            colors = getColors();
            updateColor(element, colors[0]);
        }})
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

function resetCanvas () {
    deleteCells();
    generateCells();
    init();
}

function resizeCanvas() {
    let newSize = prompt('Choose an integer 0-100 to set image size', 64);
    size = clamp(newSize, 4, 100);
    deleteCells();
    generateCells();
    init();
}

// Deletes all grid cells
function deleteCells () {
    gridContainer = document.getElementById('grid-container');
    while(gridContainer.firstChild) {
        gridContainer.lastChild.remove();
    }
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

function updateColor(element, newColor) { // Changes a cell (element) to a new color
    if (newColor === 'shade') {
        newColor = shadeColor(element);
        console.log(newColor);
    }
    element.style.backgroundColor = newColor;
}

function changeStyle() {
    const colors = getColors();
    const styleButton = document.getElementById('style-change');
    let styleColor = colors[0];

    // Change to Rainbow Shading
    if (currentStyle===inkStyles[0]) {
        currentStyle = inkStyles[1];
        styleButton.textContent= ('Ink style: ' + currentStyle);
        styleColor = colors[3];
        styleColor = function() {
            let r = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            return(`rgb(${r},${g},${b})`)
        }

    // Change to normal shading
    } else if (currentStyle===inkStyles[1]) {
        currentStyle = inkStyles[0];
        styleButton.textContent= ('Ink style: ' + currentStyle);
        styleColor = function() {return "shade"};
    }  
  

    getGridCells();
    gridCells.forEach(element => {
        element.addEventListener("mouseenter", function() {
            updateColor(element, styleColor());
        })
    });
}

function getCurrentColor(cell) {
    const originalColor = cell.style.backgroundColor;
    return(originalColor);
}

function shadeColor(cell) {
    let currentColor = getCurrentColor(cell);

    const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

    currentColor = rgb2hex(currentColor);

    function darken(col, amt) {
        var num = parseInt(col, 16);
        var r = (num >> 16) + amt;
        var b = ((num >> 8) & 0x00FF) + amt;
        var g = (num & 0x0000FF) + amt;
        var newColor = g | (b << 8) | (r << 16);
        return newColor.toString(16);
    }
    currentColor = darken(currentColor, 10);
    return(currentColor);



}

function clamp(num, min, max) {
    return num <= min 
      ? min 
      : num >= max 
        ? max 
        : num
  }