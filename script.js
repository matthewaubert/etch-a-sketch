createGrid();

// function to create grid; input: size (default 16)
function createGrid(size = 4) {
  // create a selector for container div
  const container = document.querySelector('#container');

  for (let i = 0; i < size; i++) { // do this size times:
    const row = document.createElement('div'); // create row div element
    row.classList.add('row'); // add class to div

    for (let j = 0; j < size; j++) { // do this size times:
      const column = document.createElement('div'); // create div element
      column.textContent = 'div_';
      column.classList.add('column', 'waiting'); // add class to div
      row.appendChild(column); // add div element to row
    }
    container.appendChild(row); // add row div to container
  }
}