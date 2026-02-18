import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { authApi } from "../services/authApi";

export function ResendVerificationPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("loading");

    try {
      await authApi.resendVerification({ email });
      setStatus("success");
    } catch {
      setError("网络错误，请稍后重试");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom, #0B0D17, #1a1f3a)",
        }}
      >
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
              邮件已发送！
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Courier New', monospace",
                color: "#fff",
                mb: 3,
              }}
            >
              如果该邮箱已注册，你会收到一封新的验证邮件。
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
              返回登录
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

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
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
            width: "100%",
            maxWidth: 400,
            backgroundColor: "rgba(11, 13, 23, 0.9)",
            borderRadius: "8px",
            border: "4px solid #90caf9",
            boxShadow: "8px 8px 0 #1a3a5c",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Courier New', monospace",
              color: "#FFD700",
              mb: 3,
              textAlign: "center",
            }}
          >
            🔄 重发验证邮件
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="注册邮箱"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                fontFamily: "'Courier New', monospace",
              },
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={status === "loading" || !email}
            sx={{
              mt: 3,
              py: 1.5,
              fontFamily: "'Courier New', monospace",
              fontWeight: "bold",
              backgroundColor: "#90caf9",
              color: "#0B0D17",
              boxShadow: "4px 4px 0 #4a9eff",
              "&:hover": {
                backgroundColor: "#b8dcff",
              },
              "&:disabled": {
                backgroundColor: "#666",
              },
            }}
          >
            {status === "loading" ? "发送中..." : "发送验证邮件"}
          </Button>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Courier New', monospace",
                color: "#90caf9",
              }}
            >
              <Link
                to="/login"
                style={{
                  color: "#FFD700",
                  textDecoration: "none",
                }}
              >
                ← 返回登录
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
