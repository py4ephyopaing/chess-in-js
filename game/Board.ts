import { Piece } from "../pieces/Piece";
import { Move } from "../types";

class Board {
	grid: (Piece | null)[][];

	constructor() {
		this.grid = Array(8).fill(null).map(() => Array(8).fill(null));
	}

	isValidPosition(move: Move): boolean {
		return move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8;
	}

	placePiece(piece: Piece, move: Move) {
		this.grid[move.row][move.col] = piece;
		piece.position = move;
	}
}

export { Board }