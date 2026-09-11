/* Authored action clocks, independent of narration/caption time.
   Each row sets anticipation, drive, checking and follow-through for its own action.
   Smooth monotone Hermite interpolation changes velocity without freezing/holding frames.
   Sound uses the inverse map so each cue stays attached to its action. */
export type TimingPoint=readonly [number,number];
export const PERFORMANCE_SHOTS=[
 [0,'toss / recover',[[0,0],[.12,.25],[.34,.40],[.58,.76],[.82,.83],[1,1]]],
 [44,'brace / quick catches',[[0,0],[.16,.09],[.43,.62],[.73,.78],[1,1]]],
 [88,'unfurl / direct',[[0,0],[.21,.32],[.48,.45],[.72,.78],[1,1]]],
 [144,'rush / work / answer',[[0,0],[.22,.38],[.45,.52],[.66,.63],[.84,.78],[1,1]]],
 [238,'staggered contributions',[[0,0],[.18,.28],[.41,.39],[.61,.74],[.82,.84],[1,1]]],
 [313,'file catch / read / point',[[0,0],[.17,.31],[.45,.48],[.70,.77],[1,1]]],
 [400,'tool drive / reveal',[[0,0],[.23,.13],[.53,.64],[.78,.79],[1,1]]],
 [481,'load roller / broad stroke',[[0,0],[.18,.10],[.54,.72],[.81,.86],[1,1]]],
 [530,'awning release / poster settle',[[0,0],[.24,.39],[.48,.50],[.69,.72],[1,1]]],
 [596,'paint / quick copy placement',[[0,0],[.25,.18],[.43,.45],[.66,.78],[1,1]]],
 [657,'clap / leap / land',[[0,0],[.18,.28],[.42,.44],[.61,.76],[.84,.88],[1,1]]],
 [720,'edit shuttle / inspect / feed',[[0,0],[.17,.30],[.39,.43],[.64,.58],[.83,.88],[1,1]]],
 [800,'result pull / change take',[[0,0],[.25,.36],[.53,.51],[.76,.84],[1,1]]],
 [866,'curtain tug / release / reveal',[[0,0],[.16,.08],[.42,.57],[.67,.76],[1,1]]],
 [940,'pencil catch / draw',[[0,0],[.22,.38],[.49,.53],[.75,.73],[1,1]]],
 [987,'measure / palette turn',[[0,0],[.20,.13],[.43,.56],[.67,.73],[1,1]]],
 [1046,'fan / notice sameness',[[0,0],[.19,.30],[.45,.58],[.73,.74],[1,1]]],
 [1120,'grip / tear / rebuild',[[0,0],[.19,.10],[.44,.62],[.70,.79],[1,1]]],
 [1180,'reveal / mobile snap',[[0,0],[.23,.39],[.52,.52],[.72,.83],[1,1]]],
 [1235,'heavy book / hinge settle',[[0,0],[.20,.11],[.55,.73],[.79,.85],[1,1]]],
 [1288,'reconcile in batches',[[0,0],[.18,.27],[.40,.40],[.60,.70],[.81,.84],[1,1]]],
 [1355,'scan / isolate variance',[[0,0],[.24,.19],[.52,.48],[.69,.77],[1,1]]],
 [1425,'contract release / flatten',[[0,0],[.19,.31],[.45,.49],[.65,.76],[1,1]]],
 [1472,'inspect / clause correction',[[0,0],[.25,.21],[.48,.38],[.66,.72],[1,1]]],
 [1530,'transfer / press seal',[[0,0],[.21,.32],[.44,.43],[.71,.81],[1,1]]],
 [1584,'decisive gesture / point',[[0,0],[.18,.32],[.49,.52],[.74,.71],[1,1]]],
 [1637,'drop / snag / heavy collapse',[[0,0],[.22,.14],[.42,.47],[.66,.62],[.83,.87],[1,1]]],
 [1737,'write / inspect / rewrite',[[0,0],[.18,.26],[.43,.42],[.66,.77],[.83,.84],[1,1]]],
 [1820,'fit / pull / check',[[0,0],[.21,.14],[.48,.59],[.74,.79],[1,1]]],
 [1904,'stagger / connect / resolve',[[0,0],[.19,.29],[.43,.43],[.64,.73],[.83,.82],[1,1]]],
 [2013,'offer / readable handoff',[[0,0],[.22,.34],[.50,.52],[.78,.74],[1,1]]],
] as const;
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
export const timingValue=(t:number,pts:readonly TimingPoint[])=>{
 t=clamp(t);let i=0;while(i<pts.length-2&&t>pts[i+1][0])i++;
 const a=pts[i],b=pts[i+1],h=b[0]-a[0],u=(t-a[0])/h;
 const slope=(j:number)=>{if(j===0)return (pts[1][1]-pts[0][1])/(pts[1][0]-pts[0][0]);if(j===pts.length-1)return (pts[j][1]-pts[j-1][1])/(pts[j][0]-pts[j-1][0]);const l=(pts[j][1]-pts[j-1][1])/(pts[j][0]-pts[j-1][0]),r=(pts[j+1][1]-pts[j][1])/(pts[j+1][0]-pts[j][0]);return 2*l*r/(l+r);};
 return (2*u*u*u-3*u*u+1)*a[1]+(u*u*u-2*u*u+u)*h*slope(i)+(-2*u*u*u+3*u*u)*b[1]+(u*u*u-u*u)*h*slope(i+1);
};
export const actionFrame=(start:number,local:number)=>{
 const i=PERFORMANCE_SHOTS.findIndex(s=>s[0]===start);if(i<0)return local;
 const n=(PERFORMANCE_SHOTS[i+1]?.[0]??2132)-start-1;
 return timingValue(local/n,PERFORMANCE_SHOTS[i][2])*n;
};
export const performanceSoundFrame=(sourceFrame:number)=>{
 let i=0;while(i<PERFORMANCE_SHOTS.length-1&&sourceFrame>=PERFORMANCE_SHOTS[i+1][0])i++;
 const start=PERFORMANCE_SHOTS[i][0],n=(PERFORMANCE_SHOTS[i+1]?.[0]??2132)-start-1,target=(sourceFrame-start)/n;
 let lo=0,hi=1;for(let k=0;k<30;k++){const m=(lo+hi)/2;if(timingValue(m,PERFORMANCE_SHOTS[i][2])<target)lo=m;else hi=m;}
 return start+Math.round((lo+hi)*.5*n);
};
