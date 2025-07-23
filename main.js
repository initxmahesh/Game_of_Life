const width = 25;
const height = 20; // width and height dimensions of the board

/**
 * Create a Game of Life instance
 */

const gol = new GameOfLife(width, height);


/**
 * create a table and append to the DOM
 */

// Actual table cells
const tds = [];

// <table> element
const table = document.createElement("tbody");
// build a table row <tr>
for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  // build a table column <td>
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    // We'll put the coordinates on the cell
    // Element itself (using dataset),
    // letting us fetch it in a click listener later.
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById("board").append(table);


/**
 * Draws every cell from the gol instance into an actual, visible DOM element
 */

const paint = () => {
  tds.forEach(td => {
    const row = parseInt(td.dataset.row, 10);
    const col = parseInt(td.dataset.col, 10);
    const cellState = gol.getCell(row, col);
    if (cellState === 1) {
      td.classList.add('alive');
    } else {
      td.classList.remove('alive')
    }
  })
}


/**
 * Event Listeners
 */

document.getElementById("board").addEventListener("click", event => {
  const td = event.target;
  if (td.tagName === "TD") {
    const row = parseInt(td.dataset.row, 10)
    const col = parseInt(td.dataset.col, 10)
    gol.toggleCell(row, col);
    paint();
  }
});

document.getElementById("step_btn").addEventListener("click", event => {
  gol.tick();
  paint();
});

let intervalId = null;

document.getElementById("play_btn").addEventListener("click", (event) => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    event.target.textContent = "Play"; // Update button text
  } else {
    intervalId = setInterval(() => {
      gol.tick(); 
      paint(); 
    }, 200); 
    event.target.textContent = "Pause"; // Update button text
  }
});

document.getElementById("random_btn").addEventListener("click", event => {
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const randomState = Math.random() < 0.5 ? 0 : 1; // 50% chance for alive or dead
      gol.setCell(randomState, row, col);
    }
  }
  paint(); // Update the DOM
});

document.getElementById("clear_btn").addEventListener("click", event => {
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      gol.setCell(0, row, col); // Set all cells to dead
    }
  }
  paint(); // Update the DOM
});
