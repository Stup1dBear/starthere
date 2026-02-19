import { useSearchParams, Link } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";
import {
  EightBitEnvelope,
  EightBitBackground,
  EightBitColors,
} from "../components/auth/EightBitIcon";

export function VerifySentPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "你的邮箱";

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
            textAlign: "center",
            backgroundColor: EightBitColors.black,
            border: `4px solid ${EightBitColors.lightGray}`,
            boxShadow: `8px 8px 0 ${EightBitColors.darkGray}`,
          }}
        >
          <EightBitEnvelope size={120} />
          <Box sx={{ height: 2 }} />

          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Courier New', monospace",
              color: EightBitColors.yellow,
              mb: 2,
              mt: 2,
              letterSpacing: "4px",
              textShadow: `2px 2px 0 ${EightBitColors.orange}`,
            }}
          >
            验证邮件已发送！
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Courier New', monospace",
              color: EightBitColors.white,
              mb: 1,
              letterSpacing: "1px",
            }}
          >
            请检查你的邮箱：
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Courier New', monospace",
              color: EightBitColors.green,
              mb: 4,
              letterSpacing: "2px",
              border: `2px solid ${EightBitColors.darkGreen}`,
              px: 3,
              py: 1,
            }}
          >
            {email}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Courier New', monospace",
              color: EightBitColors.lightGray,
              mb: 4,
              letterSpacing: "1px",
            }}
          >
            点击邮件中的验证链接，即可完成注册。
            <br />
            如果没收到邮件，可以检查垃圾箱或稍后重发。
          </Typography>

          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                fontFamily: "'Courier New', monospace",
                fontWeight: "bold",
                backgroundColor: EightBitColors.green,
                color: EightBitColors.black,
                border: `4px solid ${EightBitColors.darkGreen}`,
                boxShadow: `4px 4px 0 ${EightBitColors.darkGreen}`,
                borderRadius: 0,
                py: 1.5,
                px: 4,
                letterSpacing: "2px",
                "&:hover": {
                  backgroundColor: EightBitColors.yellow,
                  border: `4px solid ${EightBitColors.orange}`,
                  boxShadow: `4px 4px 0 ${EightBitColors.orange}`,
                },
              }}
            >
              返回登录
            </Button>

            <Button
              component={Link}
              to="/resend-verification"
              variant="outlined"
              sx={{
                fontFamily: "'Courier New', monospace",
                border: `4px solid ${EightBitColors.blue}`,
                color: EightBitColors.blue,
                borderRadius: 0,
                py: 1.5,
                px: 4,
                letterSpacing: "2px",
                "&:hover": {
                  border: `4px solid ${EightBitColors.lavender}`,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  color: EightBitColors.lavender,
                },
              }}
            >
              重发验证邮件
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
