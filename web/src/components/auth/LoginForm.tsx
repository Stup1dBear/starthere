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
          mb: 3,
          fontFamily: "'Courier New', monospace",
          color: "#FFD700",
          textShadow: "2px 2px 0 #4a9eff",
        }}
      >
        🚀 登录起航
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
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
          },
        }}
      />

      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={loading}
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
        {loading ? "登录中..." : "🛸 登录"}
      </Button>

      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Courier New', monospace",
            color: "#90caf9",
          }}
        >
          还没有账号？{" "}
          <Link
            to="/register"
            style={{
              color: "#FFD700",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            立即注册 →
          </Link>
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Courier New', monospace",
            color: "#888",
            mt: 1,
          }}
        >
          没收到验证邮件？{" "}
          <Link
            to="/resend-verification"
            style={{
              color: "#90caf9",
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
