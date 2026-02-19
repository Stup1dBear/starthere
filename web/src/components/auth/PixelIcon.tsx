import { Box } from "@mui/material";
import { keyframes } from "@mui/material/styles";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// 像素星星 - 用于成功状态
export function PixelStar({ size = 80 }: { size?: number }) {
  const pixelSize = size / 10;
  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: "relative",
        animation: `${float} 2s ease-in-out infinite`,
      }}
    >
      {[
        { x: 4, y: 0 }, { x: 5, y: 0 },
        { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 },
        { x: 4, y: 2 }, { x: 5, y: 2 },
        { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }, { x: 8, y: 3 }, { x: 9, y: 3 },
        { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }, { x: 7, y: 4 }, { x: 8, y: 4 },
        { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 },
        { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 6 },
        { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 },
        { x: 2, y: 8 }, { x: 3, y: 8 }, { x: 6, y: 8 }, { x: 7, y: 8 },
        { x: 1, y: 9 }, { x: 2, y: 9 }, { x: 7, y: 9 }, { x: 8, y: 9 },
      ].map((p, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            left: p.x * pixelSize,
            top: p.y * pixelSize,
            width: pixelSize,
            height: pixelSize,
            backgroundColor: "#FFD700",
            boxShadow: `2px 2px 0 #B8860B`,
          }}
        />
      ))}
    </Box>
  );
}

// 像素叉号 - 用于错误状态
export function PixelCross({ size = 80 }: { size?: number }) {
  const pixelSize = size / 10;
  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: "relative",
      }}
    >
      {[
        { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 8, y: 0 }, { x: 9, y: 0 },
        { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 7, y: 1 }, { x: 8, y: 1 },
        { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 },
        { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 },
        { x: 4, y: 4 }, { x: 5, y: 4 },
        { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 },
        { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 6, y: 6 }, { x: 7, y: 6 },
        { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 7 },
        { x: 0, y: 8 }, { x: 1, y: 8 }, { x: 8, y: 8 }, { x: 9, y: 8 },
        { x: 0, y: 9 }, { x: 1, y: 9 }, { x: 8, y: 9 }, { x: 9, y: 9 },
      ].map((p, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            left: p.x * pixelSize,
            top: p.y * pixelSize,
            width: pixelSize,
            height: pixelSize,
            backgroundColor: "#ff6b6b",
            boxShadow: `2px 2px 0 #cc5555`,
          }}
        />
      ))}
    </Box>
  );
}

// 像素信封 - 用于验证邮件发送
export function PixelEnvelope({ size = 80 }: { size?: number }) {
  const pixelSize = size / 10;
  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: "relative",
        animation: `${float} 2.5s ease-in-out infinite`,
      }}
    >
      {/* 信封主体 */}
      {[
        { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 }, { x: 8, y: 2 }, { x: 9, y: 2 },
        { x: 0, y: 3 }, { x: 9, y: 3 },
        { x: 0, y: 4 }, { x: 9, y: 4 },
        { x: 0, y: 5 }, { x: 9, y: 5 },
        { x: 0, y: 6 }, { x: 9, y: 6 },
        { x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }, { x: 8, y: 7 }, { x: 9, y: 7 },
      ].map((p, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            left: p.x * pixelSize,
            top: p.y * pixelSize,
            width: pixelSize,
            height: pixelSize,
            backgroundColor: "#e0e0e0",
            boxShadow: `2px 2px 0 #a0a0a0`,
          }}
        />
      ))}
      {/* 信封盖子 */}
      {[
        { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
        { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }, { x: 7, y: 4 },
        { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 },
        { x: 4, y: 6 }, { x: 5, y: 6 },
        { x: 6, y: 3 }, { x: 7, y: 3 }, { x: 8, y: 3 },
      ].map((p, i) => (
        <Box
          key={`lid-${i}`}
          sx={{
            position: "absolute",
            left: p.x * pixelSize,
            top: p.y * pixelSize,
            width: pixelSize,
            height: pixelSize,
            backgroundColor: "#c0c0c0",
            boxShadow: `1px 1px 0 #909090`,
          }}
        />
      ))}
      {/* 封口星星 */}
      {[
        { x: 4, y: 4 }, { x: 5, y: 4 },
        { x: 4, y: 5 }, { x: 5, y: 5 },
      ].map((p, i) => (
        <Box
          key={`seal-${i}`}
          sx={{
            position: "absolute",
            left: p.x * pixelSize,
            top: p.y * pixelSize,
            width: pixelSize,
            height: pixelSize,
            backgroundColor: "#FFD700",
            boxShadow: `1px 1px 0 #B8860B`,
          }}
        />
      ))}
    </Box>
  );
}

// 像素加载指示器
export function PixelSpinner({ size = 48 }: { size?: number }) {
  const pixelSize = size / 8;
  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: "relative",
        animation: `${spin} 1s linear infinite`,
      }}
    >
      {[
        { x: 3, y: 0 }, { x: 4, y: 0 },
        { x: 2, y: 1 }, { x: 5, y: 1 },
        { x: 1, y: 2 }, { x: 6, y: 2 },
        { x: 0, y: 3 }, { x: 7, y: 3 },
        { x: 0, y: 4 }, { x: 7, y: 4 },
        { x: 1, y: 5 }, { x: 6, y: 5 },
        { x: 2, y: 6 }, { x: 5, y: 6 },
        { x: 3, y: 7 }, { x: 4, y: 7 },
      ].map((p, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            left: p.x * pixelSize,
            top: p.y * pixelSize,
            width: pixelSize,
            height: pixelSize,
            backgroundColor: "#90caf9",
            boxShadow: `1px 1px 0 #4a9eff`,
            opacity: i < 8 ? 1 : 0.4,
          }}
        />
      ))}
    </Box>
  );
}

// 像素背景星星 - 用于装饰
export function PixelBackgroundStars({ count = 50 }: { count?: number }) {
  const stars = Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() > 0.7 ? 4 : 2,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 2,
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
            backgroundColor: "#fff",
            animation: `${pulse} ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes ${pulse} {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
}
