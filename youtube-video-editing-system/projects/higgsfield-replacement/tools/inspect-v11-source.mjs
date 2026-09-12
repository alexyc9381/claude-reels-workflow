import {execFileSync} from 'node:child_process';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import path from 'node:path';
const base=process.cwd(),work=path.join(base,'work/higgsfield-replacement'),out=path.join(work,'revision-v11/source');
mkdirSync(out,{recursive:true});
const ff=execFileSync('python3',['-c','import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())'],{encoding:'utf8'}).trim();
const asr='/Users/alexchensmacmini/Downloads/matchtern-longform/tools/whisper.cpp';
const rows=[];
for(const [id,start,end] of [['detail-bridge',1804,1814],['veo-playback',1847,1877],['sound-retake',2013,2023]]){
 const dest=path.join(out,id);
 execFileSync(ff,['-v','error','-y','-ss',String(start),'-i',path.join(work,'public/obs.mp4'),'-t',String(end-start),'-ac','1','-ar','16000',dest+'.wav']);
 execFileSync(path.join(asr,'build/bin/whisper-cli'),['-m',path.join(asr,'models/ggml-small.en.bin'),'-f',dest+'.wav','-l','en','-oj','-otxt','-of',dest,'-ml','1','-t','3'],{stdio:'ignore'});
 const transcript=JSON.parse(readFileSync(dest+'.json','utf8'));
 rows.push({id,start,end,tokens:transcript.transcription.map(s=>({start:start+s.offsets.from/1000,end:start+s.offsets.to/1000,text:s.text}))});
 console.log(id,readFileSync(dest+'.txt','utf8'));
}
writeFileSync(path.join(out,'word-timing.json'),JSON.stringify(rows,null,2));
console.log('Source timing saved:',out);
