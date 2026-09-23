import React from 'react';

export type NaturalWorldKind = 'ravine'|'cabin'|'greenhouse'|'canopy'|'ice'|'fossil'|'laboratory';
type Props={kind:NaturalWorldKind;t:number;children?:React.ReactNode};

// Static, authored matte scenery. All action belongs to the foreground cast.
// No animated texture, camera drift, labels, gradients or generated imagery.
const Leaf=({x,y,s=1,r=0,c='#315D50',vein='#688269'}:{x:number;y:number;s?:number;r?:number;c?:string;vein?:string})=><g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
  <path d="M0 0C-71-9-116-73-90-146C-15-153 44-101 0 0Z" fill={c}/>
  <path d="M0 0Q-48-66-90-146M-23-38l-40-7M-37-64l-40-11M-55-92l-25-6M-23-38l13-36M-40-65l9-34M-59-96l9-23" fill="none" stroke={vein} strokeWidth="3"/>
</g>;
const Fern=({x,y,s=1,r=0,c='#456D50'}:{x:number;y:number;s?:number;r?:number;c?:string})=><g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
 <path d="M0 0Q-12-90 23-190" stroke={c} strokeWidth="5" fill="none"/>
 {[0,1,2,3,4,5].map(i=><g key={i} transform={`translate(${i*i*.6} ${-25-i*27})`}><path d={`M0 0Q${-58+i*5} -6 ${-50+i*6} -35Q-9-27 0 0M0 0Q${60-i*5} -4 ${53-i*6} -30Q17-26 0 0`} fill={c}/></g>)}
</g>;
const Ammonite=({x,y,s=1,c='#BE9264'}:{x:number;y:number;s?:number;c?:string})=><g transform={`translate(${x} ${y}) scale(${s})`}>
 <path d="M54 15C102 0 147 34 135 80C122 127 53 139 18 103C-19 67 8 16 47 23C83 29 88 76 58 89C36 99 20 74 32 60C41 50 54 53 55 65" fill="none" stroke={c} strokeWidth="13" strokeLinecap="round"/>
 <path d="M74 13l-4 18M101 23l-12 16M124 43l-20 7M134 72l-21-3M123 98l-15-14M98 117l-7-20M67 121l2-20M37 114l12-18M16 93l19-11M9 63l20 1M22 37l14 12" stroke={c} strokeWidth="4"/>
</g>;
const Jar=({x,y,s=1,plant=false}:{x:number;y:number;s?:number;plant?:boolean})=><g transform={`translate(${x} ${y}) scale(${s})`}>
 <path d="M10 0H52V13L60 25V107Q31 121 2 107V25L10 13Z" fill="#74948A" stroke="#537168" strokeWidth="3"/>
 <path d="M8 52H54V104Q31 112 8 104Z" fill="#8EA58B"/>
 <path d="M9 0H53V13H9Z" fill="#A58858"/><path d="M12 4H50" stroke="#C0A16B" strokeWidth="3"/>
 {plant?<path d="M30 102V36M30 70Q3 61 15 43Q33 46 30 70M31 84Q53 74 48 59Q30 62 31 84" fill="#567563" stroke="#435F50" strokeWidth="3"/>:<g fill="none" stroke="#566B5C" strokeWidth="4"><path d="M33 42Q9 48 23 64T36 89Q13 89 16 100"/><path d="M27 53l-9-8M32 75l13-10M30 87l9 13"/></g>}
 <path d="M12 27v64" stroke="#B1C3AF" strokeWidth="4"/>
</g>;

