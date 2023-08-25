let eraser = false;
let rainbow = false;
createGrid();
toggleEraser();
toggleRainbow();
clearBoard();
moveSlider();

// function to create grid; input: size (default 16)
function createGrid(size = 16) {
  // create a selector for container div
  const container = document.querySelector('#container');
  container.innerHTML = ''; // clear container

  for (let i = 0; i < size; i++) { // do this size times:
    const row = document.createElement('div'); // create row div element
    row.classList.add('row'); // add class to div
    row.style.height = `${100 / size}%`;

    for (let j = 0; j < size; j++) { // do this size times:
      const column = document.createElement('div'); // create div element
      column.classList.add('column', 'waiting', 'border-top-left'); // add class to div
      if (j === size - 1) column.classList.add('border-right');
      if (i === size - 1) column.classList.add('border-bottom');
      column.style.width = `${100 / size}%`;

      changeAction(column);

      row.appendChild(column); // add div element to row
    }
    container.appendChild(row); // add row div to container
  }
  toggleGrid();
}

// function to toggle draw, erase, and rainbow functionality
function changeAction(el) {
  if (eraser) { // if eraser is true
    el.removeEventListener('mouseover', enableDraw); // remove draw event listener
    el.removeEventListener('mouseover', enableRainbow); // remove rainbow event listener
    el.addEventListener('mouseover', enableErase); // add eraser listener
  } else if(rainbow) { // if rainbow is true
    el.removeEventListener('mouseover', enableDraw); // remove draw event listener
    el.removeEventListener('mouseover', enableErase); // remove eraser listener
    el.addEventListener('mouseover', enableRainbow); // add rainbow listener
  } else { // if both eraser and rainbow are false
    el.removeEventListener('mouseover', enableErase); // remove eraser listener
    el.removeEventListener('mouseover', enableRainbow); // remove rainbow event listener
    el.addEventListener('mouseover', enableDraw); // add draw listener
  }

  function enableDraw() {
    el.classList.replace('waiting', 'triggered');
    el.style.backgroundColor = 'black'; // change background to black
  }
  function enableErase() {
    el.classList.replace('triggered', 'waiting');
    el.style.backgroundColor = ''; // remove background color
  }
  function enableRainbow() {
    el.classList.replace('waiting', 'triggered');

    // change background color to random color
    let hexValue = selectRandomHexValue();
    el.style.backgroundColor = hexValue;
  }
}

// add event listener to Eraser btn that toggles the eraser
function toggleEraser() {
  const eraserBtn = document.querySelector('#eraser-btn');
  eraserBtn.addEventListener('click', e => {
    eraser = (!eraser); // set eraser to opposite value
    rainbow = false; // set rainbow to false
    e.target.classList.toggle('enabled-btn'); // toggle button btw normal and blue

    // remove blue from rainbow button
    const rainbowBtn = document.querySelector('#rainbow-btn');
    rainbowBtn.classList.remove('enabled-btn');

    const columns = document.querySelectorAll('.column'); // select all column divs
    columns.forEach(changeAction); // toggle draw/erase functionality
  });
}

// function add event listener to Rainbow Mode btn that toggles rainbow mode
function toggleRainbow() {
  const rainbowBtn = document.querySelector('#rainbow-btn');
  rainbowBtn.addEventListener('click', e => {
    rainbow = (!rainbow); // set rainbow to opposite value
    eraser = false; // set eraser to false
    e.target.classList.toggle('enabled-btn'); // toggle button btw normal and blue

    // remove blue from rainbow button
    const eraserBtn = document.querySelector('#eraser-btn');
    eraserBtn.classList.remove('enabled-btn');

    const columns = document.querySelectorAll('.column'); // select all column divs
    columns.forEach(changeAction);
  });
}

// function to select random hexadecimal value
function selectRandomHexValue() {
  // select random number from 0 to 256^3 (non-inclusive)
  let num = Math.floor(Math.random() * (16777216));
  return '#' + num.toString(16); // return number converted to hex
}

// add event listener to Clear btn that clears board
function clearBoard() {
  // add event listener to clear button
  const clearBtn = document.querySelector('#clear-btn');
  clearBtn.addEventListener('click', removeColor);

  function removeColor() {
    // select all triggered divs
    const triggered = document.querySelectorAll('.triggered');
    // iterate over divs
    triggered.forEach(div => {
      div.classList.replace('triggered', 'waiting'); // replace triggered class with waiting class
      div.style.backgroundColor = ''; // remove background color
    });
  }
}

// add event listener to Toggle Grid Lines btn that toggles grid lines
function toggleGrid() {
  // select all divs with borders applied
  const topLeft = document.querySelectorAll('.border-top-left');
  const right = document.querySelectorAll('.border-right');
  const bottom = document.querySelectorAll('.border-bottom');
  // add event listener to Toggle Grid Lines button
  const gridBtn = document.querySelector('#grid-btn');
  gridBtn.addEventListener('click', () => {
    // iterate over divs, toggling border class
    topLeft.forEach(div => div.classList.toggle('border-top-left'));
    right.forEach(div => div.classList.toggle('border-right'));
    bottom.forEach(div => div.classList.toggle('border-bottom'));
  })
}

// add event listener to slider that calls createGrid
function moveSlider() {
  // create selector for slider
  const slider = document.querySelector('#slider');
  // add event listener to slider that replaces grid size text with slider value
  slider.addEventListener('input', () => {
    const gridSize = document.querySelector('#grid-size');
    gridSize.textContent = `Grid size: ${slider.value} x ${slider.value}`;
  });
  // add event listener to slider that calls createGrid with input of slider value
  slider.addEventListener('click', () => createGrid(slider.value));
}