import { useState } from 'react'
import './App.css'

function App() {

  const [drawing, setDrawing] = useState(false);
  const [paintedCells, setPaintedCells] = useState({});
  const [gridSize, setGridSize] = useState(20);
  const [currentColor, setCurrentColor] = useState('#000000');

  const handleMouseDown = (rowIndex, colIndex) => {
    setDrawing(true);
    paintCell(rowIndex, colIndex);
  }

  const handleMouseUp = () => {
    setDrawing(false);
  }

  const handleMouseMove = (rowIndex, colIndex) => {
    if (drawing) {
      paintCell(rowIndex, colIndex);
    }
  }

  const paintCell = (rowIndex, colIndex) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    setPaintedCells(prev => ({...prev, [cellKey]: currentColor}))
  }

  const handleClearBoard = () => {
    setPaintedCells({});
  }

  const handleChangeCellSize = () => {
    let newCellSize = parseInt(prompt('What\'s the new cell size? (1 to 100, please'));
    if (newCellSize < 1) newCellSize = 1;
    if (newCellSize > 100) newCellSize = 100;
    setGridSize(newCellSize);
    setPaintedCells({});
  }

  const renderGrid = () => {
    if (!paintedCells) {
        console.error("paintedCells is undefined or null, returning empty grid.");
        return []; 
    }

    const cells = [];
    for (let i = 0; i < gridSize; i++){
      for (let j = 0; j < gridSize; j++) {
        const cellKey = `${i}-${j}`;
        const color = paintedCells[cellKey];
        const cellStyle = color ? {backgroundColor: color} : {};
        let newCell = (
          <div 
            key={cellKey}
            id={cellKey}
            className='grid-cell'
            style={cellStyle}
            onMouseDown={() => handleMouseDown(i, j)}
            onMouseMove={() => handleMouseMove(i, j)}
            onMouseUp = {handleMouseUp}
          />
        );
        cells.push(newCell);
      }
    }
    return cells;
  }

  return (
    <main>
      <header>
        <h1>Etch-a-Sketch</h1>
        <h2>An Odin Project exercise</h2>
        <h3>Powered by React</h3>
      </header>
      <article>
        <div id="options">
          <p>
            <label htmlFor="colorPicker">Pick Your Color </label>
            <input 
              type="color" 
              name="colorPicker" 
              id="colorPicker"
              value={currentColor}
              onChange={(e) => setCurrentColor(e.target.value)} 
            />
          </p>
          <p>
            <button 
              type="button"
              onClick={handleClearBoard}
            >
              Clear The Board
            </button>
          </p>
          <p>
            <button 
              type="button"
              onClick={handleChangeCellSize}
            >
              Change Cell Size
            </button>
          </p>
        </div>
        <div id="canvas">
          <div 
            id="container"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            }}
            onMouseLeave = {handleMouseUp}
          >
            {renderGrid()}
          </div>
        </div>
      </article>
      <footer>
        <p>&copy; Micheal McErlean 2025.</p>
      </footer>
    </main>

  )
}

export default App
