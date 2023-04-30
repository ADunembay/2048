import React, { useState } from 'react';
import './App.css'
import Board from './Board'; 
import { IBoardSize } from './types';

function App() {
  const [size, setSize] = useState<IBoardSize>(3);
  const [bestScore, setBestScore] = useState(0);

  const availableSizes : IBoardSize[] = [3,4,5];
  const changeSize = (newSize:IBoardSize) => {
    setSize(newSize);
  }

  const updateBestScore = (newBestScore:number) => {setBestScore(newBestScore);}

  return (
    <React.StrictMode>
    <>
      <div className='app'>
        <div className='size-buttons'>{availableSizes.map((availableSize, index) => <div key={index} className='size-button' onClick={() =>changeSize(availableSize)}>{availableSize} x {availableSize}</div>)}</div>
        <Board size={size} bestScore={bestScore} updateBestScore={updateBestScore}/>
      </div>
    </>
    </React.StrictMode>
  )
}

export default App
