import assert from 'node:assert/strict';
import {readFileSync,statSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const base='b11bb15c569377e68560c3d4a71d0e8f80ec278f';
const unchanged=['content/issues.js','assets/styles.css','assets/avc-audio-player/avc-audio-player.js','content/audio/005-make-the-assist-visible-arizona-v12-v9.txt','content/audio/005-make-the-assist-visible-arizona-v12-v9.json','content/review/005-make-the-assist-visible-v9-page.txt','assets/audio/standard-005-make-the-assist-visible-arizona-v12-v9.mp3','assets/og-005-make-the-assist-visible-v2.png'];
for(const file of unchanged) assert.deepEqual(readFileSync(file),execFileSync('git',['show',`${base}:${file}`],{maxBuffer:16*1024*1024}),`${file} must preserve approved bytes`);
const hash=createHash('sha256').update(readFileSync(unchanged[6])).digest('hex');assert.equal(hash,'8e6426abbf224c78839264b5f75cb3cf4e3f8e5b8bd92e1daf32ee64cfd51259');
assert.ok(statSync('assets/standard-005/assist-sculpture.webp').size<100000,'hero image must remain small');
const luminance=h=>{const rgb=h.match(/[a-f0-9]{2}/gi).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
const pairs=[['headline','#f5f1e8','#101e2c'],['hero labels','#c1c9ce','#101e2c'],['hero eyebrow','#daa16e','#101e2c'],['essay','#203244','#f5f1e8'],['navigation','#53616b','#f5f1e8'],['links','#315e86','#f5f1e8'],['entry button','#132538','#e4ad7c']];
for(const [name,a,b] of pairs){const x=luminance(a),y=luminance(b),ratio=(Math.max(x,y)+.05)/(Math.min(x,y)+.05);assert.ok(ratio>=4.5,`${name} contrast ${ratio}`);console.log(`${name}: ${ratio.toFixed(2)}:1`);}
console.log('Approved content, transcript, audio, share metadata, shared styles and player preserved; small hero and contrast checks pass.');
