export const EXPLAINER_SECONDS = 28;
export const smooth = (t: number, start: number, duration: number) => {
  const p = Math.max(0, Math.min(1, (t - start) / duration));
  return Math.max(0, Math.min(1, p * p * p * (p * (p * 6 - 15) + 10)));
};
export const beats = [
  {
    start: 0,
    end: 4.4,
    heading: "A form is only the beginning.",
    line: "Someone submits a form. But the email field is empty.",
  },
  {
    start: 4.4,
    end: 9.2,
    heading: "Check before you act.",
    line: "The workflow checks the required fields before continuing.",
  },
  {
    start: 9.2,
    end: 14,
    heading: "Missing information? Take a detour.",
    line: "If the email is missing, ask the person to provide it.",
  },
  {
    start: 14,
    end: 19.5,
    heading: "Repair. Then check again.",
    line: "They add an email. The same form returns for another check.",
  },
  {
    start: 19.5,
    end: 23,
    heading: "Now the next step can run.",
    line: "Once the required fields are present, create the contact.",
  },
  {
    start: 23,
    end: 28,
    heading: "Good automation handles the exception.",
    line: "Trigger. Check. Branch. Act. Not just a straight line.",
  },
] as const;

/** One persistent document; endpoints and state are pure functions of edited time. */
export const formState = (t: number) => {
  const send = smooth(t, 4.5, 1.65);
  const repair = smooth(t, 10.3, 1.4);
  const recheck = smooth(t, 17.1, 0.65);
  const returnX = 295 * (smooth(t, 16.7, 0.45) - smooth(t, 17.65, 0.5));
  const deliver = smooth(t, 20, 1.65);
  const filled = t >= 15.35;
  return {
    x: 350 + 610 * send + returnX + 590 * deliver,
    y: 490 + 282 * repair - 282 * recheck,
    scale: 1 - 0.2 * send + 0.08 * deliver,
    filled,
    passed: t >= 18.6,
    delivered: t >= 21.65,
  };
};
