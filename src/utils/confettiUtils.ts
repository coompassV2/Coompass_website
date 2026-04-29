import confetti, { type Shape } from "canvas-confetti";

export const createHeartShape = () => {
  const colors = [
    "#ea384c", // Vibrant Red
    "#D946EF", // Magenta Pink
    "#F97316", // Bright Orange
    "#8B5CF6", // Vivid Purple
    "#EAB308", // Golden Yellow
    "#EC4899", // Hot Pink
    "#DC2626", // Deep Red
  ];

  return {
    shapes: ["❤️"] as const,
    colors,
  };
};

export const playConfettiAnimation = (duration: number = 3000) => {
  const { shapes, colors } = createHeartShape();
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      shapes: shapes as unknown as Shape[],
      colors: colors,
    });
    
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      shapes: shapes as unknown as Shape[],
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
  return end;
};