import { Bishop } from "../pieces/Bishop";
import { King } from "../pieces/King";
import { Knight } from "../pieces/Knight";
import { Pawn } from "../pieces/Pawn";
import { Piece } from "../pieces/Piece";
import { Queen } from "../pieces/Queen";
import { Rook } from "../pieces/Rook";
import { Move, Color, Promote } from "../types"
import { Board } from "./Board";

class Game {
    turn: Color;
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
        if(srcPosition.color != this.turn) throw new Error(`This is not ${srcPosition.color} turn.`);
        
        // invalid move factor
        const validMoves = srcPosition.getValidMoves(this.board);
        if(!validMoves.some(move => move.col == dest.col && move.row == dest.row))
            throw new Error(`Your ${srcPosition} cannot move to ${dest.row}x${dest.col}.`);
        
        if(!destPosition) { // if there is no piece at dest.
            this.board.move(srcPosition, dest);
            
            const destPosition = this.board.getPiece(dest);
            if(this.isKingInCheck(srcPosition.color) && destPosition) {
                this.board.move(destPosition, src); // undo the move
                return false;
            }
            if(destPosition instanceof Pawn) {
                this.promotePawn(destPosition, 'queen');
            }

            if(
                srcPosition instanceof King && 
                (dest.row == 0 || dest.row == 7) &&
                (dest.col == 1 || dest.col == 5)
            ) {
                this.board.castling(srcPosition, true);
            }

            this.turn = this.turn == 'black' ? 'white' : 'black';
            return true;
        }
        
        const capturedPiece = this.board.capture(srcPosition, destPosition);
        if(this.isKingInCheck(srcPosition.color) && capturedPiece) { // will check the king? and then undo.
            this.board.move(srcPosition, src);
            this.board.move(capturedPiece, dest);
            return false;
        }

        if(capturedPiece.color == 'white') {
            this.lostPiecesOfWhite.push(capturedPiece);
        } else {
            this.lostPiecesOfBlack.push(capturedPiece);
        }
        
        this.turn = this.turn == 'black' ? 'white' : 'black';
        return true;
    }

    promotePawn(pawn: Pawn, promoteTo: Promote) {
        if(!this.board.isPromotion(pawn)) return false;

        let target: Queen|Knight|Bishop|Rook;
        switch(promoteTo) {
            case 'queen': target = new Queen(pawn.color, pawn.position); break;
            case 'bishop': target = new Bishop(pawn.color, pawn.position); break;
            case 'knight': target = new Knight(pawn.color, pawn.position); break;
            case 'rook': target = new Rook(pawn.color, pawn.position); break;
        }

        this.board.move(target, pawn.position);
    }

	isKingInCheck(color: Color) {
		const kingPosition = this.board.getKing(color);
        
        return this.board.isInCheck(kingPosition, color == 'black' ? 'white' : 'black');
	}

    isAnymoveLeft(color: Color) {
        const pieces = this.board.getAllPiecesof(color);
        const kingPosition = this.board.getKing(color);
        const king = this.board.grid[kingPosition.row][kingPosition.col];

        if(king && king instanceof Piece) {
            pieces.push(king);
        }

        for(const piece of pieces) {
            const originalPosition = { ...piece.position };
            const validMoves = piece.getValidMoves(this.board);

            for(const move of validMoves) {
                const dest = this.board.getPiece(move);
                this.board.move(piece, move);
                const stillCheck = this.isKingInCheck(color);
                this.board.move(piece, originalPosition);

                if (dest) {
                    this.board.move(dest, move);
                }

                if(!stillCheck) return true;
            }
        }

        return false;
    }

    isCheckmate(color: Color) {
        if(!this.isKingInCheck(color)) return false;
        return !this.isAnymoveLeft(color);
    }

    isStalemate(color: Color) {
        if(this.isKingInCheck(color)) return false;
        return !this.isAnymoveLeft(color);
    }
}

export { Game }