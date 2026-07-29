import numpy as np, subprocess, json
FF="/Users/alexchensmacmini/Downloads/matchtern-longform/tools/node_modules/ffmpeg-static/ffmpeg"
FPS={"A":24.0,"B":24000/1001}
for v in ("A","B"):
    p=subprocess.run([FF,"-v","error","-i",f"{v}.mp4","-vf","crop=720:130:0:20,scale=240:44",
                      "-f","rawvideo","-pix_fmt","gray","-"],capture_output=True)
    a=np.frombuffer(p.stdout,dtype=np.uint8); n=a.size//(240*44)
    F=a[:n*240*44].reshape(n,44,240).astype(np.float32)
    fps=FPS[v]
    ink=(np.abs(F-np.median(F,axis=(1,2),keepdims=True))>40).sum((1,2)).astype(float)
    d=np.abs(np.diff(F,axis=0)).mean((1,2))
    med=np.median(d); mad=np.median(np.abs(d-med))*1.4826; th=max(2.0,med+5*mad)
    hot=d>th; ev=[];i=0
    while i<len(hot):
        if hot[i]:
            j=i
            while j+1<len(hot) and hot[j+1]: j+=1
            ev.append(((i+1)/fps,(j+1)/fps,j-i+1)); i=j+1
        else: i+=1
    print(f"\n===== {v} HEADLINE band (y20-150) : {len(ev)} change events, th={th:.2f}")
    for s,e,w in ev:
        print(f"   {s:6.2f}s -> {e:6.2f}s   duration {w:2d}f = {w/fps*1000:4.0f}ms")
