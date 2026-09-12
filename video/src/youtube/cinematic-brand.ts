import {loadFont} from '@remotion/google-fonts/Manrope';

// Alex's September 11 override: sans-serif throughout this edit, no Fraunces.
const family=loadFont('normal',{weights:['400','500','600','700','800'],subsets:['latin']}).fontFamily;
export const displayFont=family;
export const bodyFont=family;
