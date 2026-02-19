import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";
import { authApi } from "../services/authApi";
import {
  EightBitStar,
  EightBitCross,
  EightBitSpinner,
  EightBitBackground,
  EightBitColors,
} from "../components/auth/EightBitIcon";

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

    let isSubscribed = true;
    let hasVerified = false;

    const verify = async () => {
      if (hasVerified) return;
      hasVerified = true;

      try {
        const response = await authApi.verifyEmail(token);
        if (!isSubscribed) return;

        if (response.success) {
          setStatus("success");
          setMessage(response.message || "邮箱验证成功！");
        } else {
          setStatus("error");
          setMessage(response.error || "验证失败");
        }
      } catch {
        if (!isSubscribed) return;
        setStatus("error");
        setMessage("网络错误，请稍后重试");
      }
    };

    verify();

    return () => {
      isSubscribed = false;
    };
  }, [token]);

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
          {status === "loading" && (
            <>
              <EightBitSpinner size={64} />
              <Box sx={{ height: 3 }} />
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Courier New', monospace",
                  color: EightBitColors.white,
                  letterSpacing: "2px",
                }}
              >
                正在验证...
              </Typography>
            </>
          )}

          {status === "success" && (
            <>
              <EightBitStar size={120} />
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
                验证成功！
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
                {message}
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
                立即登录
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <EightBitCross size={120} />
              <Box sx={{ height: 2 }} />
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Courier New', monospace",
                  color: EightBitColors.red,
                  mb: 2,
                  mt: 2,
                  letterSpacing: "4px",
                  textShadow: `2px 2px 0 ${EightBitColors.darkPurple}`,
                }}
              >
                验证失败
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
                {message}
              </Typography>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  sx={{
                    fontFamily: "'Courier New', monospace",
                    fontWeight: "bold",
                    backgroundColor: EightBitColors.blue,
                    color: EightBitColors.white,
                    border: `4px solid ${EightBitColors.darkBlue}`,
                    boxShadow: `4px 4px 0 ${EightBitColors.darkBlue}`,
                    borderRadius: 0,
                    py: 1.5,
                    px: 4,
                    letterSpacing: "2px",
                    "&:hover": {
                      backgroundColor: EightBitColors.lavender,
                      border: `4px solid ${EightBitColors.darkPurple}`,
                      boxShadow: `4px 4px 0 ${EightBitColors.darkPurple}`,
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
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}
