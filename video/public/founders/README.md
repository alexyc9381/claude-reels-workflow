# Founder headshots — drop them here

The reel names both Rowboat Labs founders on screen (S1 at ~6s, S13 at ~32s) and
draws house mascots as their portraits.

To use their REAL photos instead:

  1. put two files in this folder:
       public/founders/arjun.jpg      Arjun Maheswaran
       public/founders/ramnique.jpg   Ramnique Singh
     Square-ish crops work best; the card renders them at object-fit: cover.

  2. in video/src/RowScenes.tsx set:
       const FOUNDER_PHOTOS = true;

  3. re-render. Nothing else changes.

⛔ WHY THEY ARE NOT ALREADY HERE. Their headshots are public on
ycombinator.com/companies/rowboat-labs, but a photograph is the photographer's
copyright and the face is a real person's likeness — using either in a monetised
video needs a licence or their permission, and that is not something this repo
can grant on Alex's behalf. Get one of those and the swap above is the whole job.
