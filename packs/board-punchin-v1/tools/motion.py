import numpy as np, subprocess, json
FF="/Users/alexchensmacmini/Downloads/matchtern-longform/tools/node_modules/ffmpeg-static/ffmpeg"
FPS={"A":24.0,"B":24000/1001}
ev=json.load(open("events.json"))
Wd,Hd=180,320
def load(v):
    p=subprocess.run([FF,"-v","error","-i",f"{v}.mp4","-vf",f"scale={Wd}:{Hd}",
                      "-f","rawvideo","-pix_fmt","gray","-"],capture_output=True)
    a=np.frombuffer(p.stdout,dtype=np.uint8); n=a.size//(Wd*Hd)
    return a[:n*Wd*Hd].reshape(n,Hd,Wd).astype(np.float32)
def shift_scale(a,b):
    """phase correlation -> (dy,dx) integer shift between two patches"""
    A=np.fft.rfft2(a-a.mean()); B=np.fft.rfft2(b-b.mean())
    R=A*np.conj(B); R/=np.maximum(np.abs(R),1e-9)
    c=np.fft.irfft2(R,s=a.shape)
    i=np.unravel_index(np.argmax(c),c.shape)
    dy=i[0]-a.shape[0] if i[0]>a.shape[0]//2 else i[0]
    dx=i[1]-a.shape[1] if i[1]>a.shape[1]//2 else i[1]
    return dy,dx,float(c.max())
for v in ("A","B"):
    F=load(v); fps=FPS[v]; runs=ev[v]["runs"]
    print(f"\n===== {v}  camera / board stability per run (patch = static background)")
    for a,c,isboard in runs:
        if c-a < 12: continue
        if isboard:  patch=(slice(8,60),slice(10,170))      # top of board (bg+grid), above artifacts
        else:        patch=(slice(4,70),slice(4,60))        # room upper-left, no person
        p0=F[a+3][patch]; 
        res=[]
        for t in (a+3, a+(c-a)//2, c-3):
            dy,dx,pk = shift_scale(p0, F[t][patch])
            res.append((t, dy,dx,round(pk,3)))
        rng=max(abs(r[1]) for r in res), max(abs(r[2]) for r in res)
        # residual energy start vs end (scale/zoom shows as blur/mismatch even at 0 shift)
        resid=np.abs(F[c-3][patch]-F[a+3][patch]).mean()
        print(f"  run {a:5d}-{c:5d} ({(c-a+1)/fps:5.2f}s) {'BOARD' if isboard else 'FULL '} "
              f"maxshift dy={rng[0]} dx={rng[1]}  resid={resid:6.2f}  peaks={[r[3] for r in res]}")
