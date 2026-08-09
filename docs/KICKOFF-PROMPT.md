# THE KICKOFF PROMPT: how to start a reel build

**Status:** the canonical opening message for a new reel. Alex asked for it to be saved after reels
94 and 95 came out well: *"since when I said this the animations were very elevated somehow."*

This is not a magic phrase. It works because every clause in it lands on a specific stage of the
pipeline, and because it names the two things that are usually left implicit (the storyboard, and
the standard the animation is held to). What follows is the prompt, then a clause by clause map of
what each part actually triggers, then what the prompt does NOT say and therefore what still has to
be asked or flagged.

---

## The prompt

> I've attached the voiceover, **\<KEYWORD\>**, inside the Drive: the Faceless videos, the Faceless
> Drive. What I need you to do is prep that and start building out the reel, and make sure you edit
> the video based on the GitHub repo for video editing, the faceless nocodealex GitHub repo for
> editing the video. And basically, edit it very, very well. The animations need to be very, very
> good. The storyboard needs to be very, very good. The animations need to be very, very
> interesting, and a very, very elevated level of animation here.

Swap `<KEYWORD>` for the reel keyword, which is also the VO filename (`AGENCY`, `TOOLS`, `VIDEO`).
Everything else stays as written.

### The original, as dictated

Kept verbatim because the corrections below are the ones a transcript of this prompt will always
need, and knowing that saves the next person a confused search.

> I have attached the voice over agency inside of the drive, the faceless videos, the faceless
> drive. Basically, what I needed to do is I needed to prep that and start building out the reel and
> make sure you edit the video based on the GPU repo for video editing, the faceless no code Alex
> GPU repo for editing the video. And, basically, edit it very, very well. Animations need to be
> very, very good. The storyboard needs to be very, very good. Animations need to be very, very
> interesting and very, very elevated level of animation here.

**The three transcription errors, every time:**

| heard | meant |
|---|---|
| "GPU repo" | **GitHub repo** |
| "faceless no code Alex" | **faceless nocodealex** (the handle) |
| "the voice over agency" | "the voiceover, **AGENCY**" (the keyword, not a company) |

---

## What each clause actually triggers

| the clause | what it means in this repo |
|---|---|
| "attached the voiceover, `<KEYWORD>`, inside the Drive" | The VO is at `My Drive/Claude Reels/Faceless/*VOs/<KEYWORD>.m4a`. ⛔ The folder is literally `*VOs` with a leading asterisk, so globs miss it. `ls Faceless/` gives the next free reel number, and older numbers live in `Faceless/*REELS 24-89/`, so check both before treating one as unclaimed. |
| "the Faceless videos, the Faceless Drive" | The **personal** Drive (`alexyc9381@gmail.com`). The matchtern.org one is stale. |
| "prep that" | The whole VO stage, not just a copy: transcribe with faster-whisper, find every `cut cut` flub, cut to **measured silence** (never whisper word times, they run 150 to 200ms early), loudnorm, re-transcribe the CUT file to prove it is clean, then build captions with `tools/build_captions.py`. See `CLAUDE-REELS-PLAYBOOK.md` C2 to C4. |
| "start building out the reel" | The full reel, not a hook round. Board, world kit, props, scenes, assembly, SFX, bed, gates, delivery. |
| "edit the video based on the GitHub repo" | ⛔ Use the house chassis. Clone the newest shipped reel: cream `Bg`, dark `Panel`, karaoke captions, the progress rail, the `HookHeader`, and the clay `Mascot` from `SlopKit` verbatim. Do not invent a new art style, a new caption system or a new mascot. `REEL-BUILD-LEARNINGS.md` is the index of what has already gone wrong. |
| "the storyboard needs to be very, very good" | ⭐ **This is the clause that changes the output most.** It makes the board a real Stage 6 deliverable to `storyboards/STORYBOARD-SPEC.md`: a named world, an arc, a hierarchy MECHANISM per beat, a number spine, a hero artifact, and per scene cards with set, camera, blocking and takeaway. **No approved board, no visual build.** Boards written this way are also where the honest-fact problems surface early, before anything is drawn. |
| "the animations need to be very, very interesting" and "elevated" | ⭐ **This is the clause that makes the motion audit a gate instead of a formality.** It means: no scene may arrive and then hold, every scene earns motion from the ACTION, and the result is MEASURED with `tools/scene_motion_audit.py`, per frame, not asserted. |

---

## What the prompt does not say, and therefore what still has to happen

The prompt is good at setting the standard. It is silent on everything factual, so these are not
optional even though nobody asks for them:

1. **Verify every claim in the VO against the live source before drawing it.** Reels 94 and 95 both
   had spoken claims the repo did not back. The rule that came out of it: when a VO asserts a RESULT
   you cannot source, dramatise the MECHANISM and stop at the edge of the claim. The frame is where
   the receipts live.
2. **Check whether the subject has already shipped.** Reel 94 was the same product family as reel 84
   and reel 93 was the same product as reel 90. Say so, then build.
3. **Flag the length.** The house range is 22 to 29 seconds. Say it if the cut lands outside; do not
   silently pad or trim.
4. **Real marks wherever one exists**, on white tiles, from `public/logos/`. A wrong mark is worse
   than no mark.
5. **The Claude mark is the audience filter**, not decoration. Big and early, repeated through the
   reel, and never on the sprite's face.

## The gates a build is finished against

```bash
python3 tools/verify_reel.py REEL.mp4 --words src/data/words_<k>.json \
  --script "$(cat public/<k>_script.txt)" --music public/<k>_bed.wav
python3 tools/scene_motion_audit.py REEL.mp4 --scenes <measured onsets>
grep -hoE 'boxShadow: *"0 0 [0-9]+px' src/<Prefix>*.tsx | wc -l    # must be 0
```
Plus: full frame luma above 140, frame 0 settled and readable, no shot under 0.7s, every Claude the
one house clay, and the delivered mp4 re-transcribed to prove no flub survived the render.

## Where the deliverables go

⛔ Every reel deliverable goes in **its own numbered subfolder**, `Faceless/<n> - NAME/`: the main
mp4, the lead magnet docx, the caption, and every trial cut with its own caption. Not the shared
`Trial Reels/` folder.

## Related

`CLAUDE-REELS-PLAYBOOK.md` (the manual) · `REEL-BUILD-LEARNINGS.md` (what has gone wrong, with the
reasoning) · `docs/THE-OPEN.md` (the first five seconds) · `storyboards/STORYBOARD-SPEC.md` (the
board contract) · `docs/SOUND-DESIGN.md`
