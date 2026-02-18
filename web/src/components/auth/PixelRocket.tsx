import { keyframes } from "@mui/material/styles";
import { Box } from "@mui/material";

const rocketFly = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-5px) rotate(-2deg);
  }
  50% {
    transform: translateY(0) rotate(0deg);
  }
  75% {
    transform: translateY(-3px) rotate(2deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
`;

const flameFlicker = keyframes`
  0%, 100% { opacity: 1; transform: scaleY(1); }
  50% { opacity: 0.8; transform: scaleY(0.9); }
`;

const starTwinkle = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

export function PixelRocket() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "120px",
        height: "160px",
        animation: `${rocketFly} 3s ease-in-out infinite`,
      }}
    >
      {/* Stars */}
      <Box
        sx={{
          position: "absolute",
          width: "4px",
          height: "4px",
          backgroundColor: "#fff",
          borderRadius: "50%",
          animation: `${starTwinkle} 2s ease-in-out infinite`,
          top: "10%",
          left: "10%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "4px",
          height: "4px",
          backgroundColor: "#fff",
          borderRadius: "50%",
          animation: `${starTwinkle} 2s ease-in-out infinite`,
          animationDelay: "0.5s",
          top: "20%",
          right: "15%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "4px",
          height: "4px",
          backgroundColor: "#fff",
          borderRadius: "50%",
          animation: `${starTwinkle} 2s ease-in-out infinite`,
          animationDelay: "1s",
          top: "40%",
          left: "5%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "4px",
          height: "4px",
          backgroundColor: "#fff",
          borderRadius: "50%",
          animation: `${starTwinkle} 2s ease-in-out infinite`,
          animationDelay: "1.5s",
          top: "60%",
          right: "10%",
        }}
      />

      {/* Rocket body container */}
      <Box
        sx={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60px",
          height: "100px",
        }}
      >
        {/* Rocket nose cone */}
        <Box
          sx={{
            width: 0,
            height: 0,
            borderLeft: "30px solid transparent",
            borderRight: "30px solid transparent",
            borderBottom: "40px solid #90caf9",
            marginLeft: 0,
          }}
        />

        {/* Rocket body */}
        <Box
          sx={{
            width: "60px",
            height: "60px",
            backgroundColor: "#e0e0e0",
            boxShadow: "4px 0 0 #b0b0b0, -4px 0 0 #ffffff",
            position: "relative",
          }}
        >
          {/* Window */}
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "24px",
              height: "24px",
              backgroundColor: "#90caf9",
              borderRadius: "50%",
              border: "4px solid #4a9eff",
              boxShadow: "inset 2px 2px 0 #b8dcff",
            }}
          />
        </Box>

        {/* Fins */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: "-10px",
            width: 0,
            height: 0,
            borderTop: "20px solid transparent",
            borderBottom: "0 solid transparent",
            borderRight: "20px solid #ff6b00",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: "-10px",
            width: 0,
            height: 0,
            borderTop: "20px solid transparent",
            borderBottom: "0 solid transparent",
            borderLeft: "20px solid #ff6b00",
          }}
        />
      </Box>

      {/* Flame */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "30px",
          height: "40px",
          background: "linear-gradient(to top, #ff6b00, #ffd700, #fff)",
          clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
          animation: `${flameFlicker} 0.15s ease-in-out infinite`,
        }}
      />
    </Box>
  );
}
