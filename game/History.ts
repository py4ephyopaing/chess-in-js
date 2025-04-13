import { Piece } from "../pieces/Piece"
import { BoardStructure, Color, Move, MoveType } from "../types"

type Record = {
    from: Move,
    to: Move,
    piece: Piece,
    captureItem: Piece|null,
    boardStructure: BoardStructure,
    turn: Color,
    moveType: MoveType
};

class History {
    private records: Array<Record>;

    constructor () {
        this.records = [];
    }

    append(
        from: Move,
        to: Move,
        piece: Piece,
        boardStructure: BoardStructure,
        moveType: MoveType,
        captureItem?: Piece,
    ) {
        this.records.push({
            from,
            to, 
            piece,
            captureItem: captureItem || null,
            turn: piece.color,
            boardStructure: boardStructure,
            moveType: moveType
        });
    }

    getLastMove() {
        return this.records[this.records.length - 1];
    }

    peek(index: number) {
        return this.records[index];
    }
}

export { History }