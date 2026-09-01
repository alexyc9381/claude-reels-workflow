import subprocess, array, math
FF='tools/node_modules/ffmpeg-static/ffmpeg'
d=subprocess.run([FF,'-v','error','-nostdin','-i','vo/judge132/judge_raw48.wav','-ac','1','-ar','48000',
                  '-f','s16le','-'],capture_output=True).stdout
a=array.array('h'); a.frombytes(d[:len(d)//2*2])
N=len(a); W=480  # 10ms
def db(i):
    s=a[i*W:(i+1)*W]
    if not s: return -99
    return 20*math.log10(math.sqrt(sum(x*x for x in s)/len(s)+1e-9)/32768)
lv=[db(i) for i in range(N//W)]
SPANS=[("A",7.05,10.00),("B",18.90,23.10),("C",24.62,30.15),("D",31.34,32.50),
       ("E",35.16,39.60),("F",40.42,44.60),("G",45.82,52.70),("H",56.85,61.40),
       ("I",62.14,63.60)]
TH=-30.0
print(f"{'sp':3} {'true_on':>8} {'true_off':>9} {'speech':>7}")
res=[]
for n,s,e in SPANS:
    i0,i1=int(s*100),int(e*100)
    on=next((i for i in range(i0,i1) if lv[i]>TH and lv[i+1]>TH), i0)
    off=next((i for i in range(i1,i0,-1) if lv[i]>TH and lv[i-1]>TH), i1)
    print(f"{n:3} {on/100:8.3f} {off/100:9.3f} {(off-on)/100:7.2f}")
    res.append((n,on/100,off/100))
tot=sum(b-a2 for _,a2,b in res)
print(f"\nTRUE SPEECH TOTAL: {tot:.2f}s")
