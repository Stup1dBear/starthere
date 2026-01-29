export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const STAR_COLORS = [
  "#FFD700", // Gold
  "#87CEEB", // SkyBlue
  "#FF69B4", // HotPink
  "#00FF7F", // SpringGreen
  "#FF4500", // OrangeRed
  "#9370DB", // MediumPurple
  "#E0FFFF", // LightCyan
];

export const getRandomColor = (): string => {
  return STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
};
