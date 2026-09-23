import React from 'react';

/**
 * Geometry contract (before rot/flip): viewBox300×230, CSS height=s×230/300.
 * Feet stand at local y222. At peck=0 the shared bite centre is (250,100),
 * hence world (x+s*250/300,y+s/3). All three beaks share hinge(205,100)
 * and tip(291,100); their depth, not the target location, changes.
 * peck rotates the head clockwise by24°×peck around(185,104).
 * open rotates the upper/lower mandibles −24°/+22° around(205,100).
 * rot rotates the complete bird around its standing point(143,222).
 * beakLength scales around the hinge: contact=(205+45*beakLength,100).
 * beakDepth scales mandible thickness, keeping that contact centre unchanged.
 * flip mirrors around x150: flipped contact=(300-contactX,contactY).
 * Apply the documented head peck rotation to this point when peck is nonzero.
 * No flight or idle wing flapping; offspring retain type2 plumage with beak variants.
 */
export function GroundFinch({x,y,s=300,t=0,type=0,open=0,rot=0,peck=0,shock=0,cheer=0,flip=false,beakDepth=1,beakLength=1}:{x:number;y:number;s?:number;t?:number;type?:0|1|2;open?:number;rot?:number;peck?:number;shock?:number;cheer?:number;flip?:boolean;beakDepth?:number;beakLength?:number}){
 const p=[['#425C70','#233D53','#94ABAE','#B4BBAC'],['#AF654F','#714237','#D8A77F','#E6C99E'],['#AE8A3E','#72572C','#D6B563','#EDDBA4']][type];
 const upper=['M198 88Q239 89 291 100L203 104Z','M198 76Q252 71 291 100L204 104Z','M198 61Q258 52 291 100L204 104Z'][type];
 const lower=['M203 104L291 100Q250 110 204 115Z','M203 104L291 100Q249 130 204 127Z','M203 104L291 100Q254 154 204 142Z'][type];
 return <div style={{position:'absolute',left:x,top:y,width:s,height:s*230/300,transform:`rotate(${rot}deg)`,transformOrigin:`${143/3}% ${222/2.3}%`}}>
 <svg width="100%" height="100%" viewBox="0 0 300 230" style={{overflow:'visible'}}>
 <g transform={flip?'translate(300 0) scale(-1 1)':undefined}>
 <ellipse cx="135" cy="225" rx="65" ry="6" fill="#15283B30"/>
 <path d="M119 174l-7 40-22 8m22-8 12 10M162 175l6 40 23 7m-23-7-13 10" stroke="#5B4732" strokeWidth="6" fill="none" strokeLinecap="round"/>
 <path d="M81 129L7 99l21 49-12 22 76-1Z" fill={p[1]} stroke="#253847" strokeWidth="4"/>
 <path d="M22 118l52 24M30 137l43 13M31 156l46 1" stroke={p[2]} strokeWidth="3"/>
 <path d="M61 100Q99 68 153 88Q189 96 189 137Q188 183 144 192Q85 205 52 168Q35 138 61 100Z" fill={p[0]} stroke="#253847" strokeWidth="4"/>
 <path d="M68 155Q99 182 137 178Q163 174 176 153Q169 197 121 194Q83 194 62 169Z" fill={p[3]}/>
 <path d="M70 100Q119 75 158 115Q157 159 112 169Q75 159 70 100Z" fill={p[1]} stroke="#253847" strokeWidth="4"/>
 <path d="M76 108Q123 97 147 122M77 118Q114 121 141 140M84 135Q108 145 124 153" stroke={p[2]} strokeWidth="7" strokeLinecap="round" fill="none"/>
 <path d="M75 91q9-15 22-11M107 88q9-13 20-7M139 94l10-3" stroke={p[2]} strokeWidth="3" strokeLinecap="round"/>
 <g transform={`rotate(${24*peck} 185 104)`}>
 <path d="M143 121Q119 83 137 49Q159 17 195 32Q225 39 226 82Q224 121 192 140L159 140Z" fill={p[0]} stroke="#253847" strokeWidth="4"/>
 <path d="M144 70Q139 44 169 37Q193 31 208 49Q164 43 144 70Z" fill={p[2]}/>
 <path d="M150 104Q151 85 172 84Q188 92 188 109Q171 127 150 104Z" fill={p[3]}/>
 <path d="M139 84q6 7 10 18M139 99l7 10M147 114l8 8" stroke={p[1]} strokeWidth="3" fill="none"/>
 <g transform={`translate(205 100) scale(${beakLength} ${beakDepth}) translate(-205 -100)`}>
 <g transform={`rotate(${-24*open} 205 100)`}><path d={upper} fill={type===2?'#3B382F':'#A88B50'} stroke="#493F30" strokeWidth="4" strokeLinejoin="round"/><path d={type===0?'M216 94L269 99':type===1?'M213 84Q250 84 275 97':'M213 70Q245 64 275 91'} fill="none" stroke={type===2?'#77724F':'#DDC985'} strokeWidth="4" strokeLinecap="round"/></g>
 <g transform={`rotate(${22*open} 205 100)`}><path d={lower} fill={type===2?'#55503A':'#C0A263'} stroke="#493F30" strokeWidth="4" strokeLinejoin="round"/><path d="M212 109L274 103" stroke={type===2?'#8D8458':'#E2C986'} strokeWidth="2"/></g>
 <path d="M202 99L286 100" fill="none" stroke="#282F2C" strokeWidth="3" opacity={1-open}/></g>
 <circle cx="187" cy="64" r={12+shock*2} fill={p[3]}/>
 {cheer>.7?<path d="M179 65q8-10 16 0" fill="none" stroke="#172D3D" strokeWidth="5" strokeLinecap="round"/>:<><circle cx="187" cy="64" r={8+shock*1.5} fill="#142A3A"/><circle cx="190" cy="61" r="2.5" fill="#FFF5DC"/></>}
 <path d={`M177 ${47-shock*7}q10-${4+shock*4} 20 3`} fill="none" stroke={p[1]} strokeWidth="4" strokeLinecap="round"/>
 </g></g></svg></div>;
}

