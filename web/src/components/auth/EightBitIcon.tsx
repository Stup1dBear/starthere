import { Box } from "@mui/material";
import { keyframes } from "@mui/material/styles";

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-8px) translateX(4px); }
  50% { transform: translateY(0) translateX(0); }
  75% { transform: translateY(-4px) translateX(-4px); }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
`;

// 经典8位色板
const COLORS = {
  black: "#0f0f0f",
  darkBlue: "#1d2b53",
  darkPurple: "#7e2553",
  darkGreen: "#008751",
  brown: "#ab5236",
  darkGray: "#5f574f",
  lightGray: "#c2c3c7",
  white: "#fff1e8",
  red: "#ff004d",
  orange: "#ffa300",
  yellow: "#ffec27",
  green: "#00e436",
  blue: "#29adff",
  lavender: "#ff77a8",
  peach: "#ffccaa",
};

// 像素块 - 基础构建单元
function Pixel({ x, y, color, size = 8 }: { x: number; y: number; color: string; size?: number }) {
  return (
    <Box
      sx={{
        position: "absolute",
        left: x * size,
        top: y * size,
        width: size,
        height: size,
        backgroundColor: color,
      }}
    />
  );
}

// 8位星星 - 成功/装饰用
export function EightBitStar({ size = 96 }: { size?: number }) {
  const p = size / 12;
  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: "relative",
        animation: `${bounce} 1s ease-in-out infinite`,
      }}
    >
      {[
        { x: 5, y: 0, c: COLORS.yellow },
        { x: 4, y: 1, c: COLORS.yellow }, { x: 5, y: 1, c: COLORS.yellow }, { x: 6, y: 1, c: COLORS.yellow },
        { x: 3, y: 2, c: COLORS.yellow }, { x: 4, y: 2, c: COLORS.peach }, { x: 5, y: 2, c: COLORS.peach }, { x: 6, y: 2, c: COLORS.peach }, { x: 7, y: 2, c: COLORS.yellow },
        { x: 0, y: 3, c: COLORS.yellow }, { x: 1, y: 3, c: COLORS.yellow }, { x: 2, y: 3, c: COLORS.peach }, { x: 3, y: 3, c: COLORS.peach }, { x: 4, y: 3, c: COLORS.white }, { x: 5, y: 3, c: COLORS.white }, { x: 6, y: 3, c: COLORS.peach }, { x: 7, y: 3, c: COLORS.peach }, { x: 8, y: 3, c: COLORS.yellow }, { x: 9, y: 3, c: COLORS.yellow },
        { x: 0, y: 4, c: COLORS.yellow }, { x: 1, y: 4, c: COLORS.peach }, { x: 2, y: 4, c: COLORS.peach }, { x: 3, y: 4, c: COLORS.white }, { x: 4, y: 4, c: COLORS.white }, { x: 5, y: 4, c: COLORS.white }, { x: 6, y: 4, c: COLORS.white }, { x: 7, y: 4, c: COLORS.peach }, { x: 8, y: 4, c: COLORS.peach }, { x: 9, y: 4, c: COLORS.yellow },
        { x: 1, y: 5, c: COLORS.peach }, { x: 2, y: 5, c: COLORS.white }, { x: 3, y: 5, c: COLORS.white }, { x: 4, y: 5, c: COLORS.white }, { x: 5, y: 5, c: COLORS.white }, { x: 6, y: 5, c: COLORS.white }, { x: 7, y: 5, c: COLORS.white }, { x: 8, y: 5, c: COLORS.peach },
        { x: 2, y: 6, c: COLORS.peach }, { x: 3, y: 6, c: COLORS.white }, { x: 4, y: 6, c: COLORS.white }, { x: 5, y: 6, c: COLORS.white }, { x: 6, y: 6, c: COLORS.white }, { x: 7, y: 6, c: COLORS.peach },
        { x: 3, y: 7, c: COLORS.yellow }, { x: 4, y: 7, c: COLORS.yellow }, { x: 5, y: 7, c: COLORS.yellow }, { x: 6, y: 7, c: COLORS.yellow },
        { x: 4, y: 8, c: COLORS.yellow }, { x: 5, y: 8, c: COLORS.yellow },
        { x: 3, y: 9, c: COLORS.yellow }, { x: 4, y: 9, c: COLORS.yellow }, { x: 5, y: 9, c: COLORS.yellow }, { x: 6, y: 9, c: COLORS.yellow },
        { x: 2, y: 10, c: COLORS.yellow }, { x: 3, y: 10, c: COLORS.yellow }, { x: 6, y: 10, c: COLORS.yellow }, { x: 7, y: 10, c: COLORS.yellow },
      ].map((p, i) => (
        <Pixel key={i} x={p.x} y={p.y} color={p.c} size={p} />
      ))}
    </Box>
  );
}

// 8位叉号 - 错误用
export function EightBitCross({ size = 96 }: { size?: number }) {
  const p = size / 12;
  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: "relative",
      }}
    >
      {[
        { x: 1, y: 1, c: COLORS.red }, { x: 2, y: 1, c: COLORS.red }, { x: 9, y: 1, c: COLORS.red }, { x: 10, y: 1, c: COLORS.red },
        { x: 1, y: 2, c: COLORS.red }, { x: 2, y: 2, c: COLORS.red }, { x: 3, y: 2, c: COLORS.red }, { x: 8, y: 2, c: COLORS.red }, { x: 9, y: 2, c: COLORS.red }, { x: 10, y: 2, c: COLORS.red },
        { x: 2, y: 3, c: COLORS.red }, { x: 3, y: 3, c: COLORS.red }, { x: 4, y: 3, c: COLORS.red }, { x: 7, y: 3, c: COLORS.red }, { x: 8, y: 3, c: COLORS.red }, { x: 9, y: 3, c: COLORS.red },
        { x: 3, y: 4, c: COLORS.red }, { x: 4, y: 4, c: COLORS.red }, { x: 5, y: 4, c: COLORS.red }, { x: 6, y: 4, c: COLORS.red }, { x: 7, y: 4, c: COLORS.red }, { x: 8, y: 4, c: COLORS.red },
        { x: 4, y: 5, c: COLORS.red }, { x: 5, y: 5, c: COLORS.red }, { x: 6, y: 5, c: COLORS.red }, { x: 7, y: 5, c: COLORS.red },
        { x: 4, y: 6, c: COLORS.red }, { x: 5, y: 6, c: COLORS.red }, { x: 6, y: 6, c: COLORS.red }, { x: 7, y: 6, c: COLORS.red },
        { x: 3, y: 7, c: COLORS.red }, { x: 4, y: 7, c: COLORS.red }, { x: 5, y: 7, c: COLORS.red }, { x: 6, y: 7, c: COLORS.red }, { x: 7, y: 7, c: COLORS.red }, { x: 8, y: 7, c: COLORS.red },
        { x: 2, y: 8, c: COLORS.red }, { x: 3, y: 8, c: COLORS.red }, { x: 4, y: 8, c: COLORS.red }, { x: 7, y: 8, c: COLORS.red }, { x: 8, y: 8, c: COLORS.red }, { x: 9, y: 8, c: COLORS.red },
        { x: 1, y: 9, c: COLORS.red }, { x: 2, y: 9, c: COLORS.red }, { x: 3, y: 9, c: COLORS.red }, { x: 8, y: 9, c: COLORS.red }, { x: 9, y: 9, c: COLORS.red }, { x: 10, y: 9, c: COLORS.red },
        { x: 1, y: 10, c: COLORS.red }, { x: 2, y: 10, c: COLORS.red }, { x: 9, y: 10, c: COLORS.red }, { x: 10, y: 10, c: COLORS.red },
      ].map((p, i) => (
        <Pixel key={i} x={p.x} y={p.y} color={p.c} size={p} />
      ))}
    </Box>
  );
}

// 8位信封 - 邮件用
export function EightBitEnvelope({ size = 96 }: { size?: number }) {
  const p = size / 12;
  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: "relative",
        animation: `${float} 2.5s ease-in-out infinite`,
      }}
    >
      {[
        { x: 1, y: 3, c: COLORS.lightGray }, { x: 2, y: 3, c: COLORS.lightGray }, { x: 3, y: 3, c: COLORS.lightGray }, { x: 4, y: 3, c: COLORS.lightGray }, { x: 5, y: 3, c: COLORS.lightGray }, { x: 6, y: 3, c: COLORS.lightGray }, { x: 7, y: 3, c: COLORS.lightGray }, { x: 8, y: 3, c: COLORS.lightGray }, { x: 9, y: 3, c: COLORS.lightGray }, { x: 10, y: 3, c: COLORS.lightGray },
        { x: 1, y: 4, c: COLORS.lightGray }, { x: 10, y: 4, c: COLORS.lightGray },
        { x: 1, y: 5, c: COLORS.lightGray }, { x: 5, y: 5, c: COLORS.yellow }, { x: 6, y: 5, c: COLORS.yellow }, { x: 10, y: 5, c: COLORS.lightGray },
        { x: 1, y: 6, c: COLORS.lightGray }, { x: 4, y: 6, c: COLORS.yellow }, { x: 5, y: 6, c: COLORS.yellow }, { x: 6, y: 6, c: COLORS.yellow }, { x: 7, y: 6, c: COLORS.yellow }, { x: 10, y: 6, c: COLORS.lightGray },
        { x: 1, y: 7, c: COLORS.lightGray }, { x: 3, y: 7, c: COLORS.lightGray }, { x: 4, y: 7, c: COLORS.lightGray }, { x: 5, y: 7, c: COLORS.lightGray }, { x: 6, y: 7, c: COLORS.lightGray }, { x: 7, y: 7, c: COLORS.lightGray }, { x: 8, y: 7, c: COLORS.lightGray }, { x: 10, y: 7, c: COLORS.lightGray },
        { x: 1, y: 8, c: COLORS.lightGray }, { x: 2, y: 8, c: COLORS.lightGray }, { x: 3, y: 8, c: COLORS.lightGray }, { x: 4, y: 8, c: COLORS.lightGray }, { x: 5, y: 8, c: COLORS.lightGray }, { x: 6, y: 8, c: COLORS.lightGray }, { x: 7, y: 8, c: COLORS.lightGray }, { x: 8, y: 8, c: COLORS.lightGray }, { x: 9, y: 8, c: COLORS.lightGray }, { x: 10, y: 8, c: COLORS.lightGray },
      ].map((p, i) => (
        <Pixel key={i} x={p.x} y={p.y} color={p.c} size={p} />
      ))}
    </Box>
  );
}

// 8位火箭 - 吉祥物
export function EightBitRocket({ size = 128 }: { size?: number }) {
  const p = size / 16;
  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: "relative",
        animation: `${bounce} 0.8s ease-in-out infinite`,
      }}
    >
      {[
        { x: 7, y: 0, c: COLORS.red },
        { x: 6, y: 1, c: COLORS.red }, { x: 7, y: 1, c: COLORS.red }, { x: 8, y: 1, c: COLORS.red },
        { x: 5, y: 2, c: COLORS.red }, { x: 6, y: 2, c: COLORS.orange }, { x: 7, y: 2, c: COLORS.orange }, { x: 8, y: 2, c: COLORS.orange }, { x: 9, y: 2, c: COLORS.red },
        { x: 5, y: 3, c: COLORS.white }, { x: 6, y: 3, c: COLORS.white }, { x: 7, y: 3, c: COLORS.white }, { x: 8, y: 3, c: COLORS.white }, { x: 9, y: 3, c: COLORS.white }, { x: 10, y: 3, c: COLORS.red },
        { x: 4, y: 4, c: COLORS.white }, { x: 5, y: 4, c: COLORS.blue }, { x: 6, y: 4, c: COLORS.white }, { x: 7, y: 4, c: COLORS.white }, { x: 8, y: 4, c: COLORS.white }, { x: 9, y: 4, c: COLORS.white }, { x: 10, y: 4, c: COLORS.white }, { x: 11, y: 4, c: COLORS.red },
        { x: 4, y: 5, c: COLORS.white }, { x: 5, y: 5, c: COLORS.blue }, { x: 6, y: 5, c: COLORS.blue }, { x: 7, y: 5, c: COLORS.white }, { x: 8, y: 5, c: COLORS.white }, { x: 9, y: 5, c: COLORS.white }, { x: 10, y: 5, c: COLORS.white }, { x: 11, y: 5, c: COLORS.red },
        { x: 4, y: 6, c: COLORS.white }, { x: 5, y: 6, c: COLORS.white }, { x: 6, y: 6, c: COLORS.white }, { x: 7, y: 6, c: COLORS.white }, { x: 8, y: 6, c: COLORS.white }, { x: 9, y: 6, c: COLORS.white }, { x: 10, y: 6, c: COLORS.white }, { x: 11, y: 6, c: COLORS.red },
        { x: 4, y: 7, c: COLORS.white }, { x: 5, y: 7, c: COLORS.white }, { x: 6, y: 7, c: COLORS.white }, { x: 7, y: 7, c: COLORS.white }, { x: 8, y: 7, c: COLORS.white }, { x: 9, y: 7, c: COLORS.white }, { x: 10, y: 7, c: COLORS.white }, { x: 11, y: 7, c: COLORS.red },
        { x: 3, y: 8, c: COLORS.red }, { x: 4, y: 8, c: COLORS.white }, { x: 5, y: 8, c: COLORS.white }, { x: 6, y: 8, c: COLORS.white }, { x: 7, y: 8, c: COLORS.white }, { x: 8, y: 8, c: COLORS.white }, { x: 9, y: 8, c: COLORS.white }, { x: 10, y: 8, c: COLORS.white }, { x: 11, y: 8, c: COLORS.white }, { x: 12, y: 8, c: COLORS.red },
        { x: 3, y: 9, c: COLORS.red }, { x: 4, y: 9, c: COLORS.red }, { x: 5, y: 9, c: COLORS.white }, { x: 6, y: 9, c: COLORS.white }, { x: 7, y: 9, c: COLORS.white }, { x: 8, y: 9, c: COLORS.white }, { x: 9, y: 9, c: COLORS.white }, { x: 10, y: 9, c: COLORS.white }, { x: 11, y: 9, c: COLORS.red }, { x: 12, y: 9, c: COLORS.red },
        { x: 4, y: 10, c: COLORS.red }, { x: 5, y: 10, c: COLORS.red }, { x: 6, y: 10, c: COLORS.red }, { x: 7, y: 10, c: COLORS.red }, { x: 8, y: 10, c: COLORS.red }, { x: 9, y: 10, c: COLORS.red }, { x: 10, y: 10, c: COLORS.red }, { x: 11, y: 10, c: COLORS.red },
        { x: 5, y: 11, c: COLORS.orange }, { x: 6, y: 11, c: COLORS.orange }, { x: 7, y: 11, c: COLORS.orange }, { x: 8, y: 11, c: COLORS.orange }, { x: 9, y: 11, c: COLORS.orange }, { x: 10, y: 11, c: COLORS.orange },
        { x: 6, y: 12, c: COLORS.yellow }, { x: 7, y: 12, c: COLORS.orange }, { x: 8, y: 12, c: COLORS.orange }, { x: 9, y: 12, c: COLORS.yellow },
        { x: 6, y: 13, c: COLORS.yellow }, { x: 7, y: 13, c: COLORS.yellow }, { x: 8, y: 13, c: COLORS.yellow }, { x: 9, y: 13, c: COLORS.yellow },
        { x: 7, y: 14, c: COLORS.yellow }, { x: 8, y: 14, c: COLORS.yellow },
      ].map((p, i) => (
        <Pixel key={i} x={p.x} y={p.y} color={p.c} size={p} />
      ))}
    </Box>
  );
}

// 8位加载动画
export function EightBitSpinner({ size = 48 }: { size?: number }) {
  const pixelSize = size / 8;
  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: "relative",
      }}
    >
      {[
        { x: 3, y: 0, c: COLORS.yellow, a: 1 },
        { x: 4, y: 0, c: COLORS.yellow, a: 1 },
        { x: 5, y: 1, c: COLORS.yellow, a: 0.8 },
        { x: 6, y: 2, c: COLORS.orange, a: 0.6 },
        { x: 7, y: 3, c: COLORS.orange, a: 0.5 },
        { x: 7, y: 4, c: COLORS.orange, a: 0.4 },
        { x: 6, y: 5, c: COLORS.red, a: 0.3 },
        { x: 5, y: 6, c: COLORS.red, a: 0.2 },
        { x: 4, y: 7, c: COLORS.red, a: 0.1 },
        { x: 3, y: 7, c: COLORS.red, a: 0.1 },
        { x: 2, y: 6, c: COLORS.red, a: 0.2 },
        { x: 1, y: 5, c: COLORS.orange, a: 0.3 },
        { x: 0, y: 4, c: COLORS.orange, a: 0.4 },
        { x: 0, y: 3, c: COLORS.orange, a: 0.5 },
        { x: 1, y: 2, c: COLORS.yellow, a: 0.6 },
        { x: 2, y: 1, c: COLORS.yellow, a: 0.8 },
      ].map((pixel, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            left: pixel.x * pixelSize,
            top: pixel.y * pixelSize,
            width: pixelSize,
            height: pixelSize,
            backgroundColor: pixel.c,
            opacity: pixel.a,
            animation: `${blink} 0.5s ease-in-out infinite`,
            animationDelay: `${i * 0.03}s`,
          }}
        />
      ))}
    </Box>
  );
}

// 8位背景星星
export function EightBitBackground({ count = 30 }: { count?: number }) {
  const stars = Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() > 0.6 ? 8 : 4,
    delay: Math.random() * 2,
    type: Math.floor(Math.random() * 3),
  }));

  return (
    <>
      {stars.map((star) => (
        <Box
          key={star.id}
          sx={{
            position: "absolute",
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            backgroundColor: star.type === 0 ? COLORS.white : star.type === 1 ? COLORS.yellow : COLORS.blue,
            animation: `${twinkle} ${2 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </>
  );
}

export const EightBitColors = COLORS;