function Ravine(){return <>
 <rect width="1012" height="792" fill="#D7E2D0"/>
 <path d="M0 239L136 211 189 159 263 183 349 136 429 186 537 163 646 224 755 182 862 225 934 184 1012 216V792H0Z" fill="#B5C8B5"/>
 <path d="M0 367L101 299 175 309 244 258 373 295 457 244 537 310 673 258 754 307 871 265 1012 319V792H0Z" fill="#8FAC9F"/>
 <path d="M275 322L420 376 454 523 526 566 502 792H302L328 565 287 487Z" fill="#74978C"/>
 <path d="M828 308L681 376 623 498 585 613 569 792H786L744 580 818 506Z" fill="#72988D"/>
 <path d="M525 346Q510 470 541 548Q558 619 502 718L478 792H571L592 733Q628 653 588 557Q566 474 580 346Z" fill="#9CBFB1"/>
 <path d="M544 385Q533 478 555 541M566 590Q581 651 537 718M508 758l-13 32" fill="none" stroke="#C5D7C4" strokeWidth="7"/>
 <path d="M0 608L118 583 205 602 286 594 331 640 308 668 292 727 305 792H0Z" fill="#756C50"/>
 <path d="M0 608L125 580 206 598 284 592 334 639 289 653 187 643 105 650 0 639Z" fill="#ABBD79"/>
 <path d="M0 654L73 682 142 669 229 696 300 672M8 720l76-15 72 33 127-15M124 649l-10 50 30 49-9 44M244 656l-14 43 15 43" fill="none" stroke="#5E614B" strokeWidth="10"/>
 <path d="M740 489L769 451 847 440 914 459 1012 435V792H769L790 734 761 681 781 612 756 561Z" fill="#64765B"/>
 <path d="M739 489L765 451 847 437 914 456 1012 432V482L929 495 873 480 804 503Z" fill="#B2C581"/>
 <path d="M767 539l96-24 52 23 97-12M782 609l77-33 65 30 88-9M786 693l93-12 64 24M841 495l-16 71 34 62-20 51M963 493l-29 40 19 63-33 45" fill="none" stroke="#526951" strokeWidth="10"/>
 <path d="M796 462Q755 444 763 403M848 448Q837 401 858 371M979 446Q945 401 971 352" fill="none" stroke="#657D52" strokeWidth="7"/>
 <Fern x={87} y={608} s={.66} r={-22} c="#7C965B"/><Fern x={971} y={455} s={.55} r={23} c="#6B895A"/>
 <path d="M29 596l-5-29m5 29 17-22M196 595l12-32M287 609l-6-27" stroke="#799358" strokeWidth="5"/>
 </>}

function Cabin(){return <>
 <rect width="1012" height="792" fill="#715033"/>
 <path d="M0 106H1012V638H0Z" fill="#A37A46"/>
 {[145,219,293,367,441,515,589].map(y=><g key={y}><path d={`M0 ${y}H1012`} stroke="#815F36" strokeWidth="3"/><path d={`M${y%3*150} ${y+17}q100-14 201 0M${601-y%70} ${y+43}q87 11 163-2`} fill="none" stroke="#936D3D" strokeWidth="2"/></g>)}
 <path d="M0 100H1012M45 110L96 636M964 110L911 636" stroke="#242820" strokeWidth="32"/>
 <path d="M48 100L96 635M961 100L911 635" stroke="#BA9352" strokeWidth="6"/>
 <path d="M60 176L123 119H247L312 178V319L251 382H123L60 322Z" fill="#303D32" stroke="#CCA455" strokeWidth="12"/>
 <path d="M80 185L134 139H238L291 187V311L243 360H132L81 312Z" fill="#98AF8D"/>
 <path d="M82 265Q149 243 213 267T291 264V310L243 360H132L81 312Z" fill="#3B7D70"/>
 <path d="M86 287l67 1M184 310h79M111 335h59" stroke="#ADC2A0" strokeWidth="4"/>
 <path d="M189 145V357M83 250H290" stroke="#5D6946" strokeWidth="8"/>
 {[105,266].map(x=><g key={x}><circle cx={x} cy="164" r="5" fill="#50452C"/><circle cx={x} cy="335" r="5" fill="#50452C"/></g>)}
 <g transform="translate(675 169) rotate(3)"><path d="M0 0H255V215H0Z" fill="#C8AC6C" stroke="#665033" strokeWidth="9"/><path d="M32 19l65 12 13 37-28 32 37 16-12 54-39 22-40-30 12-54-21-31ZM179 37l49 21-8 41-35 6-10 48-29-7 9-65Z" fill="#678461"/><path d="M14 190Q100 154 158 93T239 22M19 60q85 91 218 104" fill="none" stroke="#AD8244" strokeWidth="3" strokeDasharray="8 8"/><path d="M222 176v-34m-16 17h32m-16-17 5 10h-10Z" stroke="#5B6945" strokeWidth="3" fill="#5B6945"/></g>
 <path d="M340 119Q387 171 401 269M614 116Q571 169 559 240" fill="none" stroke="#57452D" strokeWidth="6"/>
 <path d="M383 167l36-12M577 170l-35-12M394 207l34-11M565 209l-34-10" stroke="#57452D" strokeWidth="5"/>
 <path d="M83 466H284V628H83Z" fill="#342E21" stroke="#24261C" strokeWidth="8"/>
 {[477,523,569].map(y=><g key={y}><path d={`M93 ${y}H274V${y+37}H93Z`} fill="#846436"/><path d={`M165 ${y+15}h32v9h-32Z`} fill="#CAA150"/><path d={`M95 ${y+34}H271`} stroke="#66502F" strokeWidth="2"/></g>)}
 <path d="M762 477H946M774 458h14v18M796 433h22v43M827 419h17v57M856 439h23v37M889 423h15v53" stroke="#544029" strokeWidth="12"/>
 <path d="M0 638H1012V792H0" fill="#1B2118"/>
 {[648,704,766].map(y=><path key={y} d={`M0 ${y}H1012`} stroke="#695131" strokeWidth="4"/>)}
 <path d="M100 638L24 792M284 638L251 792M729 638L775 792M911 638L1000 792" stroke="#695131" strokeWidth="3"/>
 <path d="M0 632H1012" stroke="#B48C44" strokeWidth="10"/>
 </>}

