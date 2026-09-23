import React from 'react';
import {P,E,S,pulse,mix,clamp,Clay} from './Kit';
import {Darwin} from './DarwinKit';
import {Creature,Fruit} from './Species';

// The backgrounds remain still. Each action has one moving object and a visible
// contact: a reply is batted, then caught; a flytrap snaps, then a flyer clears it.
function Camp(){return <svg width="1012" height="792" style={{position:'absolute',inset:0}}>
 <rect width="1012" height="792" fill="#577957"/>
 <path d="M0 0H91L65 563H0M953 0h59v617l-82-40Z" fill="#264B37"/>
 <path d="M0 181Q155 111 283 185T604 168T1012 199V671H0Z" fill="#456B43"/>
 <path d="M49 650L111 255 500 101 930 235 989 650Z" fill="#B8985B" stroke="#4A5135" strokeWidth="13"/>
 <path d="M146 278L501 153 874 268 887 655H130Z" fill="#816B42"/>
 <path d="M297 645L401 238 506 192 600 235 713 645Z" fill="#203F30"/>
 <path d="M112 253l295-30-108 422-170-16ZM930 235l-331 3 112 407 176-24Z" fill="#C3A266"/>
 <path d="M126 295l-30 324M170 280l-21 240M229 263l-33 188M858 280l34 333M804 278l39 185" fill="none" stroke="#A48448" strokeWidth="9"/>
 <path d="M99 652L51 163M928 652L966 160M48 185L504 102 966 181" fill="none" stroke="#4E482C" strokeWidth="14"/>
 <path d="M89 237L1 624M941 238l71 388" stroke="#D2B373" strokeWidth="5"/>
 <path d="M0 653Q240 629 415 655T1012 630V792H0" fill="#213A25"/>
 <path d="M251 675l193-32 212 19 155 74-229 45-258-31Z" fill="#71633B"/>
 <path d="M270 691l214-30M292 720l272-49M376 753l254-62M636 759l94-31" stroke="#A28A4F" strokeWidth="7"/>
 <g transform="translate(94 169)"><path d="M0 0v54" stroke="#615030" strokeWidth="7"/><path d="M-27 58h54v61h-54Z" fill="#D2B977" stroke="#584A2D" strokeWidth="7"/><path d="M-31 58l12-21h38l12 21M-32 122h64M0 62v54" fill="#857044" stroke="#584A2D" strokeWidth="6"/></g>
 <path d="M0 681l69-23 42 42v92H0M905 699l74-21 33 18v96H905Z" fill="#332E1D" stroke="#192B20" strokeWidth="8"/>
 <path d="M7 696l67-21 23 21M919 714l61-22M30 684v108M951 704v88" stroke="#82663B" strokeWidth="7"/>
 <path d="M0 763l69 8 45 21M1012 757l-57 35" stroke="#172A1D" strokeWidth="22"/>
 </svg>}

/** 1.3667 s. Physical contacts at .08 (send), .40 (return), .82 (catch), 1.05 (crush). */
export function Chat({t}:{t:number}){
 const send=S(t,.02,.30),back=S(t,.38,.37),catchIt=S(t,.76,.20),crush=S(t,.94,.34);
 const x=343+159*send-159*back-20*catchIt;
 const y=360-34*Math.sin(send*Math.PI)+38*Math.sin(back*Math.PI)+60*crush;
 const leftHit=pulse(t,.01,.22),rightHit=pulse(t,.33,.26);
 return <div style={{position:'absolute',inset:0,overflow:'hidden'}}><Camp/>
 <Clay t={t} x={680-29*rightHit+28*catchIt} y={357-23*rightHit} s={302} role="reviewer" rot={-12*rightHit+8*catchIt} gaze={-1} stern={1-catchIt} shock={catchIt*.55}/>
 <Darwin t={t} x={42+32*leftHit+40*catchIt} y={349-22*leftHit-19*catchIt+23*crush} s={322} rot={12*leftHit-11*catchIt+15*crush} gaze={1} think={1-crush} cheer={.45*crush}/>
 <P x={x} y={y} w={218} h={159} style={{transform:`rotate(${-8+17*send-13*back-26*crush}deg) scale(${1-.70*crush},${1-.57*crush})`,transformOrigin:'8% 92%'}}>
 <svg viewBox="0 0 218 159" width="218" height="159" style={{overflow:'visible'}}>
 <path d="M29 5H186Q210 5 211 32V105Q211 128 183 128H64L26 154L34 127H29Q7 126 7 102V31Q7 5 29 5Z" fill="#F1D9A0" stroke="#665733" strokeWidth="7"/>
 <g opacity={1-crush}><path d="M161 84Q168 47 119 45H67M87 22L62 45 87 68" stroke="#517252" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M99 94h47" stroke="#B3975E" strokeWidth="8" strokeLinecap="round"/></g>
 <g opacity={crush} fill="none" stroke="#9A7640" strokeWidth="8"><path d="M29 19l38 59-22 47M86 8l15 43 58-30-15 64 45 31M76 132l27-63 35 62M17 80l71 11 35-37 73 28"/></g>
 </svg></P>
 {/* The closed original hand follows the paper down; no grafted limbs. */}
 <svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none'}}><path d="M0 790l31-85 21 63 29-26 16 50M1012 792l-30-59-17 33-34-25-11 51" fill="#142B1D"/></svg>
 </div>;
}

