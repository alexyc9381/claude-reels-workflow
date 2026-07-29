import numpy as np, json
FPS={"A":24.0,"B":24000/1001}; ROWS={"A":(52,78),"B":(66,90)}; NW={"A":240,"B":377}
out={}
for v in ("A","B"):
    T=np.load(f"{v}_tmask.npy"); fps=FPS[v]; r0,r1=ROWS[v]; C=T[:,r0:r1,:]
    xor=np.logical_xor(C[1:],C[:-1]).sum((1,2)).astype(np.float32)
    denom=np.maximum(C[1:].sum((1,2))+C[:-1].sum((1,2)),1)
    ch=xor/denom
    print(f"\n===== {v} (spoken words {NW[v]}, dur {len(C)/fps:.1f}s)")
    for th in (0.15,0.2,0.25,0.3,0.35,0.45,0.55):
        hot=ch>th; ev=[];i=0
        while i<len(hot):
            if hot[i]:
                j=i
                while j+1<len(hot) and hot[j+1]: j+=1
                ev.append((j+1)/fps); i=j+1
            else: i+=1
        print(f"   th={th:.2f} -> {len(ev):4d} changes  ({len(ev)/(len(C)/fps):.2f}/s)")
    # pick th that best matches spoken word count
    best=None
    for th in np.arange(0.10,0.60,0.01):
        hot=ch>th; ev=[];i=0
        while i<len(hot):
            if hot[i]:
                j=i
                while j+1<len(hot) and hot[j+1]: j+=1
                ev.append((j+1)/fps); i=j+1
            else: i+=1
        if best is None or abs(len(ev)-NW[v])<abs(best[1]-NW[v]): best=(th,len(ev),ev)
    th,cnt,ev=best
    ts=np.array(ev); holds=np.diff(ts)
    print(f"  BEST th={th:.2f} -> {cnt} changes vs {NW[v]} spoken words ({cnt/NW[v]*100:.0f}%)")
    print(f"  HOLD median {np.median(holds):.3f}s = {np.median(holds)*fps:.1f} src-frames = {np.median(holds)*30:.1f}f@30")
    print(f"  HOLD p10 {np.percentile(holds,10):.3f}  p25 {np.percentile(holds,25):.3f}  p75 {np.percentile(holds,75):.3f} p90 {np.percentile(holds,90):.3f}")
    print(f"  holds <0.2s: {(holds<0.2).mean()*100:.0f}%   >1.0s: {(holds>1.0).mean()*100:.0f}%")
    out[v]=dict(th=float(th),times=[round(float(x),3) for x in ts])
json.dump(out,open("cap_final.json","w"))
