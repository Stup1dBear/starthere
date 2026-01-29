import { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
  Fab,
  Zoom,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import theme from "./theme";
import { useGoalStore } from "./stores/goalStore";
import StarBackground from "./components/StarBackground";
import GoalCard from "./components/GoalCard";
import CreateGoalDialog from "./components/CreateGoalDialog";
import "./App.css";

function App() {
  const { goals } = useGoalStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const activeGoals = goals.filter((g) => g.status === "active");
  const completedGoals = goals.filter((g) => g.status === "completed");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StarBackground />

      <Container
        maxWidth="md"
        sx={{ py: 4, position: "relative", zIndex: 1, minHeight: "100vh" }}
      >
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textShadow: "0 0 20px rgba(144, 202, 249, 0.5)",
            }}
          >
            🌟 星辰目标
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "text.secondary", letterSpacing: 1 }}
          >
            每一个目标都是宇宙中的一颗星星，点亮它。
          </Typography>
        </Box>

        <Box mb={6}>
          {activeGoals.length > 0 ? (
            activeGoals.map((goal) => <GoalCard key={goal.id} goal={goal} />)
          ) : (
            <Box
              textAlign="center"
              py={8}
              sx={{
                border: "2px dashed rgba(255,255,255,0.1)",
                borderRadius: 4,
                bgcolor: "rgba(0,0,0,0.2)",
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                这片星域还很空旷...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                点击右下角的按钮，升起你的第一颗星星
              </Typography>
            </Box>
          )}
        </Box>

        {completedGoals.length > 0 && (
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: "#FFD700",
                textShadow: "0 0 10px rgba(255, 215, 0, 0.3)",
              }}
            >
              � 星系传说 (已完成)
            </Typography>
            {completedGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </Box>
        )}

        <Zoom in={true} style={{ transitionDelay: "500ms" }}>
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: "fixed",
              bottom: 32,
              right: 32,
              width: 72,
              height: 72,
              boxShadow: "0 0 20px rgba(144, 202, 249, 0.6)",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0 0 30px rgba(144, 202, 249, 0.8)",
              },
            }}
            onClick={() => setIsDialogOpen(true)}
          >
            <AddIcon sx={{ fontSize: 32 }} />
          </Fab>
        </Zoom>

        <CreateGoalDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />

        <Box mt={8} textAlign="center">
          <Typography variant="caption" color="text.secondary">
            🚀 StartHere - To the Stars
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
