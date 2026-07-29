import numpy as np, wave, json
def rd(p):
    w=wave.open(p,'rb'); n=w.getnframes(); sr=w.getframerate(); ch=w.getnchannels()
    a=np.frombuffer(w.readframes(n),dtype=np.int16).astype(np.float32)/32768
    if ch>1: a=a.reshape(-1,ch).mean(1)
    return a,sr
for v in ("A","B"):
    x,sr=rd(f"{v}_48k.wav")
    N=2048;H=256; nf=(len(x)-N)//H
    S=np.abs(np.fft.rfft(np.lib.stride_tricks.sliding_window_view(x,N)[::H][:nf]*np.hanning(N),axis=1))
    fr=np.fft.rfftfreq(N,1/sr); fps_=sr/H
    low=S[:,(fr>=40)&(fr<160)].mean(1)
    # onset envelope = half-wave rectified diff
    on=np.maximum(np.diff(np.log(low+1e-9)),0)
    on=on-on.mean()
    ac=np.correlate(on,on,'full')[len(on)-1:]
    ac/=ac[0]
    lags=np.arange(len(ac))/fps_
    m=(lags>0.30)&(lags<1.30)
    k=np.argmax(ac[m]); lag=lags[m][k]; peak=ac[m][k]
    print(f"\n===== {v}  bass-onset autocorrelation")
    print(f"   best lag {lag:.3f}s = {60/lag:5.1f} BPM   peak {peak:.3f}")
    top=np.argsort(ac[m])[-5:][::-1]
    print("   top lags:", [(round(float(lags[m][i]),3), round(float(60/lags[m][i]),1), round(float(ac[m][i]),3)) for i in top])
    # broadband transients (SFX candidates)
    bb=S[:,(fr>2000)&(fr<12000)].mean(1)
    d=np.maximum(np.diff(np.log(bb+1e-9)),0)
    th=np.percentile(d,99.5)
    idx=np.where(d>th)[0]
    keep=[];last=-99
    for i in idx:
        t=i/fps_
        if t-last>0.20: keep.append(round(float(t),2)); last=t
    print(f"   HF transients (>p99.5): {len(keep)}  -> {keep[:25]}")
