import numpy as np
env=np.load("env.npy")
def dump(a,b,label):
    print(f"\n=== {label}  {a}-{b} ===")
    for i in range(int(a/0.02), int(b/0.02)):
        t=i*0.02; v=env[i]
        print(f"  {t:6.2f} {v:7.1f} {'#'*max(0,int((v+60)/2))}")
dump(20.80,21.40,"end 'generator.' -> flub")
dump(27.80,28.30,"end 'built in.' -> flub")
