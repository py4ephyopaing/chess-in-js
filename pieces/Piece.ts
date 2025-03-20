import { Board } from "../Board"
import { Move } from "../types";

abstract class Piece {
    color: "white" | "black"
    position: Move
    
    constructor(
        color: "white" | "black",
        position: Move
    ) {}
    
    abstract getValidMoves(board: Board): Array<Move>;
}

export { Piece }
  