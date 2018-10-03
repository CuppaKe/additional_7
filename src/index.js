module.exports = function solveSudoku(matrix) {
  
    let sudoku = matrix.slice();
    let Num = [];
  
    function checkNum (row,col,array) {
      
      Num.length = 0;
      for ( let i = 0; i < 9; i++) {
          if (array[row][i] !== 0) Num.push(array[row][i]);
          
      };
      for (let i = 0; i < 9; i++) {
          if (array[i][col] !== 0) Num.push(array[i][col]);
      }; 
      
      let x = Math.trunc(row/3) * 3;
      let y = Math.trunc(col/3) * 3;
  
      for (let i = x; i < x + 3; i++) {
          for (let j = y; j < y + 3; j++) {
            if (array[i][j] !== 0) Num.push(array[i][j]);
          }
      };
      
      let obj = {};
      for (let i = 0; i < Num.length; i++) {
          let temp = Num[i];
          obj[temp] = true;
      }
      Num = Object.keys(obj).map(num => Number(num));
  
      return Num;
       
    }
    
  
    function solve(array) {
      let zeros = [];
      
  
      for (let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++){
          if (sudoku[i][j] == 0) zeros.push({row:i, col:j});
        }
      }
      if (zeros.length == 0) return true;
      
      zeros.sort((a,b) => checkNum(b.row,b.col,array).length - checkNum(a.row,a.col,array).length)
      
      let fix = zeros[0];
  
      for (let j = 0; j < zeros.length; j++){
        for (let i = 1; i <= 9; i++) {
          if (!checkNum(fix.row,fix.col,array).includes(i)) {
            array[fix.row][fix.col] = i;
            let check = solve(array);
        check == true ? true : array[fix.row][fix.col] = 0;
          };
               
        }
        
        
      } return false;
      
    }
    
  
    solve(sudoku);
  
  
  
   return sudoku
  
  
  
  };
