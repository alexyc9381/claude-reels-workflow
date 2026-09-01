"""Reel 122 bed. ⛔⛔⛔ TWO SEPARATE THINGS MAKE THE HOUSE BED, AND I GOT BOTH
WRONG THE FIRST TIME.

1 · THE PASSAGE. `ados_bed_loud.wav` is not "Another Day Of Sun", it is ONE
    PASSAGE of it — located by envelope cross-correlation at **165.9s**.
    `ados_bed.wav` is the **0.0s** opening and `ebm_bed_hot.wav` is **64.9s**.
    I re-derived a window from scratch by scoring mean level / onset / internal
    range and landed on 84.0s, which is a different section of the song. The
    memory says it in one line and I read it and did it anyway: *when a subsystem
    has a house default, COUNT ITS USES ACROSS SHIPPED WORK before writing a new
    one.* Locating the passage is a 20-line correlation, not a judgement call.

2 · ⭐⭐⭐ THE HOUSE BED IS BASS-FORWARD, AND THAT IS THE ACTUAL SOUND.
    Measured across every bed in `public/`:

        ados_bed_loud  90.0% under 250Hz      120unlazy   16.2%
        ebm_bed         69.4%                  117know     14.9%
        ebm_bed_hot     65.8%                  115star     20.6%
        116_ebm_bed     71.4%  <- the reel     119ox       23.8%
                                  116 FIX      MY v1       28.8%

    The left column is the house sound. The right column is the drift the
    `house_bed_is_a_real_track` memory describes — and note that using the real
    TRACK is only half of it. Reels 115/117/119/120 all used real source audio
    and still came out midrange-forward, because nobody low-passed it. A bed
    that keeps its midrange fights the voice no matter how far you turn it down;
    the reason the house bed can sit audibly under a VO is that there is almost
    nothing left of it above 250Hz.
    ⛔ So this is NOT "turn the music down". It is a real LOW PASS. Target the
    65-75% band that `ebm_bed_hot` and the corrected `116_ebm_bed` occupy.

⛔ Compress BEFORE levelling: loudnorm sets an INTEGRATED level, so a wide
   internal range puts brass hits far above target and they read as swells.
⛔ NO `afade in`: MUSIC_ONSET_0 wants the bed audible inside 150ms."""
import subprocess, array, math
FF='tools/node_modules/ffmpeg-static/ffmpeg'
VO='video/public/122_hardware_vo.wav'
DUR=61.20
# name, source, THE HOUSE PASSAGE (located by cross-correlation, not chosen)
BEDS=[("122hw_bed.wav",       "/tmp/ados_src.wav", 165.9),   # = ados_bed_loud
            # ⛔ ados @0.0 IS the `ados_bed.wav` passage, but the raw track opens
      #    sparse: onset measured 0.770s, which fails MUSIC_ONSET_0's 150ms bar.
      #    The pre-made house file was trimmed INTO the phrase; a raw cut at 0
      #    is not the same thing. 46.0s is the loudest first-150ms of any 62s
      #    window in the track that is not the house passage itself.
      ("122hw_bed_amber.wav", "/tmp/ados_src.wav",  46.0),
      ("122hw_bed_steel.wav", "/tmp/ebm_src.wav",   64.9)]   # = ebm_bed_hot
def run(a): subprocess.run([FF,'-y','-v','error']+a, check=True)
def stats(p):
    d=subprocess.run([FF,'-v','error','-i',p,'-ac','1','-ar','44100','-f','s16le','-'],
                     capture_output=True).stdout
    import numpy as np
    x=np.frombuffer(d,dtype=np.int16).astype(np.float32)/32768
    n=8192; acc=np.zeros(n//2+1)
    for i in range(0,len(x)-n,n): acc += np.abs(np.fft.rfft(x[i:i+n]*np.hanning(n)))**2
    fr=np.fft.rfftfreq(n,1/44100); tot=acc.sum()+1e-12
    low=float(acc[fr<250].sum()/tot*100)
    a2=array.array('h'); a2.frombytes(d[:len(d)//2*2])
    on=None
    for i in range(400):
        s=a2[i*220:(i+1)*220]
        if not len(s): break
        db=20*math.log10(math.sqrt(sum(v*v for v in s)/len(s)+1e-9)/32768)
        if db>-42: on=i*0.005; break
    return low, on
for out, src, at in BEDS:
    run(['-ss', f'{at:.2f}', '-stream_loop','2','-i', src, '-i', VO, '-filter_complex',
        f"[0:a]aformat=channel_layouts=stereo,atrim=0:{DUR},"
        "acompressor=threshold=0.12:ratio=4:attack=18:release=260,"
        # ⭐ THE LOW PASS — this is the house sound, not an EQ nicety.
        "lowpass=f=560:p=2,lowpass=f=820:p=2,"
        "treble=g=-16:f=3000,equalizer=f=9000:t=q:w=0.8:g=-8,"
        # the vocal pocket, on what little is left up there
        "equalizer=f=450:t=q:w=1.1:g=-3,equalizer=f=1400:t=q:w=1.2:g=-4,"
        "bass=g=3:f=90[bedeq];"
        f"[1:a]aformat=channel_layouts=stereo,apad=whole_dur={DUR}[voc];"
        "[bedeq][voc]sidechaincompress=threshold=0.05:ratio=6:attack=12:release=340[duck];"
        f"[duck]loudnorm=I=-20:TP=-3:LRA=11,afade=t=out:st={DUR-1.6:.2f}:d=1.5[out]",
        '-map','[out]','-t',f'{DUR}','-ar','48000','-ac','2','-c:a','pcm_s16le',
        f'video/public/{out}'])
    low, on = stats(f'video/public/{out}')
    print(f"{out:24} @{at:6.1f}s   <250Hz {low:5.1f}%  (house band 65-75)   "
          f"onset {on if on is not None else -1:.3f}s  {'ok' if on is not None and on<=0.15 else '⛔'}")
