import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
const source=await readFile(new URL('../src/components/games/neon-engine.ts',import.meta.url),'utf8');
const {outputText}=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext}});
const {createWorld,stepWorld,steer,flap}=await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);

test('la course compte une voiture évitée une seule fois et détecte une collision',()=>{
 const w=createWorld('race');w.spawn=100;w.obstacles=[{x:0,y:434}];
 stepWorld(w,1/30);assert.equal(w.score,10);stepWorld(w,1/30);assert.equal(w.score,10);
 w.obstacles=[{x:1,y:370}];stepWorld(w,1/30);assert.equal(w.over,true);
 const time=w.time;stepWorld(w,1);assert.equal(w.time,time);
});
test('les voies et la raquette restent dans le terrain',()=>{
 const w=createWorld('race');steer(w,-1);assert.equal(w.player,0);steer(w,10);assert.equal(w.player,2);
 const b=createWorld('breaker');steer(b,-99);assert.equal(b.player,42);steer(b,999);assert.equal(b.player,318);
});
test('le vol gagne un point par colonne, le battement remonte et les colonnes bloquent',()=>{
 const w=createWorld('flight');w.spawn=100;w.obstacles=[{x:31,y:220}];
 flap(w);assert.ok(w.velocity<0);stepWorld(w,1/30);assert.equal(w.score,1);assert.ok(w.y<220);assert.equal(w.over,false);
 stepWorld(w,1/30);assert.equal(w.score,1);
 w.obstacles=[{x:85,y:350}];stepWorld(w,1/30);assert.equal(w.over,true);
});
test('le casse-briques rebondit sur la raquette et retire chaque brique touchée',()=>{
 const w=createWorld('breaker');w.ball={x:180,y:420,vx:0,vy:210};stepWorld(w,1/30);
 assert.ok(w.ball.vy<0);assert.equal(w.lives,3);
 w.ball={x:42,y:55,vx:0,vy:210};stepWorld(w,1/30);
 assert.equal(w.bricks[0].alive,false);assert.equal(w.score,10);assert.ok(w.ball.vy<0);
});
test('le casse-briques gère les trois vies et la victoire',()=>{
 const w=createWorld('breaker');
 for(let i=2;i>=0;i--){w.ball.y=500;w.ball.vy=205;stepWorld(w,1/30);assert.equal(w.lives,i);assert.equal(w.over,i===0);}
 const win=createWorld('breaker');win.bricks.forEach(b=>b.alive=false);stepWorld(win,1/30);assert.equal(win.over,true);assert.equal(win.won,true);
});
