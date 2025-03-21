import { Piece } from "../pieces/Piece";
import { Move, TTurn } from "../types"
import { Board } from "./Board";

class Game {
    turn: TTurn;
    lostPiecesOfWhite: Array<Piece>;
    lostPiecesOfBlack: Array<Piece>;
    board: Board;

    constructor() {
        this.turn = 'white';
        this.lostPiecesOfBlack = [];
        this.lostPiecesOfWhite = [];
        this.board = new Board();
    }

    startGame() {
        this.board.initBoard();
    }

    getValidMoves(position: Move) {
        const piece = this.board.getPiece(position);
        if (!piece) throw new Error(`No piece at ${position.row}x${position.col}.`);

        return piece.getValidMoves(this.board);
    }

    move(src: Move, dest: Move) {
        const srcPosition = this.board.getPiece(src);
        const destPosition = this.board.getPiece(dest);

        if(!srcPosition) throw new Error(`No piece at ${src.row}x${src.col}.`);

        // invalid move factor
        const validMoves = srcPosition.getValidMoves(this.board);
        if(!validMoves.some(move => move.col == dest.col && move.row == dest.row))
            throw new Error(`Your ${srcPosition} cannot move to ${dest.row}x${dest.col}.`);

        if(!destPosition) {
            this.board.move(srcPosition, dest);
            return;
        }
        
        const capturedPiece = this.board.capture(srcPosition, destPosition);
        if(capturedPiece.color == 'white') {
            this.lostPiecesOfWhite.push(capturedPiece);
        } else {
            this.lostPiecesOfBlack.push(capturedPiece);
        }
    }
}

export { Game }