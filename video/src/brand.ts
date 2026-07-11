// Matchtern brand tokens — sourced from the official Matchtern Design System
// (colors_and_type.css). Exact, do not substitute.

export const COLORS = {
  navy: "#032E58", // dividers, panels, hero titles
  navyDeep: "#021F3C", // darker navy for depth / gradients
  navyText: "#001223", // near-black body
  stripeBlue: "#5D8CC4", // stripes, secondary accents
  logoBlue: "#2440BD", // the Matchtern triangle mark / primary accent
  logoBlueBright: "#2F50E6", // a touch brighter for glows/highlights on dark
  bodyGray: "#616A71",
  boxFill: "#B4D6EF", // light blue callout fill
  boxBorder: "#A4D4FA",
  offWhite: "#FCFCFC",
  checkGreen: "#1F9E47",
  crossRed: "#D32F2F",
  white: "#FFFFFF",
};

export const FONT = {
  serif: "'Playfair Display', Georgia, serif", // hero titles only
  sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
};

export const FPS = 30;

// caption easing
export const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3);
