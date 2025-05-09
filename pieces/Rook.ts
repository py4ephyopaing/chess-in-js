import { Board } from '../game/Board';
import { ChessSymbol, Color, Move } from '../types';
import { Piece } from './Piece';

class Rook extends Piece {
	hasMoved: boolean;

    constructor(
        color: Color,
        position: Move
    ) {
		super(color, position);
		this.hasMoved = false;
    }

    getValidMoves(board: Board): Array<Move> {
        const moves = this.getLinearMoves(board, [[1, 0], [-1, 0], [0, 1], [0, -1]]);

        return moves;
    }
  
    private getLinearMoves(board: Board, directions: number[][]): Array<Move> {
		const moves: Array<Move> = [];

		for (const [dx, dy] of directions) {
			let row = this.position.row;
			let col = this.position.col;
			while (board.isValidPosition({ row: row + dx, col: col + dy })) {
				row += dx;
				col += dy;
				const piece = board.grid[row][col];
				if (piece) {
					if (piece.color !== this.color) // if a piece was found but it's not same color.
						moves.push({ row, col }); // Capture
					break; // stop the path.
				}
				moves.push({ row, col });
			}
		}
		return moves;
    }

	move(newPosition: Move): void {
		super.move(newPosition);
		this.hasMoved = true;
	}

	protected getSymbol(): ChessSymbol {
		return this.color === "white" ? "r" : "R";
	}
}

export { Rook }