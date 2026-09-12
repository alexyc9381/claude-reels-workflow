// Copied to the root of the portable handoff archive as restore.mjs.
import {createReadStream,existsSync,readFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const base=path.dirname(fileURLToPath(import.meta.url));
const manifest=JSON.parse(readFileSync(path.join(base,'handoff-manifest.json'),'utf8'));
const run=(cmd,args,cwd=base)=>{const r=spawnSync(cmd,args,{cwd,stdio:'inherit'});if(r.error)throw r.error;if(r.status!==0)throw Error(`${cmd} failed (${r.status})`);};
const hash=async file=>{const h=createHash('sha256');for await(const chunk of createReadStream(file))h.update(chunk);return h.digest('hex');};
if(Number(process.versions.node.split('.')[0])<20)throw Error('Install Node.js 22 LTS or a newer compatible LTS from nodejs.org, then retry.');
console.log('Checking all working media and the Git bundle. Nothing is deleted or overwritten.');
for(const item of manifest.files){
 const file=path.resolve(base,item.path);
 if(!file.startsWith(base+path.sep))throw Error('Unsafe manifest path');
 if(!existsSync(file)||await hash(file)!==item.sha256)throw Error(`Missing or damaged file: ${item.path}. Re-download the complete ZIP.`);
}
const repo=path.join(base,'work/repos/claude-reels-workflow');
if(!existsSync(repo)){
 mkdirSync(path.dirname(repo),{recursive:true});
 run('git',['clone','--branch','main',path.join(base,'repository.bundle'),repo]);
 run('git',['remote','set-url','origin',manifest.repository],repo);
}else if(!existsSync(path.join(repo,'.git')))throw Error('Existing repository path is not a Git checkout. Preserve it and unpack the handoff into a new folder.');
run('git',['merge-base','--is-ancestor',manifest.commit,'HEAD'],repo);
console.log('Verified working media and restored Git history. Current edits are preserved.');
if(process.argv.includes('--verify-only'))process.exit(0);
const video=path.join(repo,'video');
if(!existsSync(path.join(video,'node_modules/@remotion/cli/remotion-cli.js')))run('npm',['ci'],video);
console.log('Opening HiggsfieldRoughCut in Remotion. Leave this Terminal window running.');
run(process.execPath,[path.join(video,'node_modules/@remotion/cli/remotion-cli.js'),'studio','src/youtube-roughcut.tsx',
 '--props='+path.join(repo,'youtube-video-editing-system/projects/higgsfield-replacement/roughcut.props.json'),
 '--public-dir='+path.join(base,'work/higgsfield-replacement/public'),
 ...(process.argv.includes('--no-open')?['--no-open']:[])],video);
