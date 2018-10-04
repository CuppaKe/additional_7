/**
 * Function solves sudoku
 * @param {array} matrix -  incomplete multi-dimensional array with "0" as missed numbers
 * @return {array}  complete multi-dimensional array
 */
module.exports = function solveSudoku(matrix) {
  const sudoku = matrix.slice();

  function checkNum(row, col, array) {
    const num = new Set();
    const variants = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let i = 0; i < 9; i++) {
      if (array[row][i] !== 0) num.add(array[row][i]);
    }

    for (let i = 0; i < 9; i++) {
      if (array[i][col] !== 0) num.add(array[i][col]);
    }

    const x = Math.trunc(row / 3) * 3;
    const y = Math.trunc(col / 3) * 3;

    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        if (array[i][j] !== 0) num.add(array[i][j]);
      }
    }

    return variants.filter(a => !num.has(a));
  }

  function solve(array) {
    const zeros = [];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (sudoku[i][j] === 0) zeros.push({ row: i, col: j, numbers: checkNum(i, j, array) });
      }
    }
    if (zeros.length === 0) return true;

    zeros.sort((a, b) => a.numbers.length - b.numbers.length);
    const fix = zeros[0];

    for (let i = 0; i < fix.numbers.length; i++) {
      array[fix.row][fix.col] = fix.numbers[i];
      const check = solve(array);

      if (check) return true;
      array[fix.row][fix.col] = 0;
    }
    return false;
  }

  solve(sudoku);
  return sudoku;
};
