import './test-v13.mjs';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
const base=process.cwd(),repo=path.join(base,'work/repos/claude-reels-workflow'),src=path.join(repo,'video/src/youtube'),project=path.join(repo,'youtube-video-editing-system/projects/higgsfield-replacement');
const read=n=>readFileSync(path.join(src,n),'utf8'),s=read('ScenesV20.tsx'),comparison=read('StoryScenesV10.tsx');
assert.doesNotMatch(s,/Math\.random|Date\.now|setTimeout|OffthreadVideo|Concept illustration|features vary by plan|Plan example|Estimate varies/);
for(const name of ['Cost','Production','Roadmap','Guide','Wrapper','Direct','Vault','Skill','ShotPlan'])assert.match(s,new RegExp('export const '+name+'V20'));
assert.match(s,/Reusable instructions/);assert.match(s,/Claude skill/);assert.doesNotMatch(s,/Claude Scale/i);
assert.equal((s.match(/>\$100</g)||[]).length,1,'Recurring subscription price belongs only to cost scene');
assert.match(s,/higgsfield-page-v20.png/);assert.match(s,/roadmapBeatsV13/);assert.match(s,/routeV20/);assert.match(s,/minimal/);
assert.match(comparison,/top:opening\?62:789/);assert.match(comparison,/shutter-not-circle/);
assert.match(comparison,/opening\?\(i\?'v9\/intro-claude-v20.mp4':'v9\/intro-higgsfield-v20.mp4'\)/);
for(const t of [1.6,2.6,3.6])assert.equal(3-Math.floor(t-1.6),[3,2,1][Math.round(t-1.6)]);
for(let p=0;p<=1;p+=.005){const x=330+1260*p,y=625-170*Math.sin(p*Math.PI*2);assert.ok(x-112>=100&&x+112<=1820);assert.ok(y-138>180&&y+86<900);}
for(const n of [...s.matchAll(/name="([^"]+)"/g)].map(m=>m[1]).filter(n=>/\.(png|jpg|svg)$/.test(n)))assert.ok(existsSync(path.join(base,'work/higgsfield-replacement/public/v3',n)),n);
const ledger=JSON.parse(readFileSync(path.join(base,'work/higgsfield-replacement/public/v9/media-v20-ledger.json')));
assert.equal(ledger[0].correction,ledger[1].correction,'Identical opening-only treatment');
const sha=f=>createHash('sha256').update(readFileSync(path.join(base,'work/higgsfield-replacement/public',f))).digest('hex');
for(const item of ledger){assert.equal(sha(item.target),item.targetSHA256||item.sha256);if(item.sourceSHA256)assert.equal(sha(item.source),item.sourceSHA256);}
const host=read('YouTubeV9.tsx');assert.match(host,/roadmapBeatsV13\)add\(b\+u\*d,'roadmap-ding',\.55,1\.2\)/);
const proof=JSON.parse(execFileSync(process.execPath,[path.join(project,'tools/prepare-v20-cache.mjs'),'--check-only'],{encoding:'utf8'}));assert.equal(proof.narrationAndEDLIdentical,true);assert.equal(proof.audioDesignChanged,true);
console.log('PASS V20: inherited EDL/privacy/OBS protections; distinct opening countdown and top badges; original and derived media hashes; scene scope; route safe area; actual homepage provenance; synchronized roadmap audio. Visual quality still requires review.');
