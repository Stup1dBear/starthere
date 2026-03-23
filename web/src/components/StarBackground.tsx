import React from "react";
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";

const twinkle = keyframes`
  0% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0.3; transform: scale(0.8); }
`;

const stars = Array.from({ length: 50 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 19 + 11) % 100}%`,
  size: (index % 3) + 1,
  opacity: 0.28 + ((index % 7) * 0.09),
  duration: `${2 + (index % 4)}s`,
  delay: `${(index % 5) * 0.7}s`,
}));

const StarBackground: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: "linear-gradient(to bottom, #0B0D17 0%, #151922 100%)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top, rgba(244, 196, 48, 0.08), transparent 35%), radial-gradient(circle at 80% 20%, rgba(111, 156, 255, 0.12), transparent 22%)",
        }}
      />
      {stars.map((star) => (
        <Box
          key={star.id}
          sx={{
            position: "absolute",
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            backgroundColor: "#FFF",
            opacity: star.opacity,
            animation: `${twinkle} ${star.duration} infinite ease-in-out`,
            animationDelay: star.delay,
          }}
        />
      ))}
    </Box>
  );
};

export default StarBackground;
