import { Board } from '../game/Board';
import { Move } from '../types';
import { Piece } from './Piece';

class King extends Piece {
	getValidMoves(board: Board): Array<Move> {
		const moves: Move[] = [
			{ row: this.position.row + 1, col: this.position.col },
			{ row: this.position.row - 1, col: this.position.col },
			{ row: this.position.row, col: this.position.col + 1 },
			{ row: this.position.row, col: this.position.col - 1 },
			{ row: this.position.row + 1, col: this.position.col + 1 },
			{ row: this.position.row + 1, col: this.position.col - 1 },
			{ row: this.position.row - 1, col: this.position.col + 1 },
			{ row: this.position.row - 1, col: this.position.col - 1 },
		];

		return moves.filter(move => board.isValidPosition(move));
	}
}

export { King }