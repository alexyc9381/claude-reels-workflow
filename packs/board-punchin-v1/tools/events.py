import numpy as np, json
M=np.load("metrics.npy",allow_pickle=True).item()
EDGE_TH={"A":60,"B":30}
res={}
for v in ("A","B"):
    m=M[v]; fps=m["fps"]; n=m["n"]; d=m["d_full"]; card=m["reg"]["card"]; top=m["reg"]["top"]
    # ---- MODE: board (card top edge present) vs fullbleed
    board = m["edge"]>EDGE_TH[v]
    # despeckle: median filter over 5 frames
    b=board.copy()
    for i in range(2,n-2): b[i]=np.median(board[i-2:i+3])>0.5
    # runs
    runs=[]; s=0
    for i in range(1,n):
        if b[i]!=b[s]: runs.append((s,i-1,bool(b[s]))); s=i
    runs.append((s,n-1,bool(b[s])))
    runs=[(a,c,k) for a,c,k in runs if c-a>=3]          # drop <4-frame flickers
    print(f"\n===== {v}  fps={fps:.3f} dur={n/fps:.2f}s")
    print(f"  layout runs: {len(runs)}  board={sum(1 for r in runs if r[2])} fullbleed={sum(1 for r in runs if not r[2])}")
    bt=sum((c-a+1) for a,c,k in runs if k)/n; print(f"  board share {bt*100:.1f}%  fullbleed share {(1-bt)*100:.1f}%")
    # ---- EVENTS: robust spikes on d_full
    med=np.median(d); mad=np.median(np.abs(d-med))*1.4826
    th=max(8.0, med+6*mad)
    hot=d>th
    ev=[]; i=0
    while i<len(hot):
        if hot[i]:
            j=i
            while j+1<len(hot) and hot[j+1]: j+=1
            k=int(np.argmax(d[i:j+1]))+i
            ev.append(dict(f=k+1, t=(k+1)/fps, w=j-i+1, dmax=float(d[k]),
                           card=float(card[k]), top=float(top[k])))
            i=j+1
        else: i+=1
    print(f"  threshold {th:.1f} (med {med:.2f}, mad {mad:.2f}) -> {len(ev)} events")
    widths={}
    for e in ev: widths[e["w"]]=widths.get(e["w"],0)+1
    print("  event widths (frames):", dict(sorted(widths.items())))
    res[v]=dict(runs=runs, ev=ev, fps=fps, n=n, board=b.tolist())
    print("  events:")
    for e in ev:
        print(f"    t={e['t']:6.2f}s f{e['f']:5d} w={e['w']} dfull={e['dmax']:6.1f} card={e['card']:6.1f} top={e['top']:6.1f}")
json.dump({k:{'runs':v_['runs'],'ev':v_['ev'],'fps':v_['fps'],'n':v_['n']} for k,v_ in res.items()},open("events.json","w"),indent=1)
np.save("modes.npy",{k:np.array(v_['board']) for k,v_ in res.items()},allow_pickle=True)
