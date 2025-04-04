import { Board } from '../game/Board';
import { Color, Move } from '../types';
import { Piece } from './Piece';
import { Rook } from './Rook';

class King extends Piece {
	hasMoved: boolean;

    constructor(
        color: Color,
        position: Move
    ) {
		super(color, position);
		this.hasMoved = false;
    }

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

		if (this.canCastle(board, true)) moves.push({ row: this.position.row, col: this.position.col + 2 });
		if (this.canCastle(board, false)) moves.push({ row: this.position.row, col: this.position.col - 2 });


		return moves.filter(move => board.isValidPosition(move));
	}

	canCastle(board: Board, isKingSide: boolean) {
		if (
			this.hasMoved ||
			board.isInCheck(this.position, this.color == "white" ? "black" : "white")
		) return false;

		const rookCol = isKingSide ? 7 : 0;
		const moveCol1 = isKingSide ? this.position.col + 1 : this.position.col - 1;
		const moveCol2 = isKingSide ? this.position.col + 2 : this.position.col - 2;

		const rook = board.grid[this.position.row][rookCol];
		if (
			!rook ||
			(rook instanceof Rook && rook.hasMoved)
		) return false;

		if (board.grid[this.position.row][moveCol1] || board.grid[this.position.row][moveCol2]) return false;
		if (board.isInCheck({ row: this.position.row, col: moveCol1}, this.color == 'white' ? 'black' : 'white') || board.isInCheck({ row: this.position.row, col: moveCol1}, this.color == 'white' ? 'black' : 'white')) return false;

		return true;
	}

	move(newPosition: Move): void {
		super.move(newPosition);
		this.hasMoved = true;
	}
}

export { King }