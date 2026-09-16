import React from 'react';
import {interpolate,Easing} from 'remotion';
import {Mascot} from './PreviewMascot';
const ink='#292822',clay='#C97355',paper='#F4F1EA';
const p=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,.84,.22,1)});
export const ModelChapterArt=({f}:{f:number})=><div style={{position:'absolute',left:1060,top:210,width:770,height:680}}>
 {['Haiku','Sonnet','Opus'].map((n,i)=>{const e=p(f,1174+i*3,1187+i*3);return <div key={n} style={{position:'absolute',left:i*235,top:80+(i===1?-38:0)+(1-e)*110,width:246,height:409,background:i===1?'#E3B499':paper,borderRadius:20,boxShadow:'0 22px 35px #0003',transform:`rotate(${(i-1)*7}deg)`,opacity:e}}>
 <div style={{height:40,background:'#D8C9B3',borderRadius:'20px 20px 0 0'}}/><div style={{textAlign:'center',fontSize:35,fontFamily:'Georgia,serif',color:ink,marginTop:21}}>{n}</div>
 <div style={{position:'absolute',left:10,top:148}}><Mascot lf={f+30} size={226} nodAmp={0} outfit={i===0?'bare':i===1?'shirt':'suit'} glasses={i===2?1:0}/></div><div style={{position:'absolute',left:14,top:357,width:218,height:2,background:'#B8A38A'}}/><div style={{position:'absolute',left:0,top:372,width:246,textAlign:'center',fontFamily:'Arial',fontSize:19,color:'#816A56'}}>{['QUICK TASKS','DAILY WORK','HARD PROBLEMS'][i]}</div>
 </div>})}
 <div style={{position:'absolute',left:159,top:559,width:420,height:79,background:clay,borderRadius:15,color:'white',fontFamily:'Arial',fontSize:31,display:'flex',alignItems:'center',justifyContent:'center',gap:20,opacity:p(f,1186,1197)}}><svg width="47" height="43" viewBox="0 0 47 43"><rect x="3" y="13" width="41" height="27" rx="5" stroke="white" strokeWidth="3" fill="none"/><path d="M15 13V4h17v9M4 25h40" stroke="white" strokeWidth="3" fill="none"/></svg> Match the job.</div>
</div>;
export const UsageDemo=({f}:{f:number})=>{const good=f>=1103;return <div style={{position:'absolute',inset:0,borderRadius:24,background:ink,color:paper,overflow:'hidden',fontFamily:'Arial'}}>
 <div style={{position:'absolute',left:60,top:48,fontSize:24,letterSpacing:3,color:'#D8B79A'}}>MATCH THE TASK</div>
 <div style={{position:'absolute',left:65,top:170,width:335,height:310,background:paper,borderRadius:22,color:ink,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:27}}><svg width="115" height="125" viewBox="0 0 115 125"><path d="M10 5h65l30 30v85H10z" stroke="#AD987D" strokeWidth="5" fill="#E7DCCA"/><path d="M29 60h57M29 80h43M29 100h53" stroke="#AD987D" strokeWidth="7"/></svg><span style={{fontSize:33}}>Simple summary</span></div>
 <svg width="1110" height="642" style={{position:'absolute',inset:0}}><path d="M449 324h135l-28-25m28 25-28 25" fill="none" stroke={good?'#ABC09A':clay} strokeWidth="10" strokeLinecap="round"/></svg>
 <div style={{position:'absolute',left:642,top:170,width:400,height:310,background:good?'#ABC09A':'#654D3F',borderRadius:22,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:27,color:good?ink:paper,transform:`scale(${good?.94+.06*p(f,1103,1121):1})`}}><div style={{fontSize:83,lineHeight:1}}>{good?'✓':'!'}</div><div style={{fontSize:36}}>{good?'Lightweight model':'Heavy reasoning'}</div></div>
 <div style={{position:'absolute',left:0,top:541,width:'100%',textAlign:'center',fontSize:34,color:good?'#BCD2AD':'#E4AD8B'}}>{good?'Small task. Right-sized model.':'Save your usage for harder work.'}</div>
 </div>};
