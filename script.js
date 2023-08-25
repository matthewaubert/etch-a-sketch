let eraser = false;
createGrid();
moveSlider();
clearBoard();
toggleEraser();

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

      changeDrawErase(column);

      row.appendChild(column); // add div element to row
    }
    container.appendChild(row); // add row div to container
  }
  toggleGrid();
}

// function to toggle draw and erase functionality
function changeDrawErase(el) {
  // const eraserBtn = document.querySelector('#eraser-btn');
  if (eraser) { // if boolean is true
    el.removeEventListener('mouseover', enableDraw); // remove draw event listener
    el.addEventListener('mouseover', enableErase); // add eraser draw listener
  } else { // if boolean is false
    el.removeEventListener('mouseover', enableErase); // remove eraser listener
    el.addEventListener('mouseover', enableDraw); // add draw listener
  }

  function enableDraw() {
    el.classList.replace('waiting', 'triggered');
  }
  function enableErase() {
    el.classList.replace('triggered', 'waiting');
  }
}

// add event listener to eraser that toggles the eraser
function toggleEraser() {
  const eraserBtn = document.querySelector('#eraser-btn');
  eraserBtn.addEventListener('click', e => {
    eraser = (!eraser); // set eraser to opposite value
    e.target.classList.toggle('enabled-btn');

    const columns = document.querySelectorAll('.column') // select all column divs
    columns.forEach(changeDrawErase); // toggle draw/erase functionality
  });
}

// add event listener to 'Clear' that clears board
function clearBoard() {
  // add event listener to clear button
  const clearBtn = document.querySelector('#clear-btn');
  clearBtn.addEventListener('click', () => {
    // select all triggered divs
    const triggered = document.querySelectorAll('.triggered');
    // iterate over divs, replace triggered class with waiting class
    triggered.forEach(div => div.classList.replace('triggered', 'waiting'));
  });
}

// add event listener to 'Clear' to 'Toggle Grid Lines' that toggles grid lines
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