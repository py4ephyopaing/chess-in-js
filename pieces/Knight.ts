import { Board } from '../game/Board';
import { ChessSymbol, Move } from '../types';
import { Piece } from './Piece';

class Knight extends Piece {
	getValidMoves(board: Board): Array<Move> {
		const moves = [
			{ row: this.position.row + 2, col: this.position.col + 1 },
			{ row: this.position.row + 2, col: this.position.col - 1 },
			{ row: this.position.row - 2, col: this.position.col + 1 },
			{ row: this.position.row - 2, col: this.position.col - 1 },
			{ row: this.position.row + 1, col: this.position.col + 2 },
			{ row: this.position.row + 1, col: this.position.col - 2 },
			{ row: this.position.row - 1, col: this.position.col + 2 },
			{ row: this.position.row - 1, col: this.position.col - 2 },
		];

		return moves.filter(board.isValidPosition);
	}

	protected getSymbol(): ChessSymbol {
		return this.color === 'white' ? 'n' : 'N';
	}
}

export { Knight }