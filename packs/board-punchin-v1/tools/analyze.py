import numpy as np, subprocess, json, sys
FF="/Users/alexchensmacmini/Downloads/matchtern-longform/tools/node_modules/ffmpeg-static/ffmpeg"
Wd,Hd = 144,256                      # 1/5 of 720x1280
FPS = {"A":24.0, "B":24000/1001}
def frames(v):
    p = subprocess.run([FF,"-v","error","-i",f"{v}.mp4","-f","rawvideo","-pix_fmt","rgb24",
                        "-vf",f"scale={Wd}:{Hd}","-"],capture_output=True)
    a = np.frombuffer(p.stdout,dtype=np.uint8)
    n = a.size//(Wd*Hd*3)
    return a[:n*Wd*Hd*3].reshape(n,Hd,Wd,3)

# region boxes in the 144x256 space (from measured 720x1280 geometry)
# card: x 45..674 -> 9..135 ; top y 936 -> 187
R = {
 "top":   (slice(4,110),  slice(4,140)),   # board/graphic area  y16..440 px720
 "mid":   (slice(110,160),slice(4,140)),   # artifact lower / caption zone
 "card":  (slice(196,252),slice(14,130)),  # interior of talking-head card (below its top edge)
}
out={}
for v in ("A","B"):
    F = frames(v).astype(np.int16)
    n=len(F); fps=FPS[v]
    g = F.mean(3)
    d_full = np.abs(np.diff(g,axis=0)).mean((1,2))
    reg = {k: np.abs(np.diff(g[:,ys,xs],axis=0)).mean((1,2)) for k,(ys,xs) in R.items()}
    # per-frame colour stats
    mx=F.max(3); mn=F.min(3)
    sat=((mx-mn)/np.maximum(mx,1)).mean((1,2))
    luma=g.mean((1,2))
    # board-mode detector: corner patches flat & bright(A)/dark(B) + card edge present
    corner = np.concatenate([F[:,6:22,6:22].reshape(n,-1,3), F[:,6:22,122:138].reshape(n,-1,3)],1)
    corner_std = corner.reshape(n,-1).std(1)
    # horizontal edge strength at the card top row (y=187 in full res -> 187/5=37.4 ... recompute)
    yc = int(round(936/1280*Hd))
    edge = np.abs(g[:,yc+1,:]-g[:,yc-2,:]).mean(1)
    out[v]=dict(n=n,fps=fps,dur=n/fps,d_full=d_full,reg=reg,sat=sat,luma=luma,
                corner_std=corner_std,edge=edge,yc=yc)
    print(f"{v}: {n} frames @{fps:.3f} = {n/fps:.2f}s | luma {luma.mean():.1f} | sat {sat.mean():.3f}")
    del F
np.save("metrics.npy",out,allow_pickle=True)