function Greenhouse(){return <>
 <rect width="1012" height="792" fill="#83AC98"/>
 <path d="M0 183L136 118 279 160 447 110 621 159 829 100 1012 177V636H0Z" fill="#638F7C"/>
 <path d="M0 359Q104 221 263 337Q428 252 604 318Q825 219 1012 332V644H0" fill="#467963"/>
 <path d="M0 403Q261 296 438 376T1012 363V633H0" fill="#3B6B55"/>
 <path d="M33 625V282C33 40 979 40 979 282V625M142 626V270C142 96 870 96 870 270V626M309 624V250Q506 126 703 250V624M506 125V624M40 315H975M40 475H975" fill="none" stroke="#0D241C" strokeWidth="10"/>
 <path d="M33 282Q506 33 979 282M142 270Q506 110 870 270" fill="none" stroke="#87AC8B" strokeWidth="3"/>
 <g stroke="#84AF99" strokeWidth="3" opacity=".65">{[75,222,361,598,755,942].map((x,i)=><path key={x} d={`M${x} ${190+i%3*43}l-10 35m-8 28-9 34M${x+39} ${380+i%2*51}l-10 39`}/>)}</g>
 <path d="M0 627H1012V792H0Z" fill="#102B20"/>
 <path d="M32 680L273 641 708 641 982 680 982 792H32Z" fill="#264D37"/>
 <path d="M128 692H885M77 750H936M308 645L253 792M700 645L769 792M506 642V792" stroke="#56734D" strokeWidth="4"/>
 <path d="M5 458H99V654H5M925 459H1009V654H925" fill="#152D20"/>
 <path d="M0 471H112M916 471H1012" stroke="#99AA66" strokeWidth="14"/>
 <Fern x={57} y={466} s={1.3} r={-2} c="#1D5235"/><Fern x={944} y={466} s={1.25} r={12} c="#1D4D33"/>
 <Leaf x={78} y={382} s={1.35} r={-14} c="#295E3A"/><Leaf x={949} y={384} s={1.15} r={80} c="#316940"/>
 <path d="M858 120V214M832 214h53l-8 41h-38Z" fill="#614F2C" stroke="#456339" strokeWidth="4"/>
 <Fern x={856} y={223} s={.51} r={16} c="#275A37"/>
 <path d="M0 749l75-21 98 64H0M1012 740l-54 5-74 47h128" fill="#112B1E"/>
 </>}

