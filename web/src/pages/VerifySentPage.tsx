import { useSearchParams, Link } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";

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
            textAlign: "center",
            backgroundColor: "rgba(11, 13, 23, 0.9)",
            borderRadius: "8px",
            border: "4px solid #90caf9",
            boxShadow: "8px 8px 0 #1a3a5c",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "80px",
              mb: 2,
            }}
          >
            📧
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Courier New', monospace",
              color: "#FFD700",
              mb: 2,
            }}
          >
            验证邮件已发送！
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Courier New', monospace",
              color: "#fff",
              mb: 1,
            }}
          >
            请检查你的邮箱：
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Courier New', monospace",
              color: "#90caf9",
              mb: 3,
            }}
          >
            {email}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontFamily: "'Courier New', monospace",
              color: "#888",
              mb: 3,
            }}
          >
            点击邮件中的验证链接，即可完成注册。
            <br />
            如果没收到邮件，可以检查垃圾箱或稍后重发。
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                fontFamily: "'Courier New', monospace",
                fontWeight: "bold",
                backgroundColor: "#90caf9",
                color: "#0B0D17",
                boxShadow: "4px 4px 0 #4a9eff",
                "&:hover": {
                  backgroundColor: "#b8dcff",
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
                borderColor: "#90caf9",
                color: "#90caf9",
                "&:hover": {
                  borderColor: "#b8dcff",
                  backgroundColor: "rgba(144, 202, 249, 0.1)",
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
