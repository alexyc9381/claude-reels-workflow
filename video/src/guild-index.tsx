// A standalone Remotion entry for the Guild gallery stills.
//
// ⛔ NOT ADDED TO Root.tsx ON PURPOSE. That root imports ./Claude59CarouselReel, which is
// not in the repo, so the whole bundle fails to build. Registering here keeps the gallery
// renderable without touching the reel factory or fixing someone else's missing file.
import { registerRoot, Composition } from "remotion";
import React from "react";
import { GuildCover, GuildEngine, GuildPaid, GuildInside } from "./GuildGallery";
import { AiFoundersGuildCover } from "./AiFoundersGuildCover";
import { AiFoundersGuildCrest } from "./AiFoundersGuildCrest";

const Root: React.FC = () => (
  <>
    <Composition id="GuildCoverOld" component={AiFoundersGuildCover} durationInFrames={2} fps={30} width={1920} height={1080} />
    <Composition id="GuildCover" component={GuildCover} durationInFrames={2} fps={30} width={1920} height={1080} />
    <Composition id="GuildEngine" component={GuildEngine} durationInFrames={2} fps={30} width={1920} height={1080} />
    <Composition id="GuildPaid" component={GuildPaid} durationInFrames={2} fps={30} width={1920} height={1080} />
    <Composition id="GuildInside" component={GuildInside} durationInFrames={2} fps={30} width={1920} height={1080} />
    <Composition id="GuildCrest" component={AiFoundersGuildCrest} durationInFrames={2} fps={30} width={1920} height={1080} />
  </>
);
registerRoot(Root);
