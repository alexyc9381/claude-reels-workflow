import numpy as np, wave, json
w=wave.open("ai_raw16k.wav"); n=w.getnframes(); sr=w.getframerate()
a=np.frombuffer(w.readframes(n),dtype=np.int16).astype(np.float32)/32768.0
hop=int(0.02*sr)
env=np.array([20*np.log10(max(np.abs(a[i:i+hop]).max(),1e-6)) for i in range(0,len(a)-hop,hop)])
np.save("env.npy", env)
print("sr",sr,"dur",len(a)/sr,"frames",len(env))
# runs below -26 dB lasting >= 0.20s
TH=-26.0
runs=[];i=0
while i<len(env):
    if env[i]<TH:
        j=i
        while j<len(env) and env[j]<TH: j+=1
        if (j-i)*0.02>=0.18: runs.append((i*0.02,j*0.02))
        i=j
    else: i+=1
print("\n=== SILENCE RUNS (>=0.18s under -26dB) ===")
for s,e in runs: print(f"  {s:7.2f} -> {e:7.2f}   ({e-s:.2f}s)")
json.dump(runs, open("silence_runs.json","w"))