/** Seed centre is exactly(x+.5s,y+.5s). Closed outer bounds .04s..96s.
 * split0→1 opens both jagged shell halves around the stationary bright kernel.
 * Left/right move ±.34s horizontally,+.22s down and rotate∓31degrees.
 */
export function HardSeed({x,y,s=160,split=0,t=0,kernelPull=0,shellFall=0,kernelGone=0}:{x:number;y:number;s?:number;split?:number;t?:number;kernelPull?:number;shellFall?:number;kernelGone?:number}){return <div style={{position:'absolute',left:x,top:y,width:s,height:s}}><svg viewBox="0 0 160 160" width="100%" height="100%" style={{overflow:'visible'}}>
 <ellipse cx="80" cy="145" rx="61" ry="10" fill="#2537472B"/>
 <g opacity={split*(1-kernelGone)} transform={`translate(${-30*kernelPull} ${-8*kernelPull})`}><path d="M82 35Q46 30 38 65Q34 103 74 124Q117 107 121 73Q120 41 82 35Z" fill="#F4D66D" stroke="#A57626" strokeWidth="5"/><path d="M67 48Q44 72 68 104" stroke="#FFF0B1" strokeWidth="10" fill="none" strokeLinecap="round"/><path d="M85 48Q75 82 90 109" stroke="#DAB345" strokeWidth="4" fill="none"/></g>
 <g transform={`translate(${-54*split} ${35*split+shellFall}) rotate(${-31*split-40*shellFall/160} 70 125)`}>
 <path d="M81 7C19 7-4 59 15 107Q33 147 80 150L70 126 89 106 70 85 87 62 70 37Z" fill="#9D633B" stroke="#513E30" strokeWidth="6" strokeLinejoin="round"/>
 <path d="M59 20Q18 29 22 77Q20 113 60 134" fill="none" stroke="#C59054" strokeWidth="12" strokeLinecap="round"/>
 <path d="M55 34Q36 53 41 79M44 92l10 19M25 81l10 4M52 25l5 9M58 121l7 7" fill="none" stroke="#75472E" strokeWidth="4" strokeLinecap="round"/>
 <path d="M71 39l16 23-17 23 19 21-19 20 10 24" fill="none" stroke="#D8AA6C" strokeWidth="4"/>
 </g>
 <g transform={`translate(${54*split} ${35*split+shellFall}) rotate(${31*split+40*shellFall/160} 90 125)`}>
 <path d="M81 7C142 10 164 61 147 105Q130 143 80 150L70 126 89 106 70 85 87 62 70 37Z" fill="#B57B43" stroke="#513E30" strokeWidth="6" strokeLinejoin="round"/>
 <path d="M108 23Q140 44 139 79Q138 111 111 129" stroke="#D09B5A" strokeWidth="9" strokeLinecap="round" fill="none"/>
 <path d="M104 44l6 10M119 70l6 15M106 103l-4 12M130 47l-2 13" stroke="#89572F" strokeWidth="5" strokeLinecap="round"/>
 </g></svg></div>}

