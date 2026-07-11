#!/usr/bin/env python3
import json, re

FPS = 30
# (from_s, to_s, text)  — text matches the official VSL script (audio follows it); timings are audio-derived.
SENTS = [
    (0.00, 6.00, "Every single year, over 35,000 students score above a 1500 on the SAT."),
    (6.00, 12.36, "Harvard alone gets over 50,000 applications. Stanford, MIT, Columbia, the same thing."),
    (12.36, 17.36, "And many of those applicants have 1500-plus SATs with stellar grades to match."),
    (17.36, 24.56, "Obviously, your child needs good grades and a good SAT score, but most students applying to elite universities already have that."),
    (24.56, 28.56, "Good grades and good scores alone are not going to make your child stand out."),
    (28.56, 38.36, "No matter how good your child's essay is, even if it's the best essay an admissions officer reads that entire year, if they don't have the experience to back it up, they will not get in."),
    (38.36, 43.48, "Think about it like a job. You could write the best cover letter or use the best resume template."),
    (43.48, 46.62, "But if you don't have the credentials, you're not getting hired."),
    (46.62, 48.84, "College admissions works the exact same way."),
    (48.84, 51.56, "Your child needs a standout extracurricular."),
    (51.56, 58.52, "Without it, they look exactly like everyone else. And the longer they go without it, the harder it is to stand out before applications are due."),
    (58.52, 65.32, "Matchtern places high school students at venture-backed companies, where they work on real projects alongside real teams."),
    (65.32, 69.00, "Not shadowing. Not busywork. Actual, enriching work."),
    (69.00, 80.20, "We train your child first: how to think like an executive professional, project management, career-specific training for their field, and how to deliver results in a real business environment."),
    (80.20, 85.32, "Then we place them at a company that fits their interests and goals for a three-month internship."),
    (85.32, 87.88, "They walk away with real professional experience."),
    (87.88, 89.88, "They get a reference from their supervisor."),
    (89.88, 92.40, "They have a portfolio piece they can point to."),
    (92.40, 96.06, "And they have a story that no other applicant in their school has."),
    (96.06, 101.24, "This is what makes your child a standout applicant. Not just another name in a pile of 50,000,"),
    (101.24, 105.76, "but someone with a massive advantage over every other student applying to the same school."),
    (105.76, 115.28, "When an admissions officer sees that a high schooler worked at a real company, on a real team, and delivered real results, that changes how they read everything else."),
    (115.28, 126.24, "It gives your child something concrete to write about in their essays, something specific to talk about in interviews, and something that makes an officer stop and pay attention."),
    (126.24, 130.92, "The earlier your child does this, the bigger the advantage. And it carries them beyond college."),
    (130.92, 134.52, "They'll have better negotiating power in future career opportunities."),
    (134.52, 136.80, "They'll stand out in every job application."),
    (136.80, 142.80, "And they'll earn more, because they already have real professional experience while everyone else is starting from scratch."),
    (142.80, 152.24, "We don't accept everyone. Matchtern is selective because the companies we work with trust us to send students who are serious, motivated, and ready to do real work."),
    (152.24, 155.96, "This isn't for students looking for a certificate to pad their resume."),
    (155.96, 160.44, "This is for students who want to actually do something meaningful and are willing to put in the effort."),
    (160.44, 168.40, "If your child already has strong grades and has demonstrated potential in their intended major through their extracurriculars, we invite them to apply."),
    (168.40, 170.92, "Click below and fill out a short application."),
    (170.92, 174.36, "If your child looks like a good fit, we'll invite them for an interview."),
    (174.36, 178.68, "We also offer a satisfaction guarantee that lasts throughout the entire program."),
    (178.68, 182.32, "If at any point you're not satisfied, you get your money back."),
    (182.32, 187.80, "We take on the risk because we're confident in the students we accept and we believe in their potential."),
    (187.80, 190.24, "We can only work with a limited number of students."),
    (190.24, 194.00, "Click below. Let's make your child the standout applicant."),
]

MAX_CHARS = 30
MAX_WORDS = 5

def chunk_words(text):
    words = text.split()
    lines, cur = [], []
    for w in words:
        trial = (" ".join(cur + [w])).strip()
        if cur and (len(trial) > MAX_CHARS or len(cur) >= MAX_WORDS):
            lines.append(" ".join(cur))
            cur = [w]
        else:
            cur.append(w)
    if cur:
        lines.append(" ".join(cur))
    if len(lines) >= 2:
        last = lines[-1]
        if len(last.split()) <= 2 and len(lines[-2] + " " + last) <= MAX_CHARS + 12:
            lines[-2] = lines[-2] + " " + last
            lines.pop()
    return lines

caps = []
for (f, t, text) in SENTS:
    lines = chunk_words(text)
    total_chars = sum(len(l) for l in lines) or 1
    span = t - f
    cursor = f
    for i, l in enumerate(lines):
        frac = len(l) / total_chars
        dur = span * frac
        start = cursor
        end = t if i == len(lines) - 1 else cursor + dur
        cursor = end
        caps.append({"text": l.strip(), "from": round(start * FPS), "to": round(end * FPS)})

for i, c in enumerate(caps):
    if c["to"] <= c["from"]:
        c["to"] = c["from"] + 6
    if i + 1 < len(caps) and caps[i + 1]["from"] < c["to"]:
        caps[i + 1]["from"] = c["to"]

json.dump(caps, open("video/src/data/captions.json", "w"), indent=0)
print(f"wrote {len(caps)} caption lines")
