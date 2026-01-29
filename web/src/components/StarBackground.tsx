import React from "react";
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";

const twinkle = keyframes`
  0% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0.3; transform: scale(0.8); }
`;

const StarBackground: React.FC = () => {
  // Generate static random stars to avoid hydration mismatch or re-renders
  // In a real app, this should be better handled, but for now fixed random seed or CSS-only is better.
  // Using pure CSS with multiple box-shadows is a common technique for starfields.

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
      {[...Array(50)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            borderRadius: "50%",
            backgroundColor: "#FFF",
            opacity: Math.random() * 0.7 + 0.3,
            animation: `${twinkle} ${Math.random() * 3 + 2}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </Box>
  );
};

export default StarBackground;