export function SeedKernel({x,y,s=50}:{x:number;y:number;s?:number}){return <div style={{position:'absolute',left:x,top:y,width:s,height:s}}><svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M51 7Q9 5 8 46Q9 77 47 95Q88 75 91 43Q86 6 51 7Z" fill="#F4D66D" stroke="#A57626" strokeWidth="5"/><path d="M36 23Q17 49 38 75" stroke="#FFF0B1" strokeWidth="12" fill="none" strokeLinecap="round"/><path d="M58 23Q47 50 63 82" stroke="#DAB345" strokeWidth="5" fill="none"/></svg></div>}

function Shore(){return <>
 <rect width="1012" height="792" fill="#E7DFC5"/>
 <path d="M0 252L111 203 193 232 302 184 395 218 495 190 610 239 724 201 845 236 933 213 1012 254V453H0" fill="#B8CBC1"/>
 <path d="M0 354Q187 326 323 354T668 352T1012 344V647H0" fill="#83B3BC"/>
 <path d="M0 406Q191 367 380 405T740 393T1012 399V569H0" fill="#5A91A8"/>
 <path d="M353 398h146M583 435h171M93 459h166M792 386h150M432 496h124" stroke="#C1D9CD" strokeWidth="6" strokeLinecap="round"/>
 <path d="M0 465L94 402 137 297 229 322 271 444 340 469 321 553H0Z" fill="#234B65"/>
 <path d="M96 403l41-106 92 25-79 30-5 83ZM172 445l36-54 38 69Z" fill="#557F92"/>
 <path d="M1012 310L954 359 909 342 857 470 780 529H1012Z" fill="#17394F"/>
 <path d="M951 366l-30 99-55 22 43-145ZM942 495l70-65v88Z" fill="#577E8E"/>
 <path d="M0 539Q182 480 370 554Q534 511 698 548Q853 487 1012 530V792H0" fill="#D5C08D"/>
 <path d="M0 628Q183 586 336 629Q548 598 744 628Q887 579 1012 619V792H0" fill="#E2D3A5"/>
 <path d="M62 648l48-11 29 17M802 658l52-14 46 20M352 724l48-8 24 10" fill="none" stroke="#BDA374" strokeWidth="5" strokeLinecap="round"/>
 <path d="M0 733L59 704 104 729 181 792H0M1012 706l-51 38-57 48h108Z" fill="#132333"/>
 <path d="M28 743l23-73M32 718l-25-18M46 690l30-18M973 747l-13-65M961 704l-23-16" stroke="#4A6E58" strokeWidth="7"/>
 </>}
function Museum(){return <>
 <rect width="1012" height="792" fill="#123047"/>
 <path d="M0 131H1012V625H0Z" fill="#244B63"/>
 <path d="M30 134H308V602H30ZM754 132H983V604H754Z" fill="#102235" stroke="#49697A" strokeWidth="8"/>
 <path d="M54 165H282V439H54Z" fill="#436A79" stroke="#947441" strokeWidth="10"/>
 <g transform="translate(70 239) rotate(-12)"><path d="M0 72Q80-40 168 54M23 38l-8 54M49 11l-1 63M79 0l3 64M109 8l13 58M139 25l18 47" fill="none" stroke="#A4AA85" strokeWidth="12" strokeLinecap="round"/><path d="M163 51l33-14 9 23-28 15Z" fill="#A4AA85"/></g>
 <path d="M60 472H280V580H60Z" fill="#6D5B3D" stroke="#0A2031" strokeWidth="7"/><path d="M74 508H269M170 476V575M110 490h23M207 490h23M110 543h23M207 543h23" stroke="#B19254" strokeWidth="7"/>
 <g transform="translate(779 186)"><path d="M0 0H177V192H0Z" fill="#AEB19B" stroke="#A18751" strokeWidth="8"/><path d="M17 146Q64 125 120 142L161 129" fill="none" stroke="#596C63" strokeWidth="8"/><path d="M69 136Q28 102 53 66Q88 34 117 67Q151 93 125 132Z" fill="#536D73"/><path d="M114 62Q131 45 145 63L170 74 146 82Q132 104 116 94Z" fill="#536D73"/><path d="M88 138v16m19-18 1 14" stroke="#596C63" strokeWidth="4"/><circle cx="137" cy="66" r="4" fill="#273F4B"/></g>
 <path d="M768 457H972M780 553H965" stroke="#997D48" strokeWidth="12"/>
 {[802,864,925].map((x,i)=><g key={x}><path d={`M${x-13} 476h26v8l7 9v51h-40v-51l7-9Z`} fill="#628681" stroke="#324C5C" strokeWidth="4"/><path d={`M${x-15} 475h30`} stroke="#B09354" strokeWidth="8"/><ellipse cx={x} cy={520} rx={8+i*2} ry={11-i} fill="#D1B476"/></g>)}
 <path d="M337 139H725M348 142V603M715 142V603" stroke="#3D6074" strokeWidth="9"/>
 <path d="M0 625H1012V792H0Z" fill="#121F2C"/>
 <path d="M0 625H1012M0 696H1012M0 766H1012M218 629L155 792M784 629L866 792" stroke="#5F5940" strokeWidth="5"/>
 <path d="M0 735h66l25 57H0M1012 729l-75 28-10 35h85" fill="#0B1E2E"/>
 </>}
function Grove(){return <>
 <rect width="1012" height="792" fill="#ACB498"/>
 <path d="M0 0H105L89 529H0M851 0h121l40 587-145-9ZM373 0h39l-14 451h-65Z" fill="#768B7D"/>
 <path d="M0 201Q105 145 227 199T510 188T793 174T1012 190V550H0" fill="#91A28B"/>
 <path d="M0 483Q136 377 295 459Q487 390 625 468Q816 351 1012 454V705H0" fill="#77697D"/>
 <path d="M0 596Q171 507 357 574Q552 524 708 575Q863 501 1012 573V792H0" fill="#251C37"/>
 <path d="M0 677Q237 639 419 672Q687 626 1012 660V792H0" fill="#1B1D31"/>
 <path d="M0 607Q184 566 363 627Q573 583 768 628L1012 599V671Q792 698 629 658Q410 698 239 667Q110 642 0 677Z" fill="#B0AE83"/>
 <path d="M-20 613Q115 448 80 221Q52 138 116 42M974 614Q894 393 984 187" stroke="#192135" strokeWidth="41" fill="none"/>
 <path d="M85 247Q175 189 243 223M948 319l-96-68M87 320l-54-45" stroke="#66546D" strokeWidth="15" fill="none"/>
 <path d="M157 200Q128 144 194 135Q228 165 189 213M236 219Q264 157 296 189Q290 230 247 237M850 251Q779 204 786 262Q819 288 860 269M952 382Q1018 319 1018 372Q1002 408 957 407" fill="#687F56" stroke="#456051" strokeWidth="5"/>
 <path d="M249 644l49-9 34 12M718 655l75-18M449 708l51-16" fill="none" stroke="#85875F" strokeWidth="6"/>
 <path d="M0 755Q64 693 114 792H0M1012 737Q939 693 899 792h113" fill="#111E30"/>
 <path d="M27 775l13-74 18 39 26-46M970 769l-21-70-19 38-20-23" stroke="#405542" strokeWidth="9" fill="none"/>
 </>}

/** Fixed1012×792 stage; top135 is reserved; ground/feet baseline is≈680.
 * Scenery is static, with contrasting navy/cream shore, cobalt museum, plum/sage grove.
 */
export function FinchWorld({kind,children}:{kind:'shore'|'museum'|'grove';children?:React.ReactNode}){return <div style={{position:'absolute',inset:0,width:1012,height:792,overflow:'hidden'}}><svg width="1012" height="792" style={{position:'absolute',inset:0,pointerEvents:'none'}}>{kind==='shore'?<Shore/>:kind==='museum'?<Museum/>:<Grove/>}</svg>{children}</div>}
