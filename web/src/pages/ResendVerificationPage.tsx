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
import {
  EightBitEnvelope,
  EightBitSpinner,
  EightBitBackground,
  EightBitColors,
} from "../components/auth/EightBitIcon";

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
              邮件已发送！
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Courier New', monospace",
                color: EightBitColors.white,
                mb: 4,
                letterSpacing: "1px",
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
        background: `linear-gradient(to bottom, ${EightBitColors.darkBlue}, #2a3a6a)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <EightBitBackground count={40} />

      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 5,
            width: "100%",
            maxWidth: 400,
            backgroundColor: EightBitColors.black,
            border: `4px solid ${EightBitColors.lightGray}`,
            boxShadow: `8px 8px 0 ${EightBitColors.darkGray}`,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Courier New', monospace",
              color: EightBitColors.yellow,
              mb: 4,
              textAlign: "center",
              letterSpacing: "4px",
              textShadow: `2px 2px 0 ${EightBitColors.orange}`,
            }}
          >
            重发验证邮件
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                width: "100%",
                backgroundColor: EightBitColors.red,
                color: EightBitColors.white,
                border: `2px solid ${EightBitColors.darkPurple}`,
                borderRadius: 0,
                "& .MuiAlert-icon": {
                  color: EightBitColors.white,
                },
              }}
            >
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
                backgroundColor: EightBitColors.black,
                color: EightBitColors.white,
                border: `2px solid ${EightBitColors.lightGray}`,
                borderRadius: 0,
                "& fieldset": {
                  borderColor: EightBitColors.lightGray,
                  borderWidth: "2px",
                },
                "&:hover fieldset": {
                  borderColor: EightBitColors.blue,
                },
                "&.Mui-focused fieldset": {
                  borderColor: EightBitColors.yellow,
                  borderWidth: "3px",
                },
              },
              "& .MuiInputLabel-root": {
                fontFamily: "'Courier New', monospace",
                color: EightBitColors.lightGray,
                "&.Mui-focused": {
                  color: EightBitColors.yellow,
                },
              },
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={status === "loading" || !email}
            sx={{
              mt: 4,
              py: 2,
              fontFamily: "'Courier New', monospace",
              fontWeight: "bold",
              backgroundColor: EightBitColors.green,
              color: EightBitColors.black,
              border: `4px solid ${EightBitColors.darkGreen}`,
              boxShadow: `4px 4px 0 ${EightBitColors.darkGreen}`,
              borderRadius: 0,
              letterSpacing: "2px",
              "&:hover": {
                backgroundColor: EightBitColors.yellow,
                border: `4px solid ${EightBitColors.orange}`,
                boxShadow: `4px 4px 0 ${EightBitColors.orange}`,
              },
              "&:disabled": {
                backgroundColor: EightBitColors.darkGray,
                border: `4px solid ${EightBitColors.black}`,
                boxShadow: `4px 4px 0 ${EightBitColors.black}`,
                color: EightBitColors.lightGray,
              },
            }}
          >
            {status === "loading" ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
                <EightBitSpinner size={32} />
                <span>发送中...</span>
              </Box>
            ) : (
              "发送验证邮件"
            )}
          </Button>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Courier New', monospace",
                color: EightBitColors.lightGray,
                letterSpacing: "1px",
              }}
            >
              <Link
                to="/login"
                style={{
                  color: EightBitColors.yellow,
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                返回登录
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
