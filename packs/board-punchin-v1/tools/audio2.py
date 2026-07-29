import numpy as np, wave, json
def rd(p):
    w=wave.open(p,'rb'); n=w.getnframes(); sr=w.getframerate(); ch=w.getnchannels()
    a=np.frombuffer(w.readframes(n),dtype=np.int16).astype(np.float32)/32768
    if ch>1: a=a.reshape(-1,ch).mean(1)
    return a,sr
ev=json.load(open("events.json"))
for v in ("A","B"):
    x,sr=rd(f"{v}_48k.wav"); N=2048;H=512; nf=(len(x)-N)//H
    W=np.lib.stride_tricks.sliding_window_view(x,N)[::H][:nf]
    rms=20*np.log10(np.maximum(np.sqrt((W**2).mean(1)),1e-9))
    print(f"\n===== {v}: noise-floor test (music bed would hold the floor UP)")
    for th in (-40,-45,-50,-55):
        print(f"   frames below {th}dB: {(rms<th).mean()*100:5.2f}%  ({(rms<th).sum()} of {nf})")
    print(f"   min {rms.min():.1f}dB  p1 {np.percentile(rms,1):.1f}dB  p5 {np.percentile(rms,5):.1f}dB")
    # --- SFX test: do HF transients land on cuts?
    S=np.abs(np.fft.rfft(W*np.hanning(N),axis=1)); fr=np.fft.rfftfreq(N,1/sr); fps_=sr/H
    bb=S[:,(fr>2000)&(fr<12000)].mean(1)
    d=np.maximum(np.diff(np.log(bb+1e-9)),0)
    tr=np.where(d>np.percentile(d,99))[0]/fps_
    cuts=np.array([e["t"] for e in ev[v]["ev"] if e["card"]>25])
    gfx =np.array([t for t,_,_ in json.load(open(f"{v}_gfx.json"))])
    for nm,arr in (("CUTS",cuts),("GFX",gfx)):
        if not len(arr): continue
        hit=sum(1 for c in arr if np.min(np.abs(tr-c))<0.12)
        # chance rate: transient density * window
        dens=len(tr)/(nf/fps_); exp=1-np.exp(-dens*0.24)
        print(f"   {nm}: {hit}/{len(arr)} within 120ms of an HF transient (chance {exp*100:.0f}%)")
