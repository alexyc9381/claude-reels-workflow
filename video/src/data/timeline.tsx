import React from "react";
import {
  AdvantageScene,
  ApplicantsScene,
  ApplyOverlay,
  ATSOverlay,
  BrandScene,
  DecidingFactorOverlay,
  EndCard,
  EssayOverlay,
  EveryoneScene,
  FinalScene,
  GateOverlay,
  HookScene,
  IconCards,
  LifeBenefitsScene,
  LimitedSeatsOverlay,
  MatchOverlay,
  MoneyBackScene,
  NotEnoughOverlay,
  OutcomesScene,
  RealTriadOverlay,
  ReportCardOverlay,
  RiskShieldOverlay,
  Roadmap,
  SchoolsScene,
  SelectiveOverlay,
  StandoutBarsOverlay,
  StandoutScene,
  StellarGradesOverlay,
} from "../components/Scenes";

const F = 30;
const f = (sec: number) => Math.round(sec * F);
const d = (startSec: number, cueSec: number) => Math.max(0, Math.round((cueSec - startSec) * F));

export type Beat = { from: number; dur: number; el: (dur: number) => React.ReactNode };
const beat = (a: number, b: number, el: (dur: number) => React.ReactNode): Beat => ({ from: f(a), dur: f(b - a), el });

export const TIMELINE: Beat[] = [
  // 1. HOOK — SAT bell curve cold open
  beat(0.0, 5.8, (dur) => <HookScene dur={dur} />),
  // 2. SCHOOLS — real logos + 50k applications
  beat(6.0, 12.0, (dur) => <SchoolsScene dur={dur} />),
  // 3. SAT score (right) + stellar grades transcript w/ ribbon (left)
  beat(12.3, 17.2, (dur) => <ReportCardOverlay dur={dur} />),
  beat(14.3, 17.2, (dur) => <StellarGradesOverlay dur={dur} />),
  // 4. Everyone already has it (varied scores/grades)
  beat(18.4, 24.3, (dur) => <EveryoneScene dur={dur} />),
  // 5. NOT ENOUGH meter (presenter)
  beat(24.6, 28.4, (dur) => <NotEnoughOverlay dur={dur} />),
  // 6. Essay rejected (left) + what decides it (right)
  beat(29.0, 38.2, (dur) => <EssayOverlay dur={dur} title="The best essay" stamp="REJECTED" />),
  beat(33.8, 38.2, (dur) => <DecidingFactorOverlay dur={dur} />),
  // 7. Resume / ATS not hired (presenter)
  beat(38.7, 46.4, (dur) => <ATSOverlay dur={dur} />),
  // 8. Standout extracurricular — one bar rises (presenter)
  beat(48.9, 51.5, (dur) => <StandoutBarsOverlay dur={dur} />),
  // 9. Applicants pile
  beat(51.7, 58.3, (dur) => <ApplicantsScene dur={dur} />),
  // 10. Brand reveal (towers)
  beat(58.6, 65.2, (dur) => <BrandScene dur={dur} />),
  // 11. No shadowing / busy work (presenter)
  beat(65.4, 69.0, (dur) => (
    <IconCards
      dur={dur}
      title="What this is not"
      cards={[
        { icon: "eye", label: "No shadowing", type: "cross", delay: 2 },
        { icon: "coffee", label: "No busy work", type: "cross", delay: 12 },
        { icon: "rocket", label: "Real, enriching work", type: "check", delay: 22 },
      ]}
    />
  )),
  // 12. Training roadmap (presenter)
  beat(69.2, 80.1, (dur) => (
    <Roadmap
      dur={dur}
      title="We train your child first"
      nodes={[
        { icon: "brief", label: "Think like an executive", delay: d(69.2, 69.6) },
        { icon: "target", label: "Project management", delay: d(69.2, 73.3) },
        { icon: "spark", label: "Career-specific training", delay: d(69.2, 75.2) },
        { icon: "up", label: "Deliver real results", delay: d(69.2, 78.0) },
      ]}
    />
  )),
  // 13. Internship match (presenter)
  beat(80.3, 85.2, (dur) => <MatchOverlay dur={dur} />),
  // 14. Outcomes (full)
  beat(85.4, 96.0, (dur) => (
    <OutcomesScene
      dur={dur}
      items={[
        { icon: "brief", label: "Real professional experience", delay: d(85.4, 85.6) },
        { icon: "doc", label: "A reference from their supervisor", delay: d(85.4, 87.9) },
        { icon: "target", label: "A portfolio piece to show", delay: d(85.4, 89.9) },
        { icon: "trophy", label: "A story no one else has", delay: d(85.4, 92.4) },
      ]}
    />
  )),
  // 15. Standout hero (full)
  beat(96.2, 105.6, (dur) => <StandoutScene dur={dur} />),
  // 16. Real company / team / results (presenter)
  beat(106.2, 112.0, (dur) => <RealTriadOverlay dur={dur} />),
  // 17. Now your child has (presenter)
  beat(115.4, 126.1, (dur) => (
    <IconCards
      dur={dur}
      title="Now your child has"
      cards={[
        { icon: "doc", label: "Something to write in essays", delay: d(115.4, 115.8) },
        { icon: "chat", label: "Something to say in interviews", delay: d(115.4, 120.0) },
        { icon: "spark", label: "Something that earns attention", delay: d(115.4, 124.3) },
      ]}
    />
  )),
  // 18. Earlier = advantage (full)
  beat(126.4, 130.8, (dur) => <AdvantageScene dur={dur} />),
  // 19. Life-long benefits — university + financial (full)
  beat(131.0, 142.7, (dur) => <LifeBenefitsScene dur={dur} />),
  // 20. Selective (presenter)
  beat(143.0, 149.5, (dur) => <SelectiveOverlay dur={dur} />),
  // 21. Not a certificate (presenter)
  beat(152.4, 160.4, (dur) => (
    <IconCards
      dur={dur}
      title="This is not"
      cards={[
        { icon: "doc", label: "A certificate to pad a resume", type: "cross", delay: 2 },
        { icon: "rocket", label: "Real, meaningful work", type: "check", delay: d(152.4, 156.0) },
      ]}
    />
  )),
  // 22. Who qualifies (presenter)
  beat(160.6, 168.3, (dur) => (
    <GateOverlay
      dur={dur}
      title="Who we invite to apply"
      items={[
        { label: "Strong grades", delay: 2 },
        { label: "Real potential in their major", delay: d(160.6, 164.7) },
      ]}
    />
  )),
  // 23. Apply CTA bar (presenter)
  beat(168.5, 174.3, (dur) => <ApplyOverlay dur={dur} text="Click below to apply" />),
  // 24. Money-back guarantee (full)
  beat(174.5, 182.2, (dur) => <MoneyBackScene dur={dur} />),
  // 25. We take on the risk — shield (presenter)
  beat(182.4, 187.7, (dur) => <RiskShieldOverlay dur={dur} />),
  // 26. Limited seats (presenter)
  beat(187.9, 190.2, (dur) => <LimitedSeatsOverlay dur={dur} />),
  // 27. Final CTA (full)
  beat(190.3, 194.0, (dur) => <FinalScene dur={dur} />),
  // 28. Branded end card (after VO; SFX added in main comp)
  beat(194.0, 198.6, (dur) => <EndCard dur={dur} />),
];
