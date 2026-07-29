import numpy as np, subprocess, json
FF="/Users/alexchensmacmini/Downloads/matchtern-longform/tools/node_modules/ffmpeg-static/ffmpeg"
Wd,Hd=144,256
ev=json.load(open("events.json"))
for v in ("A","B"):
    p=subprocess.run([FF,"-v","error","-i",f"{v}.mp4","-vf",f"scale={Wd}:{Hd}","-f","rawvideo","-pix_fmt","gray","-"],capture_output=True)
    a=np.frombuffer(p.stdout,dtype=np.uint8); n=a.size//(Wd*Hd)
    F=a[:n*Wd*Hd].reshape(n,Hd,Wd).astype(np.float32)
    cuts=[e["f"] for e in ev[v]["ev"] if e["card"]>25]
    print(f"\n===== {v}: dissolve test on {len(cuts)} cuts")
    print("   (blend_err/jump  >0.8 = frame is a MIX (dissolve);  ~0 = hard cut)")
    rs=[]
    for k in cuts:
        if k<2 or k>=n-2: continue
        mix=0.5*(F[k-1]+F[k+1])
        blend=np.abs(F[k]-mix).mean()
        jump=np.abs(F[k-1]-F[k+1]).mean()
        after=np.abs(F[k]-F[k+1]).mean()
        rs.append((blend/max(jump,1e-6), after/max(jump,1e-6)))
    rs=np.array(rs)
    print(f"   blend_ratio: mean {rs[:,0].mean():.3f}  max {rs[:,0].max():.3f}")
    print(f"   frame k matches NEW shot (k vs k+1)/jump: mean {rs[:,1].mean():.3f}  max {rs[:,1].max():.3f}")
    print(f"   -> {'HARD CUTS (k belongs to new shot)' if rs[:,1].mean()<0.35 else 'CHECK'}")
