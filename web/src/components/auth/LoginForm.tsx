import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { authApi } from "../../services/authApi";
import { useAuthStore } from "../../stores/authStore";
import { EightBitSpinner, EightBitColors } from "./EightBitIcon";

export function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authApi.login(formData);

      if (response.success && response.data) {
        login(response.data.token, response.data.user);
        navigate("/");
      } else {
        setError(response.error || "登录失败");
      }
    } catch {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: "100%", maxWidth: 400 }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          textAlign: "center",
          mb: 4,
          fontFamily: "'Courier New', monospace",
          color: EightBitColors.yellow,
          letterSpacing: "4px",
          textShadow: `2px 2px 0 ${EightBitColors.orange}`,
        }}
      >
        登录起航
      </Typography>

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
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
        label="邮箱"
        type="email"
        margin="normal"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

      <TextField
        fullWidth
        label="密码"
        type="password"
        margin="normal"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
        disabled={loading}
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
        {loading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
            <EightBitSpinner size={32} />
            <span>登录中...</span>
          </Box>
        ) : (
          "登录"
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
          还没有账号？{" "}
          <Link
            to="/register"
            style={{
              color: EightBitColors.yellow,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            立即注册
          </Link>
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Courier New', monospace",
            color: EightBitColors.darkGray,
            mt: 2,
            letterSpacing: "1px",
          }}
        >
          没收到验证邮件？{" "}
          <Link
            to="/resend-verification"
            style={{
              color: EightBitColors.blue,
              textDecoration: "none",
            }}
          >
            重发邮件
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
