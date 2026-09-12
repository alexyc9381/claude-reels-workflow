import {staticFile as remotionStaticFile} from 'remotion';
// Scope the historical public paths so restoring this reel cannot overwrite other reels.
export const staticFile=(path:string)=>remotionStaticFile(`ecc151/${path}`);