function Canopy(){return <>
 <rect width="1012" height="792" fill="#8AAC76"/>
 <path d="M0 0H161Q214 112 156 247L188 638H99L101 262Q69 145 0 111ZM746 0H884Q808 142 846 292L909 655H809L784 279Q805 146 746 0Z" fill="#517C56"/>
 <path d="M292 0H354L330 510H274ZM635 0H692L726 568H645Z" fill="#719863"/>
 <path d="M336 305L407 282 434 379 462 418 425 635H293Z" fill="#3B7054"/>
 <path d="M440 292Q433 387 456 421Q469 480 449 550L443 634H504L526 551Q537 468 510 417Q493 359 497 292Z" fill="#80B59B"/>
 <path d="M462 309Q455 381 476 424M485 449l5 44M478 529l-8 75" fill="none" stroke="#B7CBA6" strokeWidth="6"/>
 <path d="M0 580Q152 463 289 554Q405 536 462 611Q680 495 840 558Q931 501 1012 540V792H0" fill="#285A3F"/>


 <path d="M-24 667Q58 479 15 253Q-39 52 124-6M18 263Q222 127 346 169Q500 213 585 155Q697 89 818 154Q963 173 1026 47" fill="none" stroke="#10291C" strokeWidth="84"/>
 <path d="M10 642Q78 479 36 265M32 251Q217 145 343 185Q490 225 585 170Q732 99 823 173" fill="none" stroke="#41652F" strokeWidth="17"/>
 <path d="M936 760Q984 529 1007 339M829 173Q782 233 792 345M293 164Q239 254 266 337M668 143Q632 220 660 284" fill="none" stroke="#30522B" strokeWidth="7"/>
 <Leaf x={167} y={213} s={1.15} r={90} c="#1E4A2B"/><Leaf x={248} y={161} s={1.1} r={-16} c="#2C5B31"/><Leaf x={810} y={185} s={1.05} r={99} c="#25552F"/>
 <Fern x={900} y={617} s={.8} r={30} c="#376638"/><Fern x={99} y={630} s={.7} r={-20} c="#2D5D30"/>
 <path d="M367 615Q497 635 751 583L760 792H365Z" fill="#163F36"/><path d="M475 621L445 792H513L538 615Z" fill="#669B8A"/>
 </>}

function Ice(){return <>
 <rect width="1012" height="792" fill="#ADCBD5"/>
 <path d="M0 301L139 159 231 247 347 128 433 259 557 172 631 248 754 120 875 257 948 193 1012 257V650H0" fill="#6F9BB5"/>
 <path d="M139 159l-38 90 41-17 24 29 17-23 48 9ZM347 128l-45 105 36-24 24 12 19-17 52 55ZM754 120l-55 117 43-36 21 24 20-23 47 39Z" fill="#D9E4DA"/>
 <path d="M0 399l175-90 128 127 122-58 103 106 101-103 127 39 145-117 111 75V697H0Z" fill="#477D9C"/>
 <path d="M350 475L498 430 641 481 595 524 668 601 582 691 301 711 419 631 353 568 443 526Z" fill="#85B4C5"/>
 <path d="M490 457l-54 56 45 44-29 36M552 478l-47 46 79 80-34 45" fill="none" stroke="#D0E3DB" strokeWidth="8"/>
 <path d="M0 163L113 200 193 370 214 572 170 667 0 690Z" fill="#102736"/>
 <path d="M0 163l113 37-57 62 92 38 45 70-112 36-81-70ZM21 425l102 13 83 124-113 63-93-51Z" fill="#6698B5"/>
 <path d="M1012 219l-132 45-96 165 14 139 45 109 169-9Z" fill="#102A38"/>
 <path d="M1012 219l-132 45 69 52-81 53-84 60 104 8 124-42ZM879 501l-81 67 45 109 77-45 92 22V483Z" fill="#82B4C8"/>
 <path d="M0 650Q179 594 327 661Q443 640 557 684Q760 605 1012 644V792H0" fill="#C4D9D5"/>
 <path d="M0 717Q124 679 252 718M712 712Q858 665 1012 712M308 770Q419 724 556 756" fill="none" stroke="#6C9BAE" strokeWidth="8"/>
 <path d="M25 541l80-16 44 39-22 24-112 1Z" fill="#4C7C8E"/>
 <g transform="translate(51 549) rotate(-12) scale(.45)"><path d="M0 25Q60-17 157 30M19 14v31M43 2v39M69-4v39M97 0v36M122 9v34" fill="none" stroke="#233F50" strokeWidth="9"/></g>
 <path d="M954 365l-13 67-18 12-1-68M80 302l-10 47-14 9-3-44" fill="#B4D6D9"/>
 </>}

