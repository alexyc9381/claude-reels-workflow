import numpy as np, subprocess
FF="/Users/alexchensmacmini/Downloads/matchtern-longform/tools/node_modules/ffmpeg-static/ffmpeg"
Wd,Hd=360,640
modes=np.load("modes.npy",allow_pickle=True).item()
for v in ("A","B"):
    p=subprocess.run([FF,"-v","error","-i",f"{v}.mp4","-vf",f"scale={Wd}:{Hd}","-f","rawvideo","-pix_fmt","rgb24","-"],capture_output=True)
    a=np.frombuffer(p.stdout,dtype=np.uint8); n=a.size//(Wd*Hd*3)
    F=a[:n*Wd*Hd*3].reshape(n,Hd,Wd,3); b=modes[v][:n]
    G=F[b][:, 0:400, :, :].reshape(-1,3).astype(np.float32)   # graphic zone only (y<800 full-res), board frames
    mx=G.max(1); mn=G.min(1)
    sat=np.where(mx>0,(mx-mn)/np.maximum(mx,1),0)
    red=(G[:,0]>120)&(sat>0.55)&(G[:,0]-G[:,1]>70)&(G[:,1]<160)
    print(f"\n===== {v}: saturated reds in board graphic zone: {red.mean()*100:.3f}% of px")
    if red.sum():
        q=(G[red]//16*16+8).astype(int); key=q[:,0]*65536+q[:,1]*256+q[:,2]
        u,c=np.unique(key,return_counts=True); o=np.argsort(c)[::-1][:6]
        for i,k in zip(o,u[o]):
            print(f"   #{int(k//65536):02X}{int((k//256)%256):02X}{int(k%256):02X}  {c[i]/red.sum()*100:5.1f}%")
    # near-white and near-black anchors in the board zone
    for nm,m in (("white",G.mean(1)>235),("card-white",(G.mean(1)>215)&(G.mean(1)<=235)),("ink",G.mean(1)<40)):
        if m.sum(): print(f"   {nm:11s} mean #{int(G[m][:,0].mean()):02X}{int(G[m][:,1].mean()):02X}{int(G[m][:,2].mean()):02X}  {m.mean()*100:5.1f}%")
