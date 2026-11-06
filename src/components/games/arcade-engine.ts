export type Mark = 'X' | 'O' | null;
export function winner(board: Mark[]): Mark | 'draw' {
  for (const [a, b, c] of [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return board.every(Boolean) ? 'draw' : null;
}
export function bestMove(board: Mark[]): number {
  function evaluate(cells: Mark[], turn: 'X' | 'O'): number {
    const result = winner(cells);
    if (result) return result === 'O' ? 1 : result === 'X' ? -1 : 0;
    const scores = cells.flatMap((cell, i) => {
      if (cell) return [];
      const next = [...cells]; next[i] = turn;
      return [evaluate(next, turn === 'O' ? 'X' : 'O')];
    });
    return turn === 'O' ? Math.max(...scores) : Math.min(...scores);
  }
  let choice = -1, score = -Infinity;
  if (winner(board)) return choice;
  for (const i of [4,0,2,6,8,1,3,5,7]) {
    if (board[i]) continue;
    const next = [...board]; next[i] = 'O';
    const value = evaluate(next, 'X');
    if (value > score) { score = value; choice = i; }
  }
  return choice;
}
export type Point = { x: number; y: number };
export function advanceSnake(snake: Point[], direction: Point, food: Point, size: number) {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  const ate = head.x === food.x && head.y === food.y;
  const body = ate ? snake : snake.slice(0, -1);
  const collided = head.x < 0 || head.y < 0 || head.x >= size || head.y >= size || body.some(p => p.x === head.x && p.y === head.y);
  return { collided, ate, snake: collided ? snake : [head, ...body] };
}
export function randomFood(snake: Point[], size: number): Point | null {
  const free: Point[] = [];
  for (let y=0; y<size; y++) for (let x=0; x<size; x++) {
    if (!snake.some(p => p.x===x && p.y===y)) free.push({x,y});
  }
  return free.length ? free[Math.floor(Math.random()*free.length)] : null;
}
