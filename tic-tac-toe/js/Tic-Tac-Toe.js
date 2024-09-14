document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile');
    const display = document.querySelector('.display');
    const announcer = document.querySelector('.announcer');
    const resetButton = document.getElementById('reset');

    let reset=true;
    
    let currentPlayer = 'X';
    let gameActive = true;
    let board = ['', '', '', '', '', '', '', '', ''];

    // Winning combinations
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleTileClick(event) {
        const index = event.target.dataset.index;
        if (board[index] || !gameActive) return;

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add(`player${currentPlayer}`);

        if (checkWinner()) {
            display.textContent = `Player ${currentPlayer} wins!`;
            announcer.textContent = `Player ${currentPlayer} wins!`;
            announcer.classList.remove('hide');
            gameActive = false;
        } else if (board.every(tile => tile)) {
            display.textContent = 'It\'s a draw!';
            announcer.textContent = 'It\'s a draw!';
            announcer.classList.remove('hide');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            
                display.innerHTML = `Player <span class="display">${currentPlayer}</span>'s turn`;
                

            
           
        }
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function resetGame() {
        console.log("Resetting game...");
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        if(currentPlayer==='X'){
            currentPlayer ='X';
        } else {
           
            currentPlayer = 'O';
        }
         display.innerHTML =`Player turn ${currentPlayer}`;
       
        announcer.classList.add('hide');

        announcer.textContent = ``;

        tiles.forEach(tile => {
            tile.textContent = '';
            tile.classList.remove('playerX', 'playerO');
        });
    }

    tiles.forEach((tile, index) => {
        tile.dataset.index = index;
        tile.addEventListener('click', handleTileClick);
    });

    resetButton.addEventListener('click', resetGame);

    // Initial console log to ensure script is running
    console.log("Tic-Tac-Toe script loaded.");
});