function Fossil(){return <>
 <rect width="1012" height="792" fill="#AD7B40"/>
 <path d="M0 0H1012V229L903 211 819 239 716 220 602 251 510 232 405 260 291 240 188 258 73 229 0 265Z" fill="#74522E"/>
 <path d="M0 0H1012V184L915 171 861 220 788 177 701 201 649 165 558 209 492 176 419 213 367 183 309 207 232 175 171 212 114 188 64 230 0 202Z" fill="#251F18"/>
 <path d="M0 248L103 279 149 357 117 453 137 555 97 683H0M1012 213l-108 60-75 84 56 99-48 139 62 102h113" fill="#6B4829"/>
 <path d="M0 330l125 36M0 401l118 22M0 502l122-6M0 601l106-20M874 327l138-52M858 410l154-44M864 502l148-16M854 590l158-28" fill="none" stroke="#35281C" strokeWidth="12"/>
 <path d="M205 186l22 122 25-116M352 198l28 69 19-74M692 192l22 132 33-148M869 202l21 61 26-89" fill="#5E4025"/>
 <path d="M139 418Q346 374 508 421T875 406M138 504Q322 464 497 501T850 493" fill="none" stroke="#996936" strokeWidth="6"/>
 <g opacity=".62"><Ammonite x={43} y={282} s={.75} c="#B89C60"/><Ammonite x={854} y={450} s={.74} c="#BF9C5B"/>
 <g transform="translate(609 274) rotate(12)"><path d="M0 32Q82-10 171 29L199 21M26 23l-14 40M57 9L46 62M91 8l-4 56M122 14l10 53M148 24l22 35M169 28l19 14" stroke="#92652F" strokeWidth="10" fill="none" strokeLinecap="round"/><path d="M-10 31l-22 15-12-17 17-18Z" fill="#92652F"/></g></g>
 <path d="M0 672L159 641 307 665 457 648 599 663 802 632 1012 659V792H0" fill="#29231A"/>
 <path d="M0 726l142-24 109 33 164-26 133 29 106-24 177 9 181-18" fill="none" stroke="#76522C" strokeWidth="13"/>
 <path d="M15 659l31-111 26 74 34 30M935 649l19-85 25 64 33-34v71" fill="#3C2E1C"/>
 <path d="M94 692l37-11 25 10-18 11ZM858 686l48-8 19 15-48 3ZM702 763l31-9 28 15-47 8Z" fill="#71512C"/>
 </>}

function Laboratory(){return <>
 <rect width="1012" height="792" fill="#5B7F43"/>
 <path d="M0 128H1012V623H0Z" fill="#5B7F43"/>
 <path d="M308 134H747V612H308Z" fill="#708F50"/>
 <path d="M39 134H275V623H39Z" fill="#302A1C" stroke="#1C271D" strokeWidth="12"/>
 <path d="M60 153H254V570H60Z" fill="#385A43"/>
 <path d="M153 145V575M46 305H268M46 459H268" stroke="#8E743D" strokeWidth="14"/>
 <Jar x={77} y={188} s={.86}/><Jar x={173} y={189} s={.84} plant/>
 <Jar x={77} y={342} s={.86} plant/><Jar x={173} y={348} s={.80}/>
 <path d="M67 492H239V555H67Z" fill="#B6A36C"/>
 <g transform="translate(111 519) scale(.6)"><path d="M0 0Q-25-37-39-13Q-41 13-3 8Q-22 33-6 37L6 15Q29 41 39 18Q43 2 8 2Q42-20 26-35Q11-44 3-5" fill="#3B5D38"/><path d="M0-21V31M-1-19l-8-13M3-19l8-13" stroke="#283F26" strokeWidth="4"/></g>
 <path d="M172 519l39 4m-30-16 8 31m-23-17 13-12m10 28 10-13" stroke="#466239" strokeWidth="4"/>
 <path d="M49 584H264V623H49Z" fill="#75562D"/><path d="M125 599h59v10h-59Z" fill="#CAA34E"/>
 <g transform="translate(782 158) rotate(4)"><path d="M0 0H181V225H0Z" fill="#CCBB7D" stroke="#85632D" strokeWidth="9"/><g transform="translate(84 81)"><path d="M0-14Q-58-61-63-18Q-61 13-9 12Q-52 29-33 63Q-11 82 1 25Q13 81 40 58Q51 35 9 12Q65 13 63-22Q47-65 0-14" fill="#8B965A" stroke="#687747" strokeWidth="3"/><path d="M0-20V37M0-19l-12-17M0-19l12-17" fill="none" stroke="#4A6137" strokeWidth="5"/></g><path d="M27 185H151M37 200H137" stroke="#9B9F6C" strokeWidth="3"/></g>
 <path d="M324 171H698M324 175v15M699 175v15" stroke="#45603E" strokeWidth="7"/>
 <path d="M354 175Q362 211 347 238M661 175Q648 209 665 236" stroke="#42623D" strokeWidth="4" fill="none"/>
 <g transform="translate(929 459) scale(.72)"><path d="M-26 154H81L66 136H-7ZM5 137Q-48 73 4 30" fill="none" stroke="#233D2D" strokeWidth="22"/><path d="M7 4l24-31 41 27-25 32Z" fill="#997539"/><path d="M10 3l14-20 34 23-14 19Z" fill="#C3A255"/><path d="M-17 83H72" stroke="#213D2B" strokeWidth="13"/><circle cx="9" cy="48" r="16" fill="#A48240"/></g>
 <path d="M0 620H1012V792H0Z" fill="#17271C"/>
 <path d="M0 629H1012" stroke="#AF944B" strokeWidth="13"/>
 <path d="M0 685H1012M0 759H1012M168 624L103 792M807 624L878 792M442 624L425 792" stroke="#4E6040" strokeWidth="3"/>
 <path d="M783 445H993" stroke="#465535" strokeWidth="9"/>
 <Jar x={814} y={350} s={.72} plant/>
 </>}

