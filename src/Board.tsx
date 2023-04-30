import { useEffect, useState} from 'react';
import Row from "./Row";
import { IBoardSize, IBoard, IDirection, IRow } from './types';

interface BoardProps {
    size: IBoardSize;
    bestScore: number;
    updateBestScore: (newBestScore: number) => void;
}

let Score = 0;

const generateBoard = (size: IBoardSize) : IBoard => {
    const newBoard = Array(size).fill(0).map(() => Array(size).fill(0));
    addOne(newBoard);
    return newBoard;
}

const filterZero = (row: IRow) => {
    return row.filter(num => num != 0);
}

const slide = (row: IRow, board: IBoard) => {
    row = filterZero(row);
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            Score += row[i];
        }
    } 
    row = filterZero(row);
    while (row.length < board.length) {
        row.push(0);
    }
    return row;
}

const slideDown = (board: IBoard) => {
    for (let c = 0; c < board.length; c++) {
        let row = board.map(col => col[c]);
        row.reverse();
        row = slide(row, board);
        row.reverse();
        for (let r = 0; r < board.length; r++){
            board[r][c] = row[r];
        }
    }
}

const slideUp = (board: IBoard) => {
    for (let c = 0; c < board.length; c++) {
        let row = board.map(col => col[c]);
        row = slide(row, board);
        for (let r = 0; r < board.length; r++){
            board[r][c] = row[r];
        }
    }
}

const slideLeft = (board: IBoard) => {
    for (let r = 0; r < board.length; r++) {
        let row = board[r];
        row = slide(row, board);
        board[r] = [...row];
        
    }
}

const slideRight = (board: IBoard) => {
    for (let r = 0; r < board.length; r++) {
        let row = board[r];      
        row.reverse();             
        row = slide(row, board)           
        board[r] = [...row.reverse()];   
    }
}

const addOne = (board: IBoard) => {
    const emptyCells = [];
    const possibleValues = [2, 4];
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === 0) {
            emptyCells.push({ row, col });
            }
        }
    }
    const emptyCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];
    try{
        
        board[emptyCell.row][emptyCell.col] = possibleValues[Math.floor(Math.random() * 2)]
    }catch(error){
        alert('Game over')
    }

}

const Board = ({ size, bestScore, updateBestScore }: BoardProps) => {
    const [board, setBoard] = useState<IBoard>([])
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowDown') {
            moveBoard('down');
          } else if (event.key === "ArrowLeft") {
            moveBoard('left');
            // Up arrow key pressed
          } else if (event.key === 'ArrowRight') {
            moveBoard('right');
            // Right arrow key pressed
          } else if (event.key === "ArrowUp") {
            moveBoard('up');
            // Down arrow key pressed
          }
    }

    const moveBoard = (direction : IDirection) => {
        const newBoard = board.map(row => [...row]);
        if (direction === 'down') {
            slideDown(newBoard);
        }
        if (direction === 'up') {
            slideUp(newBoard);
          }
        if (direction === 'left') {
            slideLeft(newBoard);
        }
        if (direction === 'right') {
            slideRight(newBoard)
        }
        addOne(newBoard);
        setBoard([...newBoard.map(row => [...row])]);
    }

    if(Score > bestScore){
        updateBestScore(Score);

    }

    useEffect(() => {
        const newBoard = generateBoard(size);
        setBoard(newBoard);
        Score = 0;
    }, [size])

    useEffect(() => {   
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [board])

    return <div className="board" >
        <div className='score'>
            <span >Best score : {bestScore}</span>
            <span >Current score : {Score}</span>
        </div>
        {
            board.map((row, index) => {
                return <Row row={row} size={size} key={index}/>
            })
        }
    </div>
}

export default Board;