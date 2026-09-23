import React from 'react';
import {P,T,E,S,pulse,ring,mix,clamp,Clay,Key,Check,Burst,Mark} from './Kit';
import {Darwin,Habitat,Branch} from './DarwinKit';
import {TravelDesign,Coast,Village,FossilEgg,BookCover,Spread,Compass,Boat} from './EvolutionKit';
import {NaturalWorld} from './NaturalWorld';
import {Creature,Fruit,GoalBranch,Shell,FamilySketch} from './Species';
export {Boris} from './BorisLarge';


export function Build({t}:{t:number}){const draw=E(t,-.1,.58),phone=S(t,.82,1.31),tap=pulse(t,.66,.38);return <NaturalWorld kind="laboratory" t={t}>
<TravelDesign x={300-30*draw} y={173-36*(1-draw)} w={668} kind={0} rot={-5+5*draw}/>
<TravelDesign x={707+340*(1-phone)} y={320-80*Math.sin(phone*Math.PI)} w={226} kind={1} route={E(t,1.32,.62)} rot={13*(1-phone)}/>
<Clay t={t} x={2+50*draw+16*tap+30*E(t,1.8,.48)} y={338-24*tap} s={353} role="engineer" rot={-11+14*draw+9*tap+6*pulse(t,1.85,.48)} gaze={1} stern={1-phone} cheer={phone*.7}/>
<Key x={294} y={540} s={103} press={tap}/>
</NaturalWorld>}
export function Reveal({t}:{t:number}){
 const show=E(t,0,.59),name=E(t,.46,.16),fan=pulse(t,.18,.48),stamp=pulse(t,.61,.29),crest=S(t,.60,.37),offer=Math.max(0,t-.77)/.49;
 const bx=553-101*show-36*offer*offer,by=372-198*show-44*E(t,.64,.4)+24*offer;
 return <NaturalWorld kind="cabin" t={t}><Branch x={572} y={587} w={375}/>
 {/* The seal completes while the cover opens; cut during the page reveal. */}
 {[0,1,2,3,4].map(i=><P key={i} x={bx+15} y={by+12} w={361} h={461} style={{transform:`rotate(${-16+17*show+(i+1)*5.4*fan-10*offer}deg)`,transformOrigin:'3% 80%',background:i%2?'#EBDCB9':'#BEA77C',border:'3px solid #766B4F'}}/>)}
 <P x={bx+10} y={by+10} w={367} h={472} style={{background:'#ECDDAB',border:'6px solid #7E7759',transform:'rotate(1deg)'}}><svg viewBox="0 0 367 472"><path d="M50 54H306M50 78H261M183 143V215M77 270V215H290V270M183 215V270" fill="none" stroke="#677C60" strokeWidth="9"/>{[[148,109],[43,281],[149,281],[255,281]].map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`}><path d="M0 0h69v53H0M-10 17h10m69 0h10M15 53v17M51 53v17" fill={i?'#78A391':'#D18860'} stroke="#355A4F" strokeWidth="5"/><path d="M18 16v13M47 16v13" stroke="#243F36" strokeWidth="6"/></g>)}<path d="M49 387H305M49 410H279" stroke="#BBA47B" strokeWidth="6"/></svg></P>
 <P w={1012} h={792} style={{transform:`perspective(950px) rotateY(${-92*offer}deg)`,transformOrigin:`${bx}px ${by+250}px`}}>
 <BookCover x={bx} y={by+7*stamp} w={380} h={485} title={name>.01?'DARWIN':''} bottom={name>.01?'LOOP':''} tilt={-16+17*show-2*stamp-10*offer}>
 <svg viewBox="0 0 360 430" width="100%" height="100%" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
 <circle cx="186" cy="250" r="77" fill="none" stroke="#DAC087" strokeWidth="4" pathLength="1" strokeDasharray={`${crest} 1`} transform="rotate(-90 186 250)"/>
 {[0,1,2,3,4,5].map(i=>{const a=i*Math.PI/3,q=S(t,.62,.34);return <path key={i} d={`M${186+Math.cos(a)*(83+q*20)} ${250+Math.sin(a)*(83+q*20)}l${Math.cos(a)*12} ${Math.sin(a)*12}`} stroke="#E5C88C" strokeWidth="4" opacity={stamp}/>})}
 </svg></BookCover></P>
 <Darwin t={t} x={19+72*show-9*stamp+27*offer} y={323-42*show+9*stamp} s={379} rot={-10+15*show+8*pulse(t,.64,.42)+12*offer} gaze={1} cheer={show*.75}/>
 </NaturalWorld>
}
export function Chat({t}:{t:number}){const p=E(t,0,.55),stop=E(t,.66,.42);return <NaturalWorld kind="greenhouse" t={t}>
<svg width="1012" height="792" style={{position:'absolute',inset:0}}><g transform={`translate(${419+181*pulse(t,-.18,.8)-191*stop} ${228+250*stop}) rotate(${-28*stop} 100 80)`} opacity={1-stop}><path d="M0 0h337v163H116L71 204V163H0Z" fill="#E9D4A8" stroke="#476052" strokeWidth="9"/>{[90,163,236].map(x=><circle key={x} cx={x} cy="80" r="13" fill="#8F956F"/>)}</g><g transform={`translate(${443-120*pulse(t,.05,.85)+208*stop} ${432+171*stop}) rotate(${23*stop} 100 50)`} opacity={1-stop}><path d="M0 0h337v149H261v47l-57-47H0Z" fill="#A9C2A1" stroke="#3D5B4D" strokeWidth="9"/>{[90,163,236].map(x=><circle key={x} cx={x} cy="71" r="13" fill="#3F6450"/>)}</g><path d="M729 344Q855 374 742 432M681 448Q369 444 419 337" stroke="#C2AE75" strokeWidth="8" fill="none" opacity={1-stop}/><path d="M720 419l22 13 21-21M402 353l17-16 19 12" stroke="#C2AE75" strokeWidth="8" fill="none" opacity={1-stop}/></svg>
<Clay t={t} x={22+142*stop} y={330-43*pulse(t,.66,.42)} s={367+35*stop} role="reviewer" gaze={1} stern={1-stop} shock={.3*stop} rot={-14+29*stop}/><Key x={340+86*stop} y={532} s={135} label="✕" press={pulse(t,.66,.43)} c="#D8A46B"/>
</NaturalWorld>}
export function ThirdLine({t}:{t:number}){const enter=E(t,0,.6),pull=S(t,.71,.92),write=S(t,1.73,.92);return <NaturalWorld kind="cabin" t={t}>
<Spread x={mix(456,255,enter)-25*S(t,1.89,.86)} y={mix(383,170,enter)-28*S(t,1.89,.86)} w={712} h={459}>
<P x={39} y={62} w={269} h={286} style={{transform:'rotate(-4deg)',border:'2px solid #AB9870',overflow:'hidden',opacity:.88}}><FamilySketch t={t}/></P>
<P x={379} y={72} w={289} h={310}><T x={0} y={0} w={282} size={36} c="#3B5746" style={{fontFamily:'Fraunces'}}>1. Try three</T><T x={0} y={83} w={282} size={36} c="#3B5746" style={{fontFamily:'Fraunces',opacity:E(t,.28,.36)}}>2. Pick one</T><P x={-8} y={161} w={290} h={131} style={{background:'#31594A',borderRadius:4,overflow:'hidden'}}><T x={17} y={17} w={258} size={35} c="#F6DFAC" style={{fontFamily:'Fraunces'}}>3. Evolve<br/>the winner</T><P x={-303*pull} y={0} w={290} h={131} style={{background:'#B38355',border:'4px solid #8D6744'}}><svg viewBox="0 0 290 131"><path d="M35 58h29v37H35Z" fill="#E8C895" stroke="#795F43" strokeWidth="4"/><path d="M43 60V45a8 8 0 0 1 16 0v15" stroke="#795F43" strokeWidth="4" fill="none"/><path d="M102 68h142" stroke="#D1AE79" strokeWidth="5"/></svg></P></P></P>
</Spread>
<Darwin t={t} x={82+303*enter-303*pull} y={308+40*(1-enter)+110*S(t,1.67,.53)} s={309} gaze={1} think={1-write} cheer={E(t,1.76,.64)*.6} rot={-3*pulse(t,.71,.92)+write*4}/>
</NaturalWorld>}
export function CTA({t}:{t:number}){
 const show=E(t,0,.48),impact=pulse(t,.48,.25),settle=pulse(t,.73,.25),rays=S(t,.48,.40),offer=Math.max(0,t-.65)/.60;
 const bx=626-152*show-54*offer*offer,by=360-199*show+10*impact-3*settle-18*offer;
 return <NaturalWorld kind="fossil" t={t}>
 <svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
 {/* Broad impression rays originate at the book's edges, leaving title and faces clear. */}
 {[0,1,2,3,4,5].map(i=>{const a=(-60+i*24)*Math.PI/180;return <path key={i} d={`M${650+Math.cos(a)*218} ${412+Math.sin(a)*200}l${Math.cos(a)*(16+29*rays)} ${Math.sin(a)*(16+29*rays)}`} stroke="#E8C785" strokeWidth={9*(1-rays)+3} opacity={pulse(t,.48,.47)} strokeLinecap="round"/>})}
 <ellipse cx="651" cy="678" rx={110+154*rays} ry={9+14*rays} fill="none" stroke="#DDC391" strokeWidth={8*(1-rays)} opacity={pulse(t,.48,.48)}/>
 </svg>
 <P w={1012} h={792} style={{transform:`scale(${1+.035*impact-.01*settle})`,transformOrigin:'65% 65%'}}><BookCover x={bx} y={by} w={348+174*offer} h={493+174*offer} title="WIN" bottom="" tilt={-15+18*show-3*impact-7*offer}/></P>
 <Darwin t={t} x={38+34*show-13*impact+44*offer} y={326-20*pulse(t,.55,.42)+7*impact} s={381} rot={-8+12*show-7*impact+3*settle+12*offer} gaze={1} shock={impact*.3} cheer={show*.8}/>
 </NaturalWorld>
}


export function Hook({t}:{t:number}){const fail=S(t,0,.67),unfold=S(t,.06,.44),fly=S(t,.45,.91),swoop=S(t,1.25,.79),grab=E(t,1.24,.33);return <div style={{position:'absolute',inset:0,transform:`scale(${1+.021*E(t,0,.48)})`,transformOrigin:'54% 57%'}}><NaturalWorld kind="ravine" t={t}>
<svg width="1012" height="792" style={{position:"absolute",inset:0}}><path d="M261 624L369 603 431 620 453 645 421 704 300 731Z" fill="#4D6444" stroke="#283F34" strokeWidth="8"/><path d="M262 625l107-22 62 17 22 25-93 4-72-2Z" fill="#A6B96D"/></svg><GoalBranch/>
<P x={0} y={0} w={1012} h={792} style={{opacity:1-E(t,.51,.29)}}><Creature t={t} x={330+110*fail} y={350-90*Math.sin(fail*Math.PI)+340*fail*fail} s={209} type={0} open={.7} flap={Math.sin(t*21)} shock={.65*fail} rot={-14+58*fail}/></P>
<Creature t={t} x={150+482*fly-262*swoop} y={320-90*fly-67*Math.sin(fly*Math.PI)+27*swoop} s={330-65*fly+175*swoop} type={2} open={unfold} flap={t<1.68?Math.sin(t*14)*(.35+.3*fly):.25} rot={-8+15*Math.sin(fly*Math.PI)-3*grab} shock={.3*(1-fly)} cheer={.55*grab} gaze={4*(1-swoop)}/>
<Fruit x={852-20*grab-96*swoop} y={292+10*grab+88*swoop} s={66+14*swoop} taken={grab}/>
<Darwin t={t} x={17} y={519-17*pulse(t,1.7,.4)} s={219} gaze={1} think={1-grab} cheer={grab*.85} tool="lens" rot={-8+13*grab}/>
<svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none'}}><path d="M229 792Q239 690 302 725Q328 644 389 719Q460 675 481 792Z" fill="#234D43" stroke="#143B37" strokeWidth="7"/><path d="M283 780l25-44M343 770l24-54M404 778l32-41" stroke="#607B55" strokeWidth="4"/></svg>
</NaturalWorld></div>}

export function Test({t}:{t:number}){const which=t<.83?0:t<1.66?1:2,local=t-[0,.83,1.66][which],p=S(local,.1,which===2?1.01:.57),win=which===2?E(local,1.08,.35):0;return <NaturalWorld kind="canopy" t={t}>
<svg width="1012" height="792" style={{position:'absolute',inset:0}}><path d="M0 640Q141 581 350 631L365 792H0M761 554Q885 493 1012 553V792H778Z" fill="#365B40" stroke="#193E34" strokeWidth="10"/><path d="M0 647Q173 602 347 637M776 557Q890 510 1012 556" stroke="#A1A56C" strokeWidth="13" fill="none"/></svg><GoalBranch x={784} y={270}/>
{[0,1,2].map((i)=><Shell key={i} x={112+i*85} y={585} s={79} crack={i<which?1:i===which?E(local,0,.17):0}/>)}
<Creature t={t} x={which===2?273+359*p:210+242*p-(which===1?105*p*p:0)} y={which===2?425-190*p-62*Math.sin(p*Math.PI):423-138*Math.sin(p*Math.PI)+231*p*p} s={which===2?265:230} type={which} open={E(local,0,.22)} flap={Math.sin(local*18)*.55} rot={which===2?-12+17*p:-12+45*p} cheer={win*.6} shock={which===2?0:p*.65} scale={which<2?1-.19*E(local,.57,.2):1}/>
<Fruit x={852-20*win} y={302+9*win} s={65} taken={win}/>
<Darwin t={t} x={5+36*S(t,.2,1.55)} y={405-23*pulse(t,2.76,.5)} s={264} gaze={1} think={1-win} cheer={win*.8} tool="lens" rot={-9+10*win}/>
</NaturalWorld>}

export function Variations({t}:{t:number}){const branch=S(t,0,1.12);return <NaturalWorld kind="greenhouse" t={t}>
<svg width="1012" height="792" style={{position:'absolute',inset:0}}><path d="M501 329V382M205 426V382H804V426M503 382V426" stroke="#3D5C44" strokeWidth="17" strokeLinecap="round" fill="none" pathLength="1" strokeDasharray={`${branch} 1`}/><path d="M501 329V382M205 426V382H804V426M503 382V426" stroke="#D5BB7A" strokeWidth="6" fill="none" pathLength="1" strokeDasharray={`${branch} 1`}/></svg>
<Creature t={t} x={414} y={151} s={179} type={2} open={.62} flap={.16*pulse(t,0,.69)} cheer={.3}/>
{[0,1,2].map(i=>{const hatch=S(t,.10+i*.22,1.03),adapt=S(t,1.14+i*.27,.83),stretch=pulse(t,1.14+i*.27,.83);return <React.Fragment key={i}><P x={0} y={0} w={1012} h={792} style={{opacity:clamp((hatch-.25)/.12)}}><Creature t={t} x={104+i*299-13*stretch} y={634-222*hatch-29*stretch} s={199+24*stretch} type={2} open={.23+.39*hatch+.27*stretch} flap={.22+stretch*.32} adapt={i+1} growth={adapt} cheer={adapt*.7} shock={.35*(1-adapt)} scale={.32+.68*hatch}/></P><Shell x={133+i*299} y={581} s={140} crack={hatch}/></React.Fragment>})}
</NaturalWorld>}

export function Repeat({t}:{t:number}){const gust=S(t,.36,.68),fly=S(t,.57,1.46),grab=E(t,2.03,.37);return <NaturalWorld kind="ice" t={t}>
<svg width="1012" height="792" style={{position:'absolute',inset:0}}><path d="M764 598L822 543 917 565 970 520 1012 557V792H760Z" fill="#9ABEC1" stroke="#477988" strokeWidth="7"/><path d="M765 599l57-56 95 22 53-45 42 37-63 25-53-1-55-12Z" fill="#EAF1D4"/><path d="M818 604l-14 93M917 600l37 169" stroke="#5D939F" strokeWidth="7"/></svg>
<GoalBranch x={790} y={330}/>
{[1,3].map((adapt,i)=>{const j=S(t,.06+i*.1,.55),back=S(t,.53+i*.09,.71);return <P key={i} x={0} y={0} w={1012} h={792} style={{opacity:1-E(t,1.06+i*.08,.46)}}><Creature t={t} x={(i===0?175:430)+133*j-250*back} y={196+i*350-55*Math.sin(j*Math.PI)+back*(i===0?-80:87)} s={201} type={2} adapt={adapt} open={.66} flap={Math.sin(t*16)*.45} rot={(i===0?-1:1)*back*31} shock={back*.7}/></P>})}
<svg width="1012" height="792" style={{position:'absolute',inset:0,opacity:gust*(1-E(t,1.83,.36))}}>{[0,1,2,3].map(i=><g key={i} transform={`translate(${-330*S(t,.35+i*.08,1.25)} 0)`}><path d={`M${673+i%2*133} ${235+i*104}h218q69 0 56-31q-9-19-31-9`} fill="none" stroke="#E8F0DC" strokeWidth="6" strokeLinecap="round"/><path d={`M${802+i%2*117} ${252+i*104}h88`} stroke="#BEDDE0" strokeWidth="3"/></g>)}</svg>
<Creature t={t} x={133+497*fly} y={369-57*fly-39*Math.sin(fly*Math.PI)} s={280} type={2} adapt={2} open={.86} flap={Math.sin(t*13)*.36} rot={-12+15*fly} cheer={grab*.6}/>
<Fruit x={850-15*grab} y={376+5*grab} s={79} taken={grab}/>
</NaturalWorld>}

export function Draft({t}:{t:number}){const arrive=E(t,0,.55),press=pulse(t,1.47,.4),parent=S(t,1.66,.61),hatch=E(t,1.89,.77),spread=S(t,2.44,.78);return <NaturalWorld kind="laboratory" t={t}>
<svg width="1012" height="792" style={{position:'absolute',inset:0}}><path d="M331 651H948L972 698H311Z" fill="#A78B60" stroke="#443F32" strokeWidth="8"/><path d="M370 697h37v95h-37M879 697h37v95h-37" fill="#3E4437"/><path d="M465 382Q461 478 703 482" stroke="#D6B66B" strokeWidth="8" fill="none" pathLength="1" strokeDasharray={`${parent} 1`}/></svg>
<Creature t={t} x={410-27*parent+37*pulse(t,.57,.77)} y={416+102*(1-arrive)-190*parent-67*pulse(t,.57,.77)} s={238-72*parent} type={0} open={.68} flap={.2*pulse(t,.4,.72)} cheer={.2}/>
<P x={0} y={0} w={1012} h={792} style={{opacity:E(t,1.66,.22)}}><P x={0} y={0} w={1012} h={792} style={{opacity:clamp((hatch-.22)/.12)}}><Creature t={t} x={635-49*spread} y={563-221*hatch-35*spread} s={289} type={2} adapt={2} open={.21+.79*spread} flap={spread*.3} cheer={spread*.7} shock={.2*(1-spread)} scale={.45+.55*hatch}/></P><Shell x={680} y={563} s={183} crack={hatch}/></P>
<Darwin t={t} x={12+37*arrive+23*press+59*pulse(t,.57,.77)} y={386-20*press} s={307} rot={-8+17*press} gaze={1} think={1-hatch} cheer={spread*.7} tool={t<1.4?"lens":"none"}/><Key x={294} y={541} s={108} label="↻" press={press} c="#E1BD70"/>
</NaturalWorld>}

export function Tokens({t}:{t:number}){const spend=E(t,.02,.9),stop=E(t,.72,.45);return <NaturalWorld kind="fossil" t={t}><P x={440+110*spend-110*stop} y={210+110*spend-120*stop} w={412} h={405} style={{transform:`rotate(${-26+44*spend-18*stop}deg) scaleX(${1-spend*.23})`,transformOrigin:'50% 30%'}}><svg width="100%" height="100%" viewBox="0 0 400 400"><path d="M105 82L73 24l80 15 44-26 47 29 73-15-27 67Q381 175 354 318Q340 384 197 386Q35 382 42 286Q34 169 105 82Z" fill="#BD8854" stroke="#614C37" strokeWidth="12"/><path d="M94 88Q179 111 288 91M86 111Q185 136 294 113" stroke="#614C37" strokeWidth="15"/><path d="M111 136Q75 257 100 331M294 139Q327 229 293 345" fill="none" stroke="#D3A66A" strokeWidth="16"/><path d="M110 192h180v81H110Z" fill="#E4C18A"/><text x="201" y="244" textAnchor="middle" fill="#584C34" fontFamily="Inter" fontWeight="900" fontSize="39">TOKENS</text><path d={`M${106+stop*84} 91h${180*(1-stop)}`} stroke="#E4C88F" strokeWidth="21" strokeLinecap="round"/></svg></P>{Array.from({length:13},(_,i)=>{const p=clamp((t-.04-i*.047)/.56);return p>0&&p<1&&<P key={i} x={630+(i%3-1)*53+Math.sin(p*3)*75} y={325+p*427} w={44} h={44} style={{borderRadius:'50%',background:'#E2B24D',border:'5px solid #8E6435',transform:`rotateY(${p*600}deg)`}}/>})}<Darwin t={t} x={24+80*stop} y={321-25*pulse(t,.74,.43)} s={376} rot={-6+18*stop} gaze={1} think={stop} shock={.8*(1-stop)} cheer={stop*.35}/></NaturalWorld>}
