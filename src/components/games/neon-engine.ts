export type ArcadeMode = 'race' | 'flight' | 'breaker';
export type Obstacle = { x: number; y: number; passed?: boolean };
export type Brick = { x: number; y: number; alive: boolean; color: number };
export type World = {
  mode: ArcadeMode; time: number; score: number; over: boolean; won: boolean;
  player: number; y: number; velocity: number; spawn: number;
  obstacles: Obstacle[]; ball: { x: number; y: number; vx: number; vy: number };
  bricks: Brick[]; lives: number;
};
export function createWorld(mode: ArcadeMode): World {
  return { mode, time: 0, score: 0, over: false, won: false, player: mode === 'race' ? 1 : 180,
    y: 220, velocity: 0, spawn: mode === 'race' ? .8 : 1.1, obstacles: [],
    ball: { x: 180, y: 370, vx: 115, vy: -205 }, lives: 3,
    bricks: Array.from({ length: 30 }, (_, i) => ({ x: 17+(i%6)*55, y: 65+Math.floor(i/6)*24, alive: true, color: Math.floor(i/6) })) };
}
export function steer(world: World, amount: number) {
  world.player = Math.max(world.mode === 'race' ? 0 : 42, Math.min(world.mode === 'race' ? 2 : 318, amount));
}
export function flap(world: World) { if (!world.over) world.velocity = -235; }
export function stepWorld(w: World, dt: number, random = Math.random) {
  if (w.over) return;
  dt = Math.min(dt, 1/30);
  w.time += dt;
  if (w.mode === 'race') {
    const speed = Math.min(410, 165 + w.time*4);
    w.spawn -= dt;
    if (w.spawn <= 0) { w.obstacles.push({x: Math.floor(random()*3), y:-75}); w.spawn = Math.max(.66,1.15-w.time*.006); }
    for (const car of w.obstacles) {
      car.y += speed*dt;
      if (car.x === w.player && car.y+60 > 370 && car.y < 430) w.over = true;
      if (!car.passed && car.y > 435) { car.passed = true; w.score += 10; }
    }
    w.obstacles = w.obstacles.filter(car=>car.y<520);
  } else if (w.mode === 'flight') {
    w.velocity += 680*dt; w.y += w.velocity*dt;
    if (w.y < 14 || w.y > 452) w.over = true;
    w.spawn -= dt;
    if (w.spawn <= 0) { w.obstacles.push({x:380,y:105+random()*180}); w.spawn = 1.65; }
    for (const pipe of w.obstacles) {
      pipe.x -= Math.min(185,125+w.time*.6)*dt;
      if (pipe.x < 108 && pipe.x+48 > 80 && (w.y-12 < pipe.y-78 || w.y+12 > pipe.y+78)) w.over=true;
      if (!pipe.passed && pipe.x+48 < 80) {pipe.passed=true; w.score++;}
    }
    w.obstacles=w.obstacles.filter(pipe=>pipe.x> -60);
  } else {
    const b=w.ball;
    const previousY=b.y;
    b.x+=b.vx*dt; b.y+=b.vy*dt;
    if(b.x<9) {b.x=9;b.vx=Math.abs(b.vx);}
    if(b.x>351) {b.x=351;b.vx=-Math.abs(b.vx);}
    if(b.y<9) {b.y=9;b.vy=Math.abs(b.vy);}
    if(b.vy>0 && previousY+7<=429 && b.y+7>=429 && Math.abs(b.x-w.player)<49) {
      b.y=421; const offset=(b.x-w.player)/49;
      b.vx=offset*235; b.vy=-Math.sqrt(270*270-b.vx*b.vx);
    }
    for(const brick of w.bricks) {
      if(brick.alive && b.x+7>brick.x && b.x-7<brick.x+50 && b.y+7>brick.y && b.y-7<brick.y+18) {
        brick.alive=false; w.score+=10;
        if(previousY+7<=brick.y || previousY-7>=brick.y+18) b.vy=-b.vy; else b.vx=-b.vx;
        break;
      }
    }
    if(w.bricks.every(brick=>!brick.alive)) {w.won=true;w.over=true;}
    if(b.y>495) {
      w.lives--;
      if(w.lives===0) w.over=true;
      else {w.ball={x:w.player,y:370,vx:115,vy:-205};}
    }
  }
}
