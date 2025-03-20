import { Board } from '../Board';
import { Move } from '../types';
import { Piece } from './Piece';

class Pawn extends Piece {
    getValidMoves(board: Board) {
        const moves: Move[] = [];
        const direction = this.color === "white" ? -1 : 1;
        const startRow = this.color === "white" ? 6 : 1;
    
        // Move forward
        if (!board.grid[this.position.row + direction][this.position.col]) {
            moves.push({ row: this.position.row + direction, col: this.position.col });
        
            if (this.position.row === startRow && !board.grid[this.position.row + 2 * direction][this.position.col]) {
                moves.push({ row: this.position.row + 2 * direction, col: this.position.col });
            }
        }
    
        // Capturing moves
        const captureOffsets = [-1, 1];
        for (const offset of captureOffsets) {
            const newCol = this.position.col + offset;
            const newRow = this.position.row + direction;
            if (board.isValidPosition({ row: newRow, col: newCol })) {
                const piece = board.grid[newRow][newCol];
                if (piece && piece.color !== this.color) {
                moves.push({ row: newRow, col: newCol });
                }
            }
        }
    
        return moves;
    }
}

export { Pawn }