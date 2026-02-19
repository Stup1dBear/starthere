import { Box, Container } from "@mui/material";
import { EightBitRocket, EightBitBackground, EightBitColors } from "../components/auth/EightBitIcon";
import { LoginForm } from "../components/auth/LoginForm";

export function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(to bottom, ${EightBitColors.darkBlue}, #2a3a6a)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <EightBitBackground count={40} />

      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 5,
            backgroundColor: EightBitColors.black,
            border: `4px solid ${EightBitColors.lightGray}`,
            boxShadow: `8px 8px 0 ${EightBitColors.darkGray}`,
          }}
        >
          <EightBitRocket size={160} />
          <LoginForm />
        </Box>
      </Container>
    </Box>
  );
}
