// Actual global onsets. Master audio is pre-mixed from these events.
export const X144_SOUND_CUES = [
  { at: 0.0000, src: "x144/impact.wav", gainDb: -5.085, rate: 1 }, // opening punch
  { at: 0.3667, src: "x144/clank.wav", gainDb: -5.085, rate: 1 }, // PDF intake seats
  { at: 0.8000, src: "x144/lever.wav", gainDb: -10.039, rate: 1 }, // token pull starts
  { at: 1.7333, src: "x144/ratchet.wav", gainDb: -15.493, rate: 1 }, // drain accelerates
  { at: 2.2667, src: "x144/coin.wav", gainDb: -11.184, rate: 1 }, // token spill
  { at: 3.1000, src: "x144/pickup.wav", gainDb: -23.825, rate: 1 }, // free fix reveal
  { at: 5.3333, src: "x144/lever.wav", gainDb: -10.039, rate: 1 }, // scanner seats
  { at: 6.3333, src: "x144/clank.wav", gainDb: -8.085, rate: 1 }, // text output
  { at: 6.6333, src: "x144/key.wav", gainDb: -11.11, rate: 1 }, // image output
  { at: 7.3333, src: "x144/paper.wav", gainDb: -14.777, rate: 1 }, // formatting separates
  { at: 7.9667, src: "x144/chain.wav", gainDb: -8.085, rate: 1 }, // table fractures
  { at: 8.7000, src: "x144/paper.wav", gainDb: -14.777, rate: 1 }, // image separates
  { at: 10.6667, src: "x144/lever.wav", gainDb: -10.039, rate: 1 }, // one-page actuator
  { at: 11.1000, src: "x144/gear.wav", gainDb: -8.943, rate: 1 }, // turbine starts
  { at: 12.0333, src: "x144/clank.wav", gainDb: -5.085, rate: 1 }, // 1500 inner crown lock
  { at: 12.6667, src: "x144/ratchet.wav", gainDb: -19.993, rate: 1 }, // second stage anticipation
  { at: 13.2000, src: "x144/impact.wav", gainDb: -5.085, rate: 1 }, // 3000 outer crown lock
  { at: 14.2333, src: "x144/thock.wav", gainDb: -8.085, rate: 1.0 }, // domino progression
  { at: 14.7333, src: "x144/thock.wav", gainDb: -8.608, rate: 1.13 }, // domino progression
  { at: 15.2000, src: "x144/thock.wav", gainDb: -9.273, rate: 1.26 }, // domino progression
  { at: 15.3667, src: "x144/unlock.wav", gainDb: -26.0, rate: 1 }, // vault unlatches
  { at: 15.6333, src: "x144/clank.wav", gainDb: -5.079, rate: 0.88 }, // vault door and bill
  { at: 16.1667, src: "x144/coin.wav", gainDb: -11.468, rate: 0.9 }, // vault spill
  { at: 17.6667, src: "x144/thock.wav", gainDb: -8.085, rate: 1 }, // empty prompt seats
  { at: 18.1000, src: "x144/paper.wav", gainDb: -14.777, rate: 1 }, // cost receipt
  { at: 18.5333, src: "x144/key.wav", gainDb: -15.61, rate: 1 }, // question still unsent
  { at: 19.6333, src: "x144/unlock.wav", gainDb: -26.028, rate: 1.08 }, // fix opens
  { at: 19.9667, src: "x144/pickup.wav", gainDb: -24.305, rate: 1.12 }, // fix revealed
  { at: 20.8333, src: "x144/lever.wav", gainDb: -10.039, rate: 1 }, // Claude feeds the converter
  { at: 21.5000, src: "x144/clank.wav", gainDb: -5.085, rate: 1 }, // first clean output emerges
  { at: 22.1333, src: "x144/paper.wav", gainDb: -14.777, rate: 1 }, // structure fills output
  { at: 23.0000, src: "x144/ratchet.wav", gainDb: -19.993, rate: 1 }, // second sample passes
  { at: 23.3667, src: "x144/key.wav", gainDb: -15.61, rate: 1 }, // brief GitHub proof
  { at: 23.4667, src: "x144/thock.wav", gainDb: -8.085, rate: 1 }, // Claude catches clean output
  { at: 24.1667, src: "x144/paper.wav", gainDb: -14.777, rate: 1 }, // continuous input feed
  { at: 24.2000, src: "x144/paper.wav", gainDb: -14.777, rate: 1 }, // Claude carries output into format handoff
  { at: 25.2000, src: "x144/paper.wav", gainDb: -14.841, rate: 0.96 }, // named format enters operating converter
  { at: 25.8000, src: "x144/key.wav", gainDb: -15.61, rate: 1.0 }, // format joins structured output
  { at: 25.8000, src: "x144/paper.wav", gainDb: -14.729, rate: 1.01 }, // named format enters operating converter
  { at: 26.2667, src: "x144/paper.wav", gainDb: -14.617, rate: 1.06 }, // named format enters operating converter
  { at: 26.4000, src: "x144/key.wav", gainDb: -15.7, rate: 1.06 }, // format joins structured output
  { at: 26.8000, src: "x144/paper.wav", gainDb: -14.495, rate: 1.1099999999999999 }, // named format enters operating converter
  { at: 26.8667, src: "x144/key.wav", gainDb: -15.806, rate: 1.12 }, // format joins structured output
  { at: 27.4000, src: "x144/key.wav", gainDb: -15.902, rate: 1.18 }, // format joins structured output
  { at: 27.4000, src: "x144/paper.wav", gainDb: -14.371, rate: 1.16 }, // named format enters operating converter
  { at: 28.0000, src: "x144/key.wav", gainDb: -15.988, rate: 1.24 }, // format joins structured output
  { at: 28.6333, src: "x144/pickup.wav", gainDb: -19.648, rate: 1.08 }, // finished Markdown pulls forward
  { at: 29.4333, src: "x144/paper.wav", gainDb: -14.777, rate: 1 }, // readable output settles
  { at: 29.8333, src: "x144/lever.wav", gainDb: -10.039, rate: 1 }, // output moves into token-saving comparison
  { at: 30.6000, src: "x144/thock.wav", gainDb: -5.083, rate: 0.86 }, // loaded platform lands
  { at: 31.8333, src: "x144/unlock.wav", gainDb: -21.39, rate: 0.91 }, // ballast release
  { at: 32.4667, src: "x144/pickup.wav", gainDb: -24.485, rate: 1.18 }, // lighter input catches
  { at: 33.4333, src: "x144/key.wav", gainDb: -11.11, rate: 1.0 }, // structured evidence travels to answer
  { at: 33.8667, src: "x144/key.wav", gainDb: -11.306, rate: 1.12 }, // structured evidence travels to answer
  { at: 34.3000, src: "x144/key.wav", gainDb: -11.488, rate: 1.24 }, // structured evidence travels to answer
  { at: 34.7667, src: "x144/clank.wav", gainDb: -8.085, rate: 1 }, // evidence route locks
  { at: 35.6000, src: "x144/pickup.wav", gainDb: -19.711, rate: 1.1 }, // clear answer resolves
  { at: 36.3000, src: "x144/paper.wav", gainDb: -19.277, rate: 1 }, // answer handed onward
  { at: 37.1000, src: "x144/lever.wav", gainDb: -10.039, rate: 1 }, // plug approaches
  { at: 38.0667, src: "x144/clank.wav", gainDb: -5.085, rate: 0.9 }, // MCP seats
  { at: 38.3667, src: "x144/terminal.wav", gainDb: -13.085, rate: 1 }, // connection live
  { at: 39.1333, src: "x144/paper.wav", gainDb: -14.777, rate: 1 }, // file thrown into Claude
  { at: 39.7000, src: "x144/thock.wav", gainDb: -8.085, rate: 1 }, // upload seats
  { at: 40.5000, src: "x144/terminal.wav", gainDb: -8.233, rate: 1 }, // MCP call runs
  { at: 41.4000, src: "x144/pickup.wav", gainDb: -19.711, rate: 1.1 }, // conversion completes
  { at: 42.3000, src: "x144/paper.wav", gainDb: -14.777, rate: 1 }, // Markdown opens in same interaction
  { at: 43.0333, src: "x144/paper.wav", gainDb: -14.777, rate: 1 }, // finished file handed toward guide
  { at: 43.8333, src: "x144/thock.wav", gainDb: -8.085, rate: 1 }, // guide lands
  { at: 44.5333, src: "x144/paper.wav", gainDb: -14.777, rate: 1 }, // guide opens
  { at: 45.3000, src: "x144/key.wav", gainDb: -11.11, rate: 1 }, // X typed
  { at: 45.4000, src: "x144/pickup.wav", gainDb: -24.475, rate: 1.17 }, // comment sends
];
