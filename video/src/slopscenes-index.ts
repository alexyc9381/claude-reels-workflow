import { registerRoot, Composition } from "remotion";
import React from "react";
import { Scene2 } from "./SlopScene2";
import { Scene3 } from "./SlopScene3";
import { Scene4 } from "./SlopScene4";
import { Scene5 } from "./SlopScene5";
import { Scene6 } from "./SlopScene6";
import { Scene7 } from "./SlopScene7";
import { Scene8 } from "./SlopScene8";
import { Scene9 } from "./SlopScene9";
const mk = (id: string, c: any) => React.createElement(Composition as any, { id, component: c, durationInFrames: 120, fps: 30, width: 1080, height: 1920 });
registerRoot(() => React.createElement(React.Fragment, null,
  mk("Scene2", Scene2), mk("Scene3", Scene3), mk("Scene4", Scene4), mk("Scene5", Scene5),
  mk("Scene6", Scene6), mk("Scene7", Scene7), mk("Scene8", Scene8), mk("Scene9", Scene9),
));
