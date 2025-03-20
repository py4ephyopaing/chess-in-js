import { Piece } from "../pieces/Piece";
import { Pawn } from '../pieces/Pawn';
import { Rook } from "../pieces/Rook";
import { Bishop } from "../pieces/Bishop";
import { Queen } from "../pieces/Queen";
import { King } from "../pieces/King";
import { Knight } from "../pieces/Knight";
import { ChessSymbol, Move } from "../types";

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

	initBoard() {
		this.buildBoard([
			['r',	'kn',	'b',	'k',	'q',	'b',	'kn',	'r'],
			['p',	'p',	'p',	'p',	'p',	'p',	'p',	'p'],
			['',	'',		'',		'',		'',		'',		'',		''],
			['',	'',		'',		'',		'',		'',		'',		''],
			['',	'',		'',		'',		'',		'',		'',		''],
			['',	'',		'',		'',		'',		'',		'',		''],
			['P',	'P',	'P',	'P',	'P',	'P',	'P',	'P'],
			['R',	'KN',	'B',	'K',	'Q',	'B',	'KN',	'R'],
		]);
	}

	buildBoard(boardStructure: Array<ChessSymbol[]>) {
		if(boardStructure.length != 8) throw new Error("Board Structure must be 8x8 Array.");

		boardStructure.map(row => {
			if(row.length != 8) throw new Error("Board Structure must be 8x8 Array.");
		});

		boardStructure.map((row, row_index) => {
			row.map((col, col_index) => {
				this.grid[row_index][col_index] = this.interpretSymbol(col, { row: row_index, col: col_index });
			})
		})
	}

	interpretSymbol(symbol: ChessSymbol, position: Move): Piece|null {
		if(!this.isValidPosition(position)) throw new Error(`${position.row}x${position.col} is not a valid position.`);

		switch(symbol) {
			case 'p': return new Pawn('white', position);
			case 'P': return new Pawn('black', position);

			case 'r': return new Rook('white', position);
			case 'R': return new Rook('black', position);
			
			case 'b': return new Bishop('white', position);
			case 'B': return new Bishop('black', position);
			
			case 'kn': return new Knight('white', position);
			case 'KN': return new Knight('black', position);
			
			case 'q': return new Queen('white', position);
			case 'Q': return new Queen('black', position);
			
			case 'k': return new King('white', position);
			case 'K': return new King('black', position);
			
			case '': return null;
			
			default: throw new Error(`'${symbol}' is an invalid symbol.`);
		}
	}

	getPiece(position: Move): Piece|null {
		return this.grid[position.row][position.col];
	}

	move(src: Piece, dest: Move) { 
		const oldPosition = src.position;
		src.position = dest;

		this.grid[dest.row][dest.col] = src;
		this.grid[oldPosition.row][oldPosition.col] = null;
	}

	capture(src: Piece, dest: Piece): Piece {
		this.move(src, dest.position);

		return dest;
	}
}

export { Board }