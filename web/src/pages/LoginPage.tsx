import { Box, Container } from "@mui/material";
import { PixelRocket } from "../components/auth/PixelRocket";
import { LoginForm } from "../components/auth/LoginForm";

export function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #0B0D17, #1a1f3a)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            backgroundColor: "#fff",
            borderRadius: "50%",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            opacity: Math.random() * 0.7 + 0.3,
            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
          }}
        />
      ))}

      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
            backgroundColor: "rgba(11, 13, 23, 0.9)",
            borderRadius: "8px",
            border: "4px solid #90caf9",
            boxShadow: "8px 8px 0 #1a3a5c",
          }}
        >
          <PixelRocket />
          <LoginForm />
        </Box>
      </Container>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </Box>
  );
}
