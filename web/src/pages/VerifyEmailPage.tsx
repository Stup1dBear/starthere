import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Box, Container, Typography, Button, CircularProgress } from "@mui/material";
import { authApi } from "../services/authApi";

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("正在验证...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("验证链接无效");
      return;
    }

    const verify = async () => {
      try {
        const response = await authApi.verifyEmail(token);
        if (response.success) {
          setStatus("success");
          setMessage(response.message || "邮箱验证成功！");
        } else {
          setStatus("error");
          setMessage(response.error || "验证失败");
        }
      } catch {
        setStatus("error");
        setMessage("网络错误，请稍后重试");
      }
    };

    verify();
  }, [token]);

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
          {status === "loading" && (
            <>
              <CircularProgress sx={{ color: "#90caf9", mb: 3 }} />
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Courier New', monospace",
                  color: "#fff",
                }}
              >
                {message}
              </Typography>
            </>
          )}

          {status === "success" && (
            <>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "80px",
                  mb: 2,
                }}
              >
                ✨
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Courier New', monospace",
                  color: "#FFD700",
                  mb: 2,
                }}
              >
                验证成功！
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'Courier New', monospace",
                  color: "#fff",
                  mb: 3,
                }}
              >
                {message}
              </Typography>
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
                🚀 立即登录
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "80px",
                  mb: 2,
                }}
              >
                ❌
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Courier New', monospace",
                  color: "#ff6b6b",
                  mb: 2,
                }}
              >
                验证失败
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'Courier New', monospace",
                  color: "#fff",
                  mb: 3,
                }}
              >
                {message}
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
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}
