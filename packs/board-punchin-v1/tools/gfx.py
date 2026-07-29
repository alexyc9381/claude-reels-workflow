import numpy as np, json
M=np.load("metrics.npy",allow_pickle=True).item(); ev=json.load(open("events.json"))
for v in ("A","B"):
    m=M[v]; fps=m["fps"]; top=m["reg"]["top"]; card=m["reg"]["card"]
    runs=[r for r in ev[v]["runs"] if r[2]]
    print(f"\n===== {v}: graphic events INSIDE board runs (top spikes, card quiet)")
    allev=[]
    for a,c,_ in runs:
        seg=top[a:max(a+1,c-1)]
        if len(seg)<6: continue
        med=np.median(seg); mad=np.median(np.abs(seg-med))*1.4826
        th=max(4.0, med+5*mad)
        hot=seg>th; i=0
        while i<len(hot):
            if hot[i]:
                j=i
                while j+1<len(hot) and hot[j+1]: j+=1
                k=int(np.argmax(seg[i:j+1]))+i
                if card[a+k]<12:                       # talking head continuous => pure graphic
                    allev.append(((a+k+1)/fps, j-i+1, float(seg[k])))
                i=j+1
            else: i+=1
    print(f"  n={len(allev)}  rate={len(allev)/m['dur']:.2f}/s")
    w=[e[1] for e in allev]; 
    hw={}
    for x in w: hw[x]=hw.get(x,0)+1
    print(f"  ENTRY DURATION (frames@src): {dict(sorted(hw.items()))}")
    print(f"    median {np.median(w):.0f}f = {np.median(w)/fps*1000:.0f}ms   mean {np.mean(w):.1f}f")
    print("  times:", " ".join(f"{t:.2f}" for t,_,_ in allev))
    json.dump(allev,open(f"{v}_gfx.json","w"))