function Foreground({kind}:{kind:NaturalWorldKind}){
 if(kind==='ravine')return <><path d="M0 710l37-10 49 48 13 44H0M1012 701l-54 38-12 53h66Z" fill="#284D42"/><Leaf x={35} y={780} s={.9} r={-24} c="#264D3D" vein="#486746"/><Leaf x={997} y={798} s={.9} r={94} c="#2D5440" vein="#506A48"/></>;
 if(kind==='greenhouse'||kind==='canopy')return <><Leaf x={5} y={792} s={1.03} r={-5} c="#102A1B" vein="#446343"/><Leaf x={79} y={821} s={.95} r={-55} c="#173521" vein="#54724B"/><Leaf x={998} y={807} s={1.08} r={80} c="#10271C" vein="#496642"/><path d="M0 778Q49 736 104 792M1012 773Q955 751 910 792" fill="#10281C"/></>;
 if(kind==='ice')return <><path d="M0 763L115 724 242 752 307 728 397 759 492 741 583 776 701 738 829 757 944 721 1012 746V792H0Z" fill="#132B36"/><path d="M0 759L115 717 242 745 307 722 397 753 492 735 583 770 701 732 829 750 944 715 1012 740" fill="none" stroke="#9CBDC8" strokeWidth="9"/><path d="M0 766l42-74 42 60 61 40H0M1012 712l-58 37-28 43h86Z" fill="#112D3C"/><path d="M0 766l42-74 12 66 30-6-5 22ZM1012 712l-58 37 36-2 22 8Z" fill="#BDCFD0"/></>;
 if(kind==='fossil')return <><path d="M0 754l53-86 25 78 58 46H0M1012 708l-40 21-45 63h85Z" fill="#221C16"/><path d="M7 760l46-92 4 80 28 25M965 760l14-29 33-23" stroke="#877047" strokeWidth="5" fill="none"/></>;
 if(kind==='cabin')return <><path d="M0 726l61 20v46H0M1012 715l-50 20-13 57h63" fill="#20251B"/><path d="M8 743l52 16M974 750l38-16" stroke="#8B7049" strokeWidth="7"/></>;
 return <><path d="M0 750H71L99 792H0M951 739h61v53h-90Z" fill="#172619"/><path d="M0 750H71M951 739h61" stroke="#8D8159" strokeWidth="8"/></>;
}

const Sets:Record<NaturalWorldKind,React.ComponentType>={ravine:Ravine,cabin:Cabin,greenhouse:Greenhouse,canopy:Canopy,ice:Ice,fossil:Fossil,laboratory:Laboratory};
export function NaturalWorld({kind,t:_t,children}:Props){const Set=Sets[kind];return <div style={{position:'absolute',inset:0,width:1012,height:792,overflow:'hidden'}}>
 <svg width="1012" height="792" viewBox="0 0 1012 792" style={{position:'absolute',inset:0,pointerEvents:'none'}}><Set/></svg>
 {children}
 <svg width="1012" height="792" viewBox="0 0 1012 792" style={{position:'absolute',inset:0,pointerEvents:'none'}}><Foreground kind={kind}/></svg>
 </div>}
