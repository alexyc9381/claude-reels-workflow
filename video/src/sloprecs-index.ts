import { registerRoot, Composition } from "remotion";
import React from "react";
import { Rec4Ramble } from "./Rec4Ramble";
import { Rec5Cut } from "./Rec5Cut";
import { Rec6Ban } from "./Rec6Ban";
import { Rec8Detector } from "./Rec8Detector";
const mk = (id: string, c: any) => React.createElement(Composition as any, { id, component: c, durationInFrames: 150, fps: 30, width: 1080, height: 1920 });
registerRoot(() => React.createElement(React.Fragment, null, mk("Rec4Ramble", Rec4Ramble), mk("Rec5Cut", Rec5Cut), mk("Rec6Ban", Rec6Ban), mk("Rec8Detector", Rec8Detector)));
