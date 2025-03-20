import { Board } from "../game/Board"
import { Move } from "../types";

abstract class Piece {
    color: "white" | "black"
    position: Move
    
    constructor(
        color: "white" | "black",
        position: Move
    ) {
        this.color = color;
        this.position = position;
    }
    
    abstract getValidMoves(board: Board): Array<Move>;
}

export { Piece }
  