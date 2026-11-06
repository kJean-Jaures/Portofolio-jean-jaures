import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
const source = await readFile(new URL('../src/components/games/arcade-engine.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { winner, bestMove, advanceSnake, randomFood } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);

test('le morpion détecte victoire, match nul et partie en cours', () => {
  assert.equal(winner(['X',null,'O',null,'X',null,'O',null,'X']), 'X');
  assert.equal(winner(['X','O','X','X','O','O','O','X','X']), 'draw');
  assert.equal(winner(Array(9).fill(null)), null);
  assert.equal(bestMove(['O','O',null,'X','X',null,null,null,'X']), 2);
});

test('l’ordinateur ne perd contre aucune séquence de coups humains', () => {
  let endings = 0;
  function visit(board) {
    const result = winner(board);
    if (result) {assert.notEqual(result, 'X'); endings++; return;}
    for (let i = 0; i < 9; i++) {
      if (board[i]) continue;
      const next = [...board]; next[i] = 'X';
      if (winner(next)) {assert.notEqual(winner(next), 'X'); endings++; continue;}
      const move = bestMove(next);
      assert.equal(next[move], null);
      next[move] = 'O'; visit(next);
    }
  }
  visit(Array(9).fill(null));
  assert.ok(endings > 100);
});

test('Snake grandit uniquement lorsqu’il mange et conserve le plateau initial', () => {
  const snake = [{x:1,y:1},{x:0,y:1}];
  const next = advanceSnake(snake,{x:1,y:0},{x:2,y:1},4);
  assert.equal(next.ate,true); assert.equal(next.snake.length,3);
  assert.equal(snake.length,2);
  const empty = advanceSnake(snake,{x:0,y:1},{x:3,y:3},4);
  assert.equal(empty.snake.length,2); assert.equal(empty.collided,false);
});

test('Snake détecte murs et corps mais autorise une case libérée par la queue', () => {
  assert.equal(advanceSnake([{x:0,y:0}],{x:-1,y:0},{x:3,y:3},4).collided,true);
  const snake = [{x:1,y:1},{x:1,y:2},{x:0,y:2},{x:0,y:1}];
  assert.equal(advanceSnake(snake,{x:0,y:1},{x:3,y:3},4).collided,true);
  assert.equal(advanceSnake(snake,{x:-1,y:0},{x:3,y:3},4).collided,false);
});

test('la nourriture évite le serpent et un plateau rempli termine la partie', () => {
  assert.deepEqual(randomFood([{x:0,y:0},{x:1,y:0},{x:0,y:1}],2),{x:1,y:1});
  assert.equal(randomFood([{x:0,y:0}],1),null);
});
