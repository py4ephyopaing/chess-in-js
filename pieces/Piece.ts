import { Board } from "../game/Board"
import { Color, Move } from "../types";

abstract class Piece {
    color: Color
    position: Move
    
    constructor(
        color: Color,
        position: Move
    ) {
        this.color = color;
        this.position = position;
    }

    move(newPosition: Move) {
        this.position = newPosition;
    }
    
    abstract getValidMoves(board: Board): Array<Move>;
}

export { Piece }