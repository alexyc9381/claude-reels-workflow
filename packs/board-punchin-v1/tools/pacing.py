import numpy as np, json
ev=json.load(open("events.json"))
for v in ("A","B"):
    fps=ev[v]["fps"]; runs=ev[v]["runs"]; n=ev[v]["n"]; dur=n/fps
    print(f"\n########## {v}   {dur:.2f}s @ {fps:.3f}fps ({n} frames)")
    print(f"{'#':>3} {'start':>7} {'end':>7} {'dur_s':>6} {'f@src':>6} {'f@30':>6}  mode")
    ds=[]
    for i,(a,c,isb) in enumerate(runs):
        d=(c-a+1)/fps; ds.append((d,isb))
        print(f"{i+1:3d} {a/fps:7.2f} {(c+1)/fps:7.2f} {d:6.2f} {c-a+1:6d} {round(d*30):6d}  {'BOARD' if isb else 'FULL-BLEED TH'}")
    bd=[d for d,k in ds if k]; fd=[d for d,k in ds if not k]
    print(f"  BOARD      n={len(bd)} mean {np.mean(bd):.2f}s median {np.median(bd):.2f}s  min {min(bd):.2f} max {max(bd):.2f}")
    print(f"  FULLBLEED  n={len(fd)} mean {np.mean(fd):.2f}s median {np.median(fd):.2f}s  min {min(fd):.2f} max {max(fd):.2f}")
    print(f"  ALL SHOTS  n={len(ds)} mean {np.mean([d for d,_ in ds]):.2f}s median {np.median([d for d,_ in ds]):.2f}s")
    print(f"  cut rate = 1 per {dur/(len(runs)-1):.2f}s")
    # pacing drift: first third vs last third
    cuts=np.array([a/fps for a,c,k in runs[1:]])
    for lbl,(lo,hi) in dict(first=(0,dur/3),mid=(dur/3,2*dur/3),last=(2*dur/3,dur)).items():
        k=((cuts>=lo)&(cuts<hi)).sum()
        print(f"    {lbl:5s} third: {k} cuts -> 1 per {(hi-lo)/max(k,1):.2f}s")
