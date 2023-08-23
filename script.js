startGame();

function startGame() {
  createGrid();
  moveSlider();
  clearBoard();
  toggleGrid();
}

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

      column.addEventListener('mouseover', () => column.classList.replace('waiting', 'triggered'));

      row.appendChild(column); // add div element to row
    }
    container.appendChild(row); // add row div to container
  }
}

// add event listener to slider that calls createGrid
function moveSlider() {
  // create selector for slider
  const slider = document.querySelector('#slider');
  // add event listener to slider that replaces grid size text with slider value
  slider.addEventListener('input', () => {
    const gridSize = document.querySelector('#grid-size');
    gridSize.textContent = `Grid size: ${slider.value} x ${slider.value}`
  });
  // add event listener to slider that calls createGrid with input of slider value
  slider.addEventListener('click', () => createGrid(slider.value));
}

// function that clears board
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

// function to toggle grid lines
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