import React from "react";
import { registerRoot, Composition } from "remotion";
import { ProductsVariants } from "./NoCodeTypesCarousel";

const Root: React.FC = () => (
  <Composition id="ProductsVariants" component={ProductsVariants} durationInFrames={2} fps={30} width={1080} height={1350} />
);
registerRoot(Root);
