import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#F5D357",
      light: "#FBE8A6",
    },
    secondary: {
      main: "#82CFFF",
      light: "#B5E5FF",
    },
    background: {
      default: "#07111F",
      paper: "rgba(17, 25, 40, 0.86)",
    },
    text: {
      primary: "#F8F4E8",
      secondary: "rgba(248, 244, 232, 0.72)",
    },
  },
  typography: {
    fontFamily: '"Avenir Next", "PingFang SC", "Helvetica Neue", sans-serif',
    h1: {
      fontSize: "3.4rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2.6rem",
      fontWeight: 700,
      lineHeight: 1.12,
    },
    h4: {
      fontWeight: 700,
      lineHeight: 1.15,
    },
    h5: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "none",
          paddingInline: 18,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          backgroundImage: "none",
          backgroundColor: "rgba(17, 25, 40, 0.78)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 22px 50px rgba(0, 0, 0, 0.28)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 18,
          },
        },
      },
    },
  },
});

export default theme;