function JungleCutaway(){return <svg width="1012" height="792" style={{position:'absolute',inset:0}}>
 <rect width="1012" height="792" fill="#608353"/>
 <path d="M0 107Q133 217 259 151Q370 90 497 156Q714 219 864 128Q955 101 1012 143V477H0" fill="#85A06B"/>
 <path d="M113 0L141 586M866 0L811 635M442 0L407 367" stroke="#486B44" strokeWidth="39"/>
 <path d="M0 232Q197 138 352 227T682 219T1012 212" fill="none" stroke="#2C5438" strokeWidth="42"/>
 <path d="M169 205Q167 288 197 326M720 231Q678 319 706 362M948 205Q921 273 926 334" fill="none" stroke="#487C44" strokeWidth="9"/>
 <path d="M0 535Q153 438 334 496Q489 477 672 531Q862 446 1012 499V792H0" fill="#365E35"/>
 <path d="M0 638Q246 600 418 636Q656 590 1012 645V792H0" fill="#203D25"/>
 <path d="M0 709Q235 661 397 692Q628 644 805 682L1012 671V792H0" fill="#182D1C"/>
 <path d="M0 580Q48 444 180 475Q289 495 305 644L278 695H0Z" fill="#6E6437" stroke="#233F25" strokeWidth="13"/>
 <path d="M20 626Q91 494 173 532Q244 551 255 649L226 679H19Z" fill="#142F20"/>
 <path d="M21 548Q130 462 211 533M4 580l36-24M229 561l23 23M25 691l236-7" fill="none" stroke="#98834A" strokeWidth="9"/>
 <path d="M348 708Q462 643 590 660Q758 626 887 702L878 749H383Z" fill="#584F2B" stroke="#152F1E" strokeWidth="9"/>
 <path d="M374 706Q604 630 866 701" fill="none" stroke="#A08D48" strokeWidth="12"/>
 <path d="M859 675Q939 563 907 411Q859 296 940 167" fill="none" stroke="#315430" strokeWidth="38"/>
 <path d="M857 657Q924 556 892 423M908 357l-60-33" fill="none" stroke="#789050" strokeWidth="10"/>
 <path d="M941 175Q869 136 851 184Q881 225 941 190M905 429Q999 348 1006 419Q967 465 915 450M849 324Q797 270 789 317Q795 354 849 339" fill="#58833C" stroke="#315A2D" strokeWidth="7"/>
 <path d="M20 371Q51 265 109 336Q102 388 31 408M973 297Q902 222 960 219Q1007 231 1012 318" fill="#2B5731"/>
 <path d="M0 758l24-63 33 61 27-43 35 79M1012 712l-42-26-16 47-28-30-26 89h112Z" fill="#102D1A"/>
 </svg>}

