class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  makeBoard() {
    let final = []
    for (let i = 0; i < this.height; i++){
      let arr = [];
      for (let j = 0; j < this.width; j++){
        arr.push(0)
      }
      final.push(arr)
    }
    return final;
  }

  getCell(row, col) {
    if (row >= 0 && row < this.height && col >= 0 && col < this.width) {
      return this.board[row][col];
    }
    return 0;
  }

  setCell(value, row, col) {
    if (row >= 0 && row < this.height && col >= 0 && col < this.width) {
      this.board[row][col] = value;
    }
  }

  toggleCell(row, col) {
    const currentVal = this.getCell(row, col)
    const newVal = currentVal === 0 ? 1 : 0;
    this.setCell(newVal, row, col)
  }

  livingNeighbors(row, col) {
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue; // Skip the current cell
          count += this.getCell(row + i, col + j);
        }
      }
      return count;
  }
  
  tick() {
    const newBoard = this.makeBoard();
    for (let row = 0; row < this.height; row++){
      for (let col = 0; col < this.width; col++){
        const livingNeighbors = this.livingNeighbors(row, col)
        const currentState = this.getCell(row, col);

        //Conway's rule
        if (currentState === 1) {
          if (livingNeighbors < 2 || livingNeighbors > 3) {
            newBoard[row][col] = 0;
          } else {
            newBoard[row][col] = 1;
          }
        } else {
          if (livingNeighbors === 3) {
            newBoard[row][col] = 1
          }
        }
      }
    }
    this.board = newBoard;
  }
}
