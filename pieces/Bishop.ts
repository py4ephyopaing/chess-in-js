import { Board } from '../game/Board';
import { Move } from '../types';
import { Piece } from './Piece';

class Bishop extends Piece {
    getValidMoves(board: Board) {
      return this.getLinearMoves(board, [[1, 1], [1, -1], [-1, 1], [-1, -1]]);
    }
  
    private getLinearMoves(board: Board, directions: number[][]): Array<Move> {
      const moves: Move[] = [];
      for (const [dx, dy] of directions) {
        let row = this.position.row;
        let col = this.position.col;
        
        while (board.isValidPosition({ row: row + dx, col: col + dy })) {
            row += dx;
            col += dy;

            const piece = board.grid[row][col];
            if(piece) {
                if (piece.color !== this.color) moves.push({ row, col }); // Capture
                break;
            }
            moves.push({ row, col });
        }
      }
      return moves;
    }
}

export { Bishop }