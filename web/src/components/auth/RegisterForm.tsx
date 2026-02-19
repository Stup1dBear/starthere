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
import { EightBitSpinner, EightBitStar, EightBitColors } from "./EightBitIcon";

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
      <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <EightBitStar size={100} />
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
          注册成功！
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "'Courier New', monospace",
            color: EightBitColors.white,
            letterSpacing: "1px",
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
          mb: 4,
          fontFamily: "'Courier New', monospace",
          color: EightBitColors.yellow,
          letterSpacing: "4px",
          textShadow: `2px 2px 0 ${EightBitColors.orange}`,
        }}
      >
        注册账号
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
        label="用户名"
        margin="normal"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
            <span>注册中...</span>
          </Box>
        ) : (
          "创建账号"
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
          已有账号？{" "}
          <Link
            to="/login"
            style={{
              color: EightBitColors.yellow,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            立即登录
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
