import {execFileSync} from 'node:child_process';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import path from 'node:path';
const base=process.cwd(),out=path.join(base,'work/higgsfield-replacement/revision-v12/source');mkdirSync(out,{recursive:true});
const ff=execFileSync('python3',['-c','import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())'],{encoding:'utf8'}).trim();
const asr='/Users/alexchensmacmini/Downloads/matchtern-longform/tools/whisper.cpp';
for(const [id,start,duration] of [['hair-fabric',1874.5,25],['repeat',1981,49],['reveal',2268,8]]){
 const dest=path.join(out,id);
 execFileSync(ff,['-v','error','-y','-ss',String(start),'-i',path.join(base,'work/higgsfield-replacement/public/obs.mp4'),'-t',String(duration),'-ac','1','-ar','16000',dest+'.wav']);
 execFileSync(path.join(asr,'build/bin/whisper-cli'),['-m',path.join(asr,'models/ggml-small.en.bin'),'-f',dest+'.wav','-l','en','-ojf','-otxt','-of',dest,'-t','3'],{stdio:'ignore'});
 console.log(id,start,readFileSync(dest+'.txt','utf8'));
}
