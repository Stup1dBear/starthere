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

export function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }

    if (formData.password.length < 6) {
      setError("密码至少需要 6 个字符");
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/verify-sent?email=" + encodeURIComponent(formData.email));
        }, 1500);
      } else {
        setError(response.error || "注册失败");
      }
    } catch {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Courier New', monospace",
            color: "#FFD700",
            mb: 2,
          }}
        >
          🎉 注册成功！
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "'Courier New', monospace",
            color: "#fff",
          }}
        >
          正在跳转到验证页面...
        </Typography>
      </Box>
    );
  }

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
        🌟 注册账号
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="用户名"
        margin="normal"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        sx={{
          "& .MuiOutlinedInput-root": {
            fontFamily: "'Courier New', monospace",
          },
        }}
      />

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

      <TextField
        fullWidth
        label="确认密码"
        type="password"
        margin="normal"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
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
        {loading ? "注册中..." : "🚀 创建账号"}
      </Button>

      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Courier New', monospace",
            color: "#90caf9",
          }}
        >
          已有账号？{" "}
          <Link
            to="/login"
            style={{
              color: "#FFD700",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            立即登录 →
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
