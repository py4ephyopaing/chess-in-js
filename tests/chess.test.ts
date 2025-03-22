import { Game } from '../game/Game';
import { Bishop } from '../pieces/Bishop';
import { King } from '../pieces/King';
import { Knight } from '../pieces/Knight';
import { Pawn } from '../pieces/Pawn';
import { Queen } from '../pieces/Queen';

test("Move pieces correctly", () => {
    const game = new Game();
    game.startGame();
    
    game.move({ row: 1, col: 1 }, { row: 2, col: 1 }); // move Pawn
    expect(
        game.board.grid[1][1] == null &&
        game.board.grid[2][1] instanceof Pawn
    ).toBe(true);

    game.move({ row: 0, col: 1 }, { row: 2, col: 2 }); // move Knight
    expect(
        game.board.grid[0][1] == null &&
        game.board.grid[2][2] instanceof Knight
    ).toBe(true);

    game.move({ row: 0, col: 2 }, { row: 2, col: 0 }); // Bishop
    expect(
        game.board.grid[0][2] == null &&
        game.board.grid[2][0] instanceof Bishop
    ).toBe(true);

    game.move({ row: 6, col: 5 }, { row: 4, col: 5}); // pawn black
    expect(
        game.board.grid[6][5] == null &&
        game.board.grid[4][5] instanceof Pawn
    ).toBe(true);

    game.move({ row: 7, col: 4 }, { row: 4, col: 7}); // queen black
    expect(
        game.board.grid[7][4] == null &&
        game.board.grid[4][7] instanceof Queen
    ).toBe(true);

    game.move({ row: 7, col: 3 }, { row: 7, col: 4}); // king black
    expect(
        game.board.grid[7][3] == null &&
        game.board.grid[7][4] instanceof King
    ).toBe(true);
});

test("Attack pieces correctly", () => {
    const game = new Game();

    game.board.buildBoard([
        ['R',	'KN',	'B',	'K',	'Q',	'B',	'KN',	'R'], // black
        ['P',	'',	'P',	'P',	'P',	'P',	'P',	'P'],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'P',		'',		'',		'',		'',		'',		''],
        ['p',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'p',	'p',	'p',	'p',	'p',	'p',	'p'],
        ['r',	'kn',	'b',	'k',	'q',	'b',	'kn',	'r'], // white
    ]);

    game.move({ row: 3, col: 1 }, { row: 4, col: 0 });

    expect(game.lostPiecesOfWhite[0] instanceof Pawn).toBe(true);
});

test("Checkmate logic", () => {
    const game = new Game();
    game.board.buildBoard([
        ['',	'',		'',		'K',		'',		'',		'',		''], // black
        ['',	'',		'r',		'',		'',		'',		'',		''],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'',		'R',		'',		'',		''],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'',		'',		'',		'',		''],
        ['',	'',		'',		'q',		'k',		'',		'',		''], // white
    ]);

    expect(game.isCheckmate('black')).toBe(false);
    expect(game.isKingInCheck('black')).toBe(true);
    game.move({ row: 4, col: 4 }, { row: 4, col: 3 });
    
    expect(game.isKingInCheck('black')).toBe(false);
    game.move({ row: 7, col: 3 }, { row: 4, col: 3 });
    expect(game.isKingInCheck('black')).toBe(true);
    expect(game.isCheckmate('black')).toBe(false);
    
    game.move({ row: 4, col: 3 }, { row: 1, col: 3 });
    expect(game.isKingInCheck('black')).toBe(true);
    expect(game.isCheckmate('black')).toBe(true);
});