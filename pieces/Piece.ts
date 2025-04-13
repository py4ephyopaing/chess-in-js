import { Board } from "../game/Board"
import { ChessSymbol, Color, Move } from "../types";

abstract class Piece {
    color: Color
    position: Move
    symbol: ChessSymbol
    
    constructor(
        color: Color,
        position: Move
    ) {
        this.color = color;
        this.position = position;
        this.symbol = this.getSymbol();
    }

    move(newPosition: Move) {
        this.position = newPosition;
    }

    protected abstract getSymbol(): ChessSymbol;    
    abstract getValidMoves(board: Board): Array<Move>;
}

export { Piece }