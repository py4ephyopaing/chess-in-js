import { Game } from '../game/Game';
import { Bishop } from '../pieces/Bishop';
import { King } from '../pieces/King';
import { Knight } from '../pieces/Knight';
import { Pawn } from '../pieces/Pawn';
import { Queen } from '../pieces/Queen';
import { Rook } from '../pieces/Rook';

test("Should can move", () => {
    const game = new Game();
    game.startGame();
    game.turn = 'black';
    expect(game.move({ row: 1, col: 1 }, { row: 2, col: 1 })).toBe(true); // move Pawn
    expect(
        game.board.grid[1][1] == null &&
        game.board.grid[2][1] instanceof Pawn
    ).toBe(true);

    game.turn = 'black';
    expect(game.move({ row: 0, col: 1 }, { row: 2, col: 2 })).toBe(true); // move Knight
    expect(
        game.board.grid[0][1] == null &&
        game.board.grid[2][2] instanceof Knight
    ).toBe(true);

    game.turn = 'black';
    expect(game.move({ row: 0, col: 2 }, { row: 2, col: 0 })).toBe(true); // Bishop
    expect(
        game.board.grid[0][2] == null &&
        game.board.grid[2][0] instanceof Bishop
    ).toBe(true);

    expect(game.move({ row: 6, col: 5 }, { row: 4, col: 5})).toBe(true); // pawn black
    expect(
        game.board.grid[6][5] == null &&
        game.board.grid[4][5] instanceof Pawn
    ).toBe(true);

    game.turn = 'white';
    expect(game.move({ row: 7, col: 4 }, { row: 4, col: 7})).toBe(true); // queen black
    expect(
        game.board.grid[7][4] == null &&
        game.board.grid[4][7] instanceof Queen
    ).toBe(true);

    game.turn = 'white';
    expect(game.move({ row: 7, col: 3 }, { row: 7, col: 4})).toBe(true); // king black
    expect(
        game.board.grid[7][3] == null &&
        game.board.grid[7][4] instanceof King
    ).toBe(true);
});

test("Should not move", () => {
    const game = new Game();

    game.board.buildBoard([
        ['',	'',		'',		'K',	'',		'',		'',		''], // black
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'R',	'',		'',		'',		''],
        ['',	'',		'',		'',		'',	    '',		'',		''],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'q',	'',		'',		'',		''],
        ['',	'',		'',		'',	    'k',		'',		'',		''], // white
    ]);

    game.turn = 'black';
    expect(game.move({ row: 3, col: 3 }, { row: 3, col: 4 })).toBe(false);
    expect(
        game.board.grid[3][3] instanceof Rook &&
        game.board.grid[3][3].color == 'black'
    ).toBe(true);

    expect(
        game.board.grid[3][4] == null
    ).toBe(true);
});

test("Should not capture", () => {
    const game = new Game();

    game.board.buildBoard([
        ['',	'',		'',		'K',	'',		'',		'',		''], // black
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'P',	'',		'',		'',		''],
        ['',	'',		'',		'',		'p',	'',		'',		''],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'q',	'',		'',		'',		''],
        ['',	'',		'',		'k',	'',		'',		'',		''], // white
    ]);
    
    game.turn = 'black';
    expect(game.move({ row: 3, col: 3 }, { row: 4, col: 4 })).toBe(false);
    expect(
        game.board.grid[3][3] instanceof Pawn &&
        game.board.grid[3][3].color == 'black'
    ).toBe(true);

    expect(
        game.board.grid[4][4] instanceof Pawn &&
        game.board.grid[4][4].color == 'white'
    ).toBe(true);
});

test("Should capture", () => {
    const game = new Game();

    game.board.buildBoard([
        ['R',	'KN',	'B',	'K',	'Q',	'B',	'KN',	'R'], // black
        ['P',	'',	    'P',	'P',	'P',	'P',	'P',	'P'],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'P',	'',		'',		'',		'',		'',		''],
        ['p',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'p',	'p',	'p',	'p',	'p',	'p',	'p'],
        ['r',	'kn',	'b',	'k',	'q',	'b',	'kn',	'r'], // white
    ]);

    game.turn = 'black';
    game.move({ row: 3, col: 1 }, { row: 4, col: 0 });

    expect(game.lostPiecesOfWhite[0] instanceof Pawn).toBe(true);
});

test("Should Checkmate", () => {
    const game = new Game();
    game.board.buildBoard([
        ['',	'',		'',		'K',	'',		'',		'',		''], // black
        ['',	'',		'r',	'',		'',		'',		'',		''],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'',		'R',	'',		'',		''],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'q',	'k',	'',		'',		''], // white
    ]);

    expect(game.isCheckmate('black')).toBe(false);
    expect(game.isKingInCheck('black')).toBe(true);

    game.turn = 'black';
    game.move({ row: 4, col: 4 }, { row: 4, col: 3 });
    
    expect(game.isKingInCheck('black')).toBe(false);
    game.move({ row: 7, col: 3 }, { row: 4, col: 3 });
    expect(game.isKingInCheck('black')).toBe(true);
    expect(game.isCheckmate('black')).toBe(false);
    
    game.turn = 'white';
    game.move({ row: 4, col: 3 }, { row: 1, col: 3 });
    expect(game.isKingInCheck('black')).toBe(true);
    expect(game.isCheckmate('black')).toBe(true);
});

test("Should Stalemate", () => {
    const game = new Game();
    game.board.buildBoard([
        ['',	'',		'',		'', 	'q',	'',		'',		''], // black
        ['',	'',		'K',	'',		'',		'',		'',		''],
        ['q',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'',		'',	    '',		'',		''],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'', 	'',	    '',		'',		'k'], // white
    ]);

    expect(game.isStalemate('black')).toBe(true);
});