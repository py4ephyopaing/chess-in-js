import { Board } from '../Board';
import { Move } from '../types';
import { Piece } from './Piece';

class Queen extends Piece {
    getValidMoves(board: Board): Array<Move> {
      return this.getLinearMoves(board, [
        [1, 0], [-1, 0], [0, 1], [0, -1], // Linear moves
        [1, 1], [1, -1], [-1, 1], [-1, -1] // Diagonal moves
      ]);
    }
  
    private getLinearMoves(board: Board, directions: number[][]) : Array<Move> {
		const moves: Move[] = [];

		for (const [dx, dy] of directions) {
			let row = this.position.row;
			let col = this.position.col;
			while (board.isValidPosition({ row: row + dx, col: col + dy })) {
				row += dx;
				col += dy;
				const piece = board.grid[row][col];
				if(piece) {
					if(piece.color !== this.color) moves.push({ row, col }); // Capture
					break;
				}
				moves.push({ row, col });
			}
      }
	  
      return moves;
    }
}

export { Queen } 