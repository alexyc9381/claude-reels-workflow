import numpy as np, wave
def rd(p):
    w=wave.open(p,'rb'); n=w.getnframes(); sr=w.getframerate(); ch=w.getnchannels()
    a=np.frombuffer(w.readframes(n),dtype=np.int16).astype(np.float32)/32768
    if ch>1: a=a.reshape(-1,ch).mean(1)
    return a,sr
for v in ("A","B"):
    x,sr=rd(f"{v}_48k.wav")
    N=2048; H=512
    nf=(len(x)-N)//H
    win=np.hanning(N)
    S=np.abs(np.fft.rfft(np.lib.stride_tricks.sliding_window_view(x,N)[::H][:nf]*win,axis=1))
    freqs=np.fft.rfftfreq(N,1/sr)
    rms=20*np.log10(np.maximum(np.sqrt((S**2).sum(1))/N,1e-9))
    t=np.arange(nf)*H/sr
    thr=np.percentile(rms,12)
    gaps=rms<thr
    print(f"\n===== {v}  frames={nf}  rms p50={np.percentile(rms,50):.1f}dB  p12={thr:.1f}dB  min={rms.min():.1f}dB")
    print(f"   quiet-frame share {gaps.mean()*100:.0f}%   longest quiet run {max((sum(1 for _ in g) for g in ''.join('1' if q else '0' for q in gaps).split('0')), default=0)*H/sr:.2f}s")
    # spectral character of the QUIET frames  (music bed test)
    band=lambda lo,hi: S[:, (freqs>=lo)&(freqs<hi)].mean(1)
    for name,(lo,hi) in dict(sub=(30,80),bass=(80,250),mid=(250,2000),hi=(4000,10000)).items():
        b=band(lo,hi)
        q=20*np.log10(np.maximum(b[gaps].mean(),1e-9)); s=20*np.log10(np.maximum(b[~gaps].mean(),1e-9))
        print(f"   {name:4s} quiet {q:7.1f}dB   speech {s:7.1f}dB   delta {s-q:6.1f}dB")
    # tonality: spectral flatness in quiet frames (music = peaky/low flatness, room = flat)
    Sq=S[gaps][:, (freqs>50)&(freqs<4000)]+1e-9
    flat=np.exp(np.log(Sq).mean(1))/Sq.mean(1)
    Ss=S[~gaps][:, (freqs>50)&(freqs<4000)]+1e-9
    flats=np.exp(np.log(Ss).mean(1))/Ss.mean(1)
    print(f"   spectral flatness: quiet {flat.mean():.3f}   speech {flats.mean():.3f}   (1.0=noise, ~0=tonal)")
