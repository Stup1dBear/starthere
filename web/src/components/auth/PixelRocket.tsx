import { keyframes, styled } from "@mui/material/styles";

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

const RocketContainer = styled("div")({
  position: "relative",
  width: "120px",
  height: "160px",
  animation: `${rocketFly} 3s ease-in-out infinite`,
});

const Star = styled("div", {
  position: "absolute",
  width: "4px",
  height: "4px",
  backgroundColor: "#fff",
  borderRadius: "50%",
  animation: `${starTwinkle} 2s ease-in-out infinite`,
});

const Flame = styled("div")({
  position: "absolute",
  bottom: "0",
  left: "50%",
  transform: "translateX(-50%)",
  width: "30px",
  height: "40px",
  background: "linear-gradient(to top, #ff6b00, #ffd700, #fff)",
  clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
  animation: `${flameFlicker} 0.15s ease-in-out infinite`,
});

export function PixelRocket() {
  return (
    <RocketContainer>
      {/* Stars */}
      <Star sx={{ top: "10%", left: "10%", animationDelay: "0s" }} />
      <Star sx={{ top: "20%", right: "15%", animationDelay: "0.5s" }} />
      <Star sx={{ top: "40%", left: "5%", animationDelay: "1s" }} />
      <Star sx={{ top: "60%", right: "10%", animationDelay: "1.5s" }} />

      {/* Rocket body - pixel style using divs */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60px",
          height: "100px",
        }}
      >
        {/* Rocket nose cone */}
        <div
          style={{
            width: "0",
            height: "0",
            borderLeft: "30px solid transparent",
            borderRight: "30px solid transparent",
            borderBottom: "40px solid #90caf9",
            marginLeft: "0",
          }}
        />

        {/* Rocket body */}
        <div
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#e0e0e0",
            boxShadow: "4px 0 0 #b0b0b0, -4px 0 0 #ffffff",
          }}
        >
          {/* Window */}
          <div
            style={{
              position: "absolute",
              top: "50px",
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
        </div>

        {/* Fins */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "-10px",
            width: "0",
            height: "0",
            borderTop: "20px solid transparent",
            borderBottom: "0 solid transparent",
            borderRight: "20px solid #ff6b00",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "-10px",
            width: "0",
            height: "0",
            borderTop: "20px solid transparent",
            borderBottom: "0 solid transparent",
            borderLeft: "20px solid #ff6b00",
          }}
        />
      </div>

      {/* Flame */}
      <Flame />
    </RocketContainer>
  );
}
