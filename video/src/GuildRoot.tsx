import React from "react";
import { Composition } from "remotion";
import { AiFoundersGuildCover } from "./AiFoundersGuildCover";
import { AiFoundersGuildCrest } from "./AiFoundersGuildCrest";
import { AiFoundersGuildRoyal } from "./AiFoundersGuildRoyal";
import { AiFoundersGuildTable } from "./AiFoundersGuildTable";
import { GuildLogoIcon, GuildLogoLockup } from "./AiFoundersGuildLogo";
import { GuildIconCoin, GuildIconCrest, GuildIconShield } from "./GuildIcons";

export const GuildRoot: React.FC = () => (
  <>
    <Composition
      id="AiFoundersGuildCover"
      component={AiFoundersGuildCover}
      durationInFrames={1}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="AiFoundersGuildCrest"
      component={AiFoundersGuildCrest}
      durationInFrames={1}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="AiFoundersGuildRoyal"
      component={AiFoundersGuildRoyal}
      durationInFrames={1}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="AiFoundersGuildTable"
      component={AiFoundersGuildTable}
      durationInFrames={1}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition id="GuildLogoIcon" component={GuildLogoIcon} durationInFrames={1} fps={30} width={1080} height={1080} />
    <Composition id="GuildLogoLockup" component={GuildLogoLockup} durationInFrames={1} fps={30} width={1920} height={1080} />
    <Composition id="GuildIconCoin" component={GuildIconCoin} durationInFrames={1} fps={30} width={1080} height={1080} />
    <Composition id="GuildIconCrest" component={GuildIconCrest} durationInFrames={1} fps={30} width={1080} height={1080} />
    <Composition id="GuildIconShield" component={GuildIconShield} durationInFrames={1} fps={30} width={1080} height={1080} />
  </>
);
