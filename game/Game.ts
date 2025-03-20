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
}