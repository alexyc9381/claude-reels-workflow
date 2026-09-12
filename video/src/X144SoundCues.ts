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
  { at: 20.9333, src: "x144/thock.wav", gainDb: -8.083, rate: 0.93 }, // bulky input seats in press
  { at: 21.3333, src: "x144/clank.wav", gainDb: -5.085, rate: 0.9 }, // opposing jaws strip outer formatting
  { at: 21.9333, src: "x144/paper.wav", gainDb: -14.52, rate: 1.1 }, // intact semantic core ejects
  { at: 22.7333, src: "x144/pickup.wav", gainDb: -24.026, rate: 1.05 }, // Claude catches clean core
  { at: 23.7000, src: "x144/lever.wav", gainDb: -14.505, rate: 1.1 }, // core sent to next station
  { at: 24.8333, src: "x144/ratchet.wav", gainDb: -15.385, rate: 1.03 }, // format rotor takes first input
  { at: 25.7667, src: "x144/paper.wav", gainDb: -14.705, rate: 1.02 }, // PDF turns into structured segments
  { at: 26.2667, src: "x144/key.wav", gainDb: -10.862, rate: 0.91 }, // Word sheet stack feeds rotor
  { at: 26.8000, src: "x144/gear.wav", gainDb: -9.642, rate: 1.1 }, // spreadsheet accordion folds into structure
  { at: 27.3333, src: "x144/thock.wav", gainDb: -8.608, rate: 1.13 }, // slide fan joins output
  { at: 27.9333, src: "x144/terminal.wav", gainDb: -8.286, rate: 1.08 }, // filmstrip becomes transcript structure
  { at: 28.6000, src: "x144/paper.wav", gainDb: -14.705, rate: 1.02 }, // semantic strips join binding spine
  { at: 29.1333, src: "x144/clank.wav", gainDb: -5.079, rate: 1.06 }, // roller binds the structured output
  { at: 29.6333, src: "x144/pickup.wav", gainDb: -24.148, rate: 1.08 }, // Markdown unfolds
  { at: 30.2000, src: "x144/paper.wav", gainDb: -19.205, rate: 1.02 }, // Markdown handoff
  { at: 30.5333, src: "x144/thock.wav", gainDb: -8.083, rate: 0.86 }, // loaded token rack lands
  { at: 31.3333, src: "x144/unlock.wav", gainDb: -21.427, rate: 0.94 }, // token rack unlatches
  { at: 31.7333, src: "x144/coin.wav", gainDb: -11.29, rate: 0.95 }, // unused input tokens return
  { at: 32.1333, src: "x144/lever.wav", gainDb: -10.008, rate: 1.06 }, // freed input gate swings open
  { at: 33.1333, src: "x144/thock.wav", gainDb: -8.083, rate: 0.96 }, // unstructured key meets resistance
  { at: 34.0667, src: "x144/key.wav", gainDb: -11.244, rate: 1.08 }, // heading table and list teeth align
  { at: 34.5667, src: "x144/lever.wav", gainDb: -10.005, rate: 1.1 }, // structured key enters Claude chamber
  { at: 35.0333, src: "x144/unlock.wav", gainDb: -21.512, rate: 1.04 }, // structured input unlocks chamber
  { at: 36.0667, src: "x144/pickup.wav", gainDb: -24.211, rate: 1.1 }, // clearer answer emerges toward Claude
  { at: 37.2000, src: "x144/chain.wav", gainDb: -8.085, rate: 1.0 }, // MCP cable snaps into approach
  { at: 37.7000, src: "x144/clank.wav", gainDb: -5.082, rate: 0.91 }, // MCP connector locks
  { at: 38.3000, src: "x144/terminal.wav", gainDb: -8.257, rate: 1.04 }, // structured payload crosses connection
  { at: 39.3000, src: "x144/thock.wav", gainDb: -8.084, rate: 1.03 }, // file upload seats in Claude
  { at: 39.9000, src: "x144/key.wav", gainDb: -11.213, rate: 1.07 }, // MCP operation engages
  { at: 41.0333, src: "x144/gear.wav", gainDb: -9.69, rate: 1.11 }, // automatic conversion completes
  { at: 42.0667, src: "x144/pickup.wav", gainDb: -19.805, rate: 1.12 }, // Markdown opens inside Claude
  { at: 42.5333, src: "x144/paper.wav", gainDb: -14.565, rate: 1.08 }, // structured rows seat
  { at: 43.1333, src: "x144/paper.wav", gainDb: -19.428, rate: 0.92 }, // finished output transfers toward guide
  { at: 43.8667, src: "x144/thock.wav", gainDb: -8.085, rate: 1.0 }, // guide lands
  { at: 44.4000, src: "x144/paper.wav", gainDb: -14.495, rate: 1.11 }, // guide opens
  { at: 45.2667, src: "x144/key.wav", gainDb: -11.2, rate: 1.06 }, // X comment sends
  { at: 45.5333, src: "x144/pickup.wav", gainDb: -24.376, rate: 1.14 }, // guide dispatch completes
];
