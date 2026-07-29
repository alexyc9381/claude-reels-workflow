import numpy as np, subprocess, io, json
from PIL import Image
FF="/Users/alexchensmacmini/Downloads/matchtern-longform/tools/node_modules/ffmpeg-static/ffmpeg"
def grab(v,t):
    p=subprocess.run([FF,"-v","error","-ss",str(t),"-i",f"{v}.mp4","-frames:v","1","-f","image2","-c:v","png","-"],capture_output=True)
    return np.asarray(Image.open(io.BytesIO(p.stdout)).convert("L"),dtype=np.float32)
def ncc_shift(A,B):
    """best normalised correlation over all integer shifts, via FFT."""
    A=A-A.mean(); B=B-B.mean()
    H=max(A.shape[0],B.shape[0]); W=max(A.shape[1],B.shape[1])
    Ap=np.zeros((H,W)); Ap[:A.shape[0],:A.shape[1]]=A
    Bp=np.zeros((H,W)); Bp[:B.shape[0],:B.shape[1]]=B
    C=np.fft.irfft2(np.fft.rfft2(Ap)*np.conj(np.fft.rfft2(Bp)),s=(H,W))
    n=np.sqrt((A**2).sum()*(B**2).sum())
    i=np.unravel_index(np.argmax(C),C.shape)
    return float(C.max()/n), (i[0]-H if i[0]>H//2 else i[0], i[1]-W if i[1]>W//2 else i[1])
FPS={"A":24.0,"B":24000/1001}
ev=json.load(open("events.json"))
for v in ("A","B"):
    fps=FPS[v]; runs=ev[v]["runs"]
    pairs=[(runs[i],runs[i+1]) for i in range(len(runs)-1) if runs[i][2] and not runs[i+1][2]]
    print(f"\n===== {v}")
    for (a0,c0,_),(a1,c1,_) in pairs[:4]:
        Fb=grab(v,(c0-2)/fps); Ff=grab(v,(a1+2)/fps)
        board=Fb[840:1280, 45:675]                       # person as shown in board mode
        best=None
        for s in np.arange(1.6,3.21,0.05):
            h=int(Ff.shape[0]/s); w=int(Ff.shape[1]/s)
            small=np.asarray(Image.fromarray(Ff).resize((w,h),Image.BILINEAR),dtype=np.float32)
            r,sh=ncc_shift(board,small)
            if best is None or r>best[0]: best=(r,s,sh)
        print(f"   cut {(a1+2)/fps:6.2f}s -> scale {best[1]:.2f}x  ncc={best[0]:.3f}  shift={best[2]}")
