import React, { useState } from 'react';
import Cell from './Cell';
import './Board.css';
import img from './Lights.png';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function hasWon(board) {
  // TODO: check the board in state to determine whether the player has won.
  board.every((row) => {
    return row.every((cell) => cell === false);
  });
}

function chooseRandomBoolean(lightStartsOnProbability) {
  let randomBoolean = Math.random() < lightStartsOnProbability;
  return randomBoolean;
}

/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
function createBoard(nrows, ncols, lightStartsOnProbability) {
	// TODO: create array-of-arrays of true/false values
	let initialBoard = Array(nrows)
		.fill([])
		.map((emptyArray) => 
    Array(ncols).fill(null).map((nullElement) => 
    (nullElement = chooseRandomBoolean(lightStartsOnProbability))));
	return initialBoard;
}

function Board({ nrows, ncols, lightStartsOnProbability }) {
	const [ board, setBoard ] = useState(createBoard(nrows, ncols, lightStartsOnProbability));

	function flipCellsAroundMe(coord) {
		setBoard((board) => {
			let [ y, x ] = coord.split('-').map(Number);

			// TODO: Make a (deep) copy of the oldBoard

			let boardCopy = [ ...board ];

			const flipCells = (y, x, boardCopy) => {
				// if this coord is actually on board, flip it

				if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
					boardCopy[y][x] = !boardCopy[y][x];
				}

				// TODO: in the copy, flip this cell and the cells around it

				if (x - 1 !== -1) {
					boardCopy[y][x - 1] = !boardCopy[y][x - 1];
				}

				if (x + 1 < ncols) {
					boardCopy[y][x + 1] = !boardCopy[y][x + 1];
				}

				if (y - 1 !== -1) {
					boardCopy[y - 1][x] = !boardCopy[y - 1][x];
				}

				if (y + 1 < nrows) {
					boardCopy[y + 1][x] = !boardCopy[y + 1][x];
				}
			};

			flipCells(y, x, boardCopy);

			// TODO: return the copy

			return boardCopy;
		});
	}

	// TODO: if the game is won, just show a winning msg & render nothing else
	// TODO: make table board

	return (
		<div>
			<img className="logo" src={img} alt="" />
			<table className="table" key={'table'}>
				{hasWon(board) ? (
					<h1 key="win">You won!</h1>
				) : (
					<tbody key={'game'}>
						{board.map((row, y) => (
							<tr key={`${y}`}>
								{row.map((cellIsLit, x) => (
									<Cell 
                  flipCellsAroundMe={flipCellsAroundMe} 
                  isLit={cellIsLit} 
                  y={y} 
                  x={x} />
								))}
							</tr>
						))}
					</tbody>
				)}
			</table>
		</div>
	);
}

export default Board;
