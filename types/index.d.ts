type Move = { row: number, col: number };
type Color = "white"|"black";
type ChessSymbol = ''|'p'|'P'|'r'|'R'|'b'|'B'|'kn'|'KN'|'q'|'Q'|'k'|'K';
type Promote = 'queen'|'knight'|'bishop'|'rook';

export { Move, Color, ChessSymbol, Promote }