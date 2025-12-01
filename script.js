// Tic-Tac-Toe game (two-player local) with score and restart

const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const turnEl = document.getElementById('turn');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const restartBtn = document.getElementById('restart');
const resetScoreBtn = document.getElementById('resetScore');

let board = Array(9).fill(null);
let turn = 'X';
let running = true;
let score = { X: 0, O: 0 };

// winning combos
const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// create board UI
function initBoard(){
  boardEl.innerHTML = '';
  for(let i=0;i<9;i++){
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.setAttribute('role','button');
    cell.setAttribute('aria-label', `cell ${i+1}`);
    cell.addEventListener('click', onCellClick);
    boardEl.appendChild(cell);
  }
  updateStatus();
}

function onCellClick(e){
  const idx = Number(e.currentTarget.dataset.index);
  if(!running || board[idx]) return;
  board[idx] = turn;
  e.currentTarget.classList.add(turn.toLowerCase());
  e.currentTarget.textContent = turn;
  if(checkWin()){
    running = false;
    score[turn] += 1;
    updateScore();
    statusEl.innerHTML = `<strong style="color:${turn==='X'?'#0b3b99':'#c74d9a'}">${turn}</strong> wins!`;
    highlightWin();
    return;
  }
  if(board.every(Boolean)){
    running = false;
    statusEl.textContent = 'Draw!';
    return;
  }
  turn = turn === 'X' ? 'O' : 'X';
  updateStatus();
}

function checkWin(){
  return wins.some(combo => {
    const [a,b,c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function highlightWin(){
  // find winning combo and highlight cells
  const combo = wins.find(c => board[c[0]] && board[c[0]] === board[c[1]] && board[c[1]] === board[c[2]]);
  if(!combo) return;
  combo.forEach(i => {
    const cell = boardEl.querySelector(`.cell[data-index="${i}"]`);
    if(cell) cell.style.boxShadow = '0 0 24px rgba(255,205,110,0.85)';
  });
}

function updateStatus(){
  turnEl.textContent = turn;
  statusEl.textContent = `Turn: ${turn}`;
}

function updateScore(){
  scoreXEl.textContent = score.X;
  scoreOEl.textContent = score.O;
}

function restartRound(){
  board = Array(9).fill(null);
  turn = 'X';
  running = true;
  // remove UI marks
  boardEl.querySelectorAll('.cell').forEach(c => {
    c.textContent = '';
    c.classList.remove('x','o');
    c.style.boxShadow = '';
  });
  updateStatus();
}

function resetScore(){
  score = { X: 0, O: 0 };
  updateScore();
}

restartBtn.addEventListener('click', restartRound);
resetScoreBtn.addEventListener('click', resetScore);

// init
initBoard();
updateScore();
