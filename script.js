createGrid();

// function to create grid; input: size (default 16)
function createGrid(size = 16) {
  // create a selector for container div
  const container = document.querySelector('#container');

  for (let i = 0; i < size; i++) { // do this size times:
    const row = document.createElement('div'); // create row div element
    row.classList.add('row'); // add class to div
    row.style.height = `${100 / size}%`;

    for (let j = 0; j < size; j++) { // do this size times:
      const column = document.createElement('div'); // create div element
      // column.textContent = 'div_';
      column.classList.add('column', 'waiting', 'border-top-left'); // add class to div
      if (j === size - 1) column.classList.add('border-right');
      if (i === size - 1) column.classList.add('border-bottom');
      column.style.width = `${100 / size}%`;
      row.appendChild(column); // add div element to row
    }
    container.appendChild(row); // add row div to container
  }
}