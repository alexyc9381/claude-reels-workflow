import subprocess, json, math, sys
FF="ffmpeg"; FP="ffprobe"
LEN=35.30
# ⛔ THE HOUSE BED IS A REAL TRACK, and "the house bed" is a PASSAGE, not a
# track: ados_bed_loud.wav IS the located house passage (165.9s into ADOS) and
# ebm_bed_hot.wav is the located EBM one (64.9s in). Three cuts get three
# PASSAGES, never one file at three volumes.
CUTS=[("136adhd_bed.wav",       "ados_bed_loud.wav", 0.00),
      ("136adhd_bed_amber.wav", "ebm_bed_hot.wav",   0.00),
      ("136adhd_bed_steel.wav", "ados_bed_loud.wav", 14.70)]
# ⛔ COMPRESS BEFORE YOU LEVEL: loudnorm sets an INTEGRATED level, so a track
# with wide dynamics puts its brass hits far above target and a swell inside a
# VO gap reads as air.
# ⛔ AND THE HOUSE BED IS BASS-FORWARD (55-70% under 250Hz) — a bed that keeps
# its midrange fights the voice however far you turn it down.
CH=("acompressor=threshold=0.045:ratio=4:attack=25:release=260,"
    "lowshelf=f=120:g=2,equalizer=f=2200:g=-4,lowpass=f=5000,"
    "loudnorm=I=-24:TP=-2:LRA=7")
def rms_db(path, t0, t1):
    import numpy as np
    raw=subprocess.run([FF,"-v","error","-ss",str(t0),"-to",str(t1),"-i",path,"-f","f32le","-ac","1","-ar","48000","-"],capture_output=True).stdout
    a=np.frombuffer(raw,dtype=np.float32)
    return 20*math.log10(max(1e-9,float((a**2).mean())**0.5))
def band(path):
    import numpy as np
    raw=subprocess.run([FF,"-v","error","-i",path,"-f","f32le","-ac","1","-ar","48000","-"],capture_output=True).stdout
    a=np.frombuffer(raw,dtype=np.float32)[:48000*20]
    sp=np.abs(np.fft.rfft(a*np.hanning(len(a))))**2
    fr=np.fft.rfftfreq(len(a),1/48000)
    return float(sp[fr<250].sum()/sp.sum())
for out,src,ss in CUTS:
    subprocess.run([FF,"-y","-v","error","-ss",str(ss),"-t",str(LEN),"-i","public/"+src,
                    "-af",CH,"-ar","48000","-ac","1","-c:a","pcm_s16le","public/"+out],check=True)
    d=float(subprocess.run([FP,"-v","error","-show_entries","format=duration","-of","csv=p=0","public/"+out],capture_output=True,text=True).stdout)
    # ⛔ MUSIC_ONSET_0: the bed must be audible inside 150 ms
    on=None
    import numpy as np
    raw=subprocess.run([FF,"-v","error","-i","public/"+out,"-f","f32le","-ac","1","-ar","48000","-"],capture_output=True).stdout
    a=np.frombuffer(raw,dtype=np.float32)
    for i in range(0,int(0.6*48000),240):
        if 20*math.log10(max(1e-9,float((a[i:i+240]**2).mean())**0.5)) > -40: on=i/48000; break
    print(f"{out:26s} {d:6.2f}s  onset {on}  <250Hz {band('public/'+out)*100:.1f}%  first150ms {rms_db('public/'+out,0,0.15):.1f} dB")