/** Flytrap hinge is a real shared pivot; the upper and lower leaves close together. */
function Trap({t,close,thrust}:{t:number;close:number;thrust:number}){
 const hx=630-59*thrust,hy=501-8*thrust,angle=12-27*close;
 return <svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
 <path d={`M637 693Q705 606 ${hx} ${hy}`} stroke="#214C2E" strokeWidth="54" fill="none"/>
 <path d={`M630 684Q681 612 ${hx-4} ${hy+7}`} stroke="#709448" strokeWidth="17" fill="none"/>
 <path d="M660 618Q737 541 784 579Q760 637 675 641M658 651Q578 581 550 634Q599 688 658 670" fill="#4C7A38" stroke="#224F2A" strokeWidth="7"/>
 <path d="M674 619l81-31M651 659l-75-22" stroke="#8EA451" strokeWidth="5"/>
 <g transform={`translate(${hx} ${hy})`}>
 {[1,-1].map(side=><g key={side} transform={`scale(1 ${side}) rotate(${angle})`}>
 <path d="M8 0Q-123-172-285-81Q-272-19-156 8Q-61 28 8 0Z" fill="#517638" stroke="#203F25" strokeWidth="8"/>
 <path d="M-11-9Q-137-137-265-75Q-203-30-125-14Z" fill="#AF7151"/>
 <path d="M-8-7Q-133-87-260-75" stroke="#759348" strokeWidth="10" fill="none"/>
 {[0,1,2,3,4,5].map(i=><path key={i} d={`M${-244+i*37} ${-54+i*9}l${8+i*1.3} ${29-i*2} 11-${22-i}Z`} fill="#E1D39A" stroke="#546138" strokeWidth="2"/>)}
 <path d="M-236-91l19 15M-200-104l23 33M-155-103l16 42M-107-82l8 32" stroke="#829345" strokeWidth="4"/>
 </g>)}
 <ellipse cx="0" cy="0" rx="36" ry="48" fill="#789341" stroke="#2C532C" strokeWidth="8"/>
 </g></svg>;
}

/** 3.5 s. Candidate contacts .39 / 1.29; broad-wing lift1.93; fruit catch2.99. */
export function Test({t}:{t:number}){
 const which=t<.9?0:t<1.8?1:2,lt=t-[0,.9,1.8][which];
 const contact=.36,approach=S(lt,0,contact),recoil=S(lt,.4,.39);
 const close=which<2?pulse(lt,.27,.38):pulse(lt,.23,.49);
 const thrust=which<2?pulse(lt,.27,.43):pulse(lt,.27,.53)*.54;
 const lift=S(lt,.02,.65),cross=S(lt,.62,.65),grab=S(lt,1.17,.26),carry=S(lt,1.38,.31);
 const retire=S(lt,.70,.20);
 const x=which<2?mix(182+104*approach-187*recoil,which===0?28:133,retire):121+179*lift+294*cross-38*carry;
 const y=which<2?mix(360-62*Math.sin(approach*Math.PI)+122*recoil,which===0?557:552,retire):348-206*lift+62*cross-11*carry;
 const sz=which===2?280:mix(290-45*recoil,which===0?128:130,retire);
 return <div style={{position:'absolute',inset:0,overflow:'hidden'}}><JungleCutaway/>
 {/* The failed flyers remain folded inside the low-contrast shelter, never teleport away. */}
 {which>0&&<Creature t={t} x={28} y={557} s={128} type={0} open={.05} flap={0} rot={-12} shock={.25} gaze={2}/>}
 {which>1&&<Creature t={t} x={133} y={552} s={130} type={1} open={.06} flap={0} rot={8} shock={.2} gaze={2}/>}
 {which===2&&<Trap t={t} close={close} thrust={thrust}/>}
 <Creature t={t} x={x} y={y} s={sz} type={which} open={which<2?.72-.57*recoil:.72+.28*lift} flap={which<2?Math.sin(lt*22)*(.5-.36*recoil):Math.sin(lt*15)*(.5-.25*grab)} rot={which<2?-5+11*approach-27*recoil:-12+15*cross-5*carry} shock={which<2?recoil*.8:0} cheer={grab*.75} gaze={4*(1-carry)}/>
 {which<2&&<Trap t={t} close={close} thrust={thrust}/>}
 <Fruit x={831-21*grab-38*carry} y={299+21*grab-11*carry} s={70} taken={grab}/>
 {/* Front-root silhouette stays below the legs; it belongs to the plant's soil bed. */}
 <svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none'}}><path d="M534 739Q571 700 643 719Q688 684 735 733Q779 708 817 772M600 755l-50 37M722 740l29 52" fill="none" stroke="#0F291A" strokeWidth="29" strokeLinecap="round"/></svg>
 </div>;
}
