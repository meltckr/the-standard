import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { issues } from '../content/issues.js';
const base = '15aab8e54f5ae58a1799f305b66a89560e3cb712';
const baseline = await import(`data:text/javascript;base64,${Buffer.from(execFileSync('git',['show',`${base}:content/issues.js`])).toString('base64')}`);
assert.deepEqual(issues.slice(0,4),baseline.issues,'Published issue objects must be unchanged');
for (const name of ['mel-audio-player.js','player-utils.mjs']) {
 assert.deepEqual(await readFile(`assets/mel-audio-player/${name}`),execFileSync('git',['show',`${base}:assets/mel-audio-player/${name}`]));
}
const legacy = await readFile('assets/mel-audio-player/mel-audio-player.js','utf8');
const neutral = await readFile('assets/avc-audio-player/avc-audio-player.js','utf8');
assert.equal(neutral,legacy.replaceAll('mel-audio-player','avc-audio-player').replaceAll('MelAudioPlayer','AvcAudioPlayer').replaceAll('formatTime(duration)','formatTime(Math.round(duration))'),'Player changes are limited to neutral tokens and total-duration rounding');
assert.ok(!/Mel|mel-/.test(neutral));
const { formatTime } = await import('../assets/avc-audio-player/player-utils.mjs');
assert.equal(formatTime(Math.round(264.704875)), '4:25');
assert.equal(formatTime(264.704875), '4:24', 'Elapsed-time floor semantics remain unchanged');
const issue = issues.at(-1);
const html = await readFile(`dist/issues/${issue.slug}/index.html`,'utf8');
assert.ok(html.includes(`href="${issue.share.url}"`));
assert.ok(html.includes('content="noindex, nofollow"'));
assert.ok(!html.includes('article:published_time'));
const data = JSON.parse(html.match(/data-structured-data>(.*?)<\/script>/s)[1]);
assert.equal(data.headline,issue.title);
assert.ok(data.associatedMedia, 'Current audio must be included in the revised Article');
assert.equal(data.associatedMedia.name, issue.title);
assert.equal(data.associatedMedia.transcript, issue.audio.transcript.join('\n\n'));
assert.ok(data.associatedMedia.contentUrl.endsWith('standard-005-make-the-assist-visible-arizona-v12-v8.mp3'));
assert.ok(html.includes('rel="alternate" type="audio/mpeg"'));
assert.ok(!issue.audio.status && !issue.audio.reviewNotice);
const approvedPage = execFileSync('git',['show','cb9f3036608c8eae253a3ec300bc031d6ebce4b2:content/review/005-make-the-assist-visible-v8-page.txt'],{encoding:'utf8'}).trim();
const approvedAudio = execFileSync('git',['show','cb9f3036608c8eae253a3ec300bc031d6ebce4b2:content/review/005-make-the-assist-visible-v8-audio.txt'],{encoding:'utf8'}).trim();
assert.equal([...issue.sections.flatMap(s=>s.body),issue.closingQuestion,issue.closingParagraph,issue.signoff].join('\n\n'),approvedPage,'Page paragraphs must exactly match approved v8');
assert.equal(issue.audio.transcript.join('\n\n'),approvedAudio,'Audio must exactly match approved v8 spoken numbers');
assert.equal(issue.textApproval.status,'approved');
assert.equal(issue.reviewVersion,'v8');
assert.equal(issue.applicationPoints.length,0,'No previous application copy added to approved v8');
for (const file of ['assets/audio/standard-005-reward-the-assist-arizona-v12-v1.mp3','content/audio/005-reward-the-assist-arizona-v12-v1.txt','content/audio/005-reward-the-assist-arizona-v12-v1.json']) {
 assert.deepEqual(await readFile(file), execFileSync('git',['show',`65b54ade7068cb712bdfeae9fb82cf7f606c53bf:${file}`], { maxBuffer: 10 * 1024 * 1024 }), 'Prior audio must be preserved');
}
for (const file of ['assets/audio/standard-005-make-the-assist-visible-arizona-v12-v2.mp3','content/audio/005-make-the-assist-visible-arizona-v12-v2.txt','content/audio/005-make-the-assist-visible-arizona-v12-v2.json']) {
 assert.deepEqual(await readFile(file), execFileSync('git',['show',`5b8bcaf0729dc5a8638c774369d57bc1c2fc474b:${file}`], { maxBuffer: 10 * 1024 * 1024 }), 'Superseded v2 audio must be preserved');
}
for (const file of ['assets/audio/standard-005-make-the-assist-visible-arizona-v12-v3.mp3','content/audio/005-make-the-assist-visible-arizona-v12-v3.txt','content/audio/005-make-the-assist-visible-arizona-v12-v3.json']) {
 assert.deepEqual(await readFile(file),execFileSync('git',['show',`69bbbc4d1af48ec10bf61ea41d2571e100d1e51b:${file}`],{maxBuffer:10*1024*1024}),'Prior v3 preserved');
}
for (const file of ['assets/audio/standard-005-make-the-assist-visible-arizona-v12-v4.mp3','content/audio/005-make-the-assist-visible-arizona-v12-v4.txt','content/audio/005-make-the-assist-visible-arizona-v12-v4.json']) {
 assert.deepEqual(await readFile(file),execFileSync('git',['show',`5ddd8f4e83a5a8d1e735dc1e564ae08846818603:${file}`],{maxBuffer:10*1024*1024}),'Approved v4 preserved');
}
for (const file of ['assets/audio/standard-005-make-the-assist-visible-arizona-v12-v5.mp3','content/audio/005-make-the-assist-visible-arizona-v12-v5.txt','content/audio/005-make-the-assist-visible-arizona-v12-v5.json']) {
 assert.deepEqual(await readFile(file),execFileSync('git',['show',`b548b7a3e5c34b27b43dc6c89e1324a7cdf7c153:${file}`],{maxBuffer:10*1024*1024}),'Prior v5 preserved');
}
assert.equal(issue.title, 'Make the Assist Visible');
assert.equal(issue.closingStandard, issue.title);
assert.equal(issue.sections[0].id, 'story');
assert.equal(issue.closingQuestion, 'Who helped create our last important result, and would anyone know it from the way we celebrated?');
assert.ok(issue.sources.some(s=>s.includes('obamawhitehouse.archives.gov')));
assert.ok(issue.sources.some(s=>s.includes('uwmcareers.com/blog/doing-well-by-doing-good')));
assert.ok(issue.sources.some(s=>s.includes('20261007_PHXCHI_book.pdf#page=9') && s.includes('6:57') && s.includes('official current Suns roster')));
assert.ok(!JSON.stringify(issue).match(/Crowder|Ayton|Booker.s screen|June 22, 2021/));
const essay = [issue.title,issue.thesis,...issue.sections.flatMap(s=>[s.title,...s.body]),issue.applicationTitle,...issue.applicationPoints,issue.closingQuestion,issue.closingStandard].join(' ');
assert.ok(essay.split(/\s+/).length < 800, 'Essay must read in under four minutes at 200 wpm');
assert.ok(!/\b(can be|meaningful signs|leaders have an opportunity)\b/i.test(essay));
assert.equal(data.image.width,1200); assert.equal(data.image.height,630);
assert.ok(!(await readFile('dist/sitemap.xml','utf8')).includes(issue.slug),'Review drafts stay out of publication sitemap');
assert.ok((await readFile('dist/robots.txt','utf8')).includes('https://meltckr.github.io/the-standard/sitemap.xml'));
const mp3 = await readFile(issue.audio.src.slice(1));
const meta = JSON.parse(await readFile(issue.audio.metadataFile.slice(1),'utf8'));
assert.equal(createHash('sha256').update(mp3).digest('hex'),meta.sha256);
assert.equal(meta.sizeBytes,mp3.length);
assert.ok(meta.durationSeconds < 240, 'Current audio must be under four minutes');
assert.equal(meta.tempoMultiplierRelativeToRawSentences, 1.12, 'Mel requested brisker normal-speed delivery');
assert.equal((await readFile(issue.audio.transcriptFile.slice(1),'utf8')).trim(),approvedAudio);
assert.ok(meta.measuredTruePeakDbtp <= -1.5);
assert.equal(meta.listeningReview.status, 'pending');
const seconds = Math.round(meta.durationSeconds);
assert.equal(data.associatedMedia.duration, `PT${Math.floor(seconds/60)}M${seconds%60}S`);
assert.ok(issue.audio.transcript.join(' ').includes(issue.closingQuestion));
assert.equal(issue.audio.transcript.at(-1), 'Much love my brother. Dominate!');
assert.ok(mp3.subarray(0,4096).includes(Buffer.from('Info')) || mp3.subarray(0,4096).includes(Buffer.from('Xing')));
console.log('005 review integration checks passed: archives, neutral player parity, built route/head, draft gate, restricted Suns revision, preserved prior audio and current under-four-minute audio/hash/transcript.');
