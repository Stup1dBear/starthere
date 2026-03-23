import { useEffect, useMemo, useState } from "react";
import { Alert, Box, Button, CircularProgress, Container, Stack, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthStore } from "../stores/authStore";
import { useStarMapStore } from "../stores/starMapStore";
import StarBackground from "../components/StarBackground";
import { CreateStarDialog } from "../components/CreateStarDialog";
import { StarMapPanel } from "../components/StarMapPanel";
import { StarFocusPanel } from "../components/StarFocusPanel";
import { CheckInComposer } from "../components/CheckInComposer";
import { CompanionPanel } from "../components/CompanionPanel";
import { JourneyTimeline } from "../components/JourneyTimeline";

export function HomePage() {
  const { user, logout } = useAuthStore();
  const { stars, selectedStarId, selectStar, fetchStars, isLoading, error, reset } =
    useStarMapStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const activeStars = useMemo(
    () => stars.filter((star) => star.status === "active"),
    [stars],
  );
  const selectedStar =
    activeStars.find((star) => star.id === selectedStarId) ?? activeStars[0];

  useEffect(() => {
    void fetchStars();
  }, [fetchStars]);

  const handleLogout = () => {
    reset();
    logout();
  };

  return (
    <>
      <StarBackground />

      <Container
        maxWidth="xl"
        sx={{ py: 4, position: "relative", zIndex: 1, minHeight: "100vh" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            alignItems: { xs: "flex-start", md: "center" },
            flexDirection: { xs: "column", md: "row" },
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="overline" color="primary.light">
              StartHere MVP
            </Typography>
            <Typography variant="h2" sx={{ maxWidth: 700 }}>
              让一颗重要的星，不会因为漂移就被忘掉
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 720, mt: 1.5 }}
            >
              首页现在不再是目标列表，而是围绕当前 star 的单用户闭环：看见它，更新它，被陪着往前推一点。
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
              点亮新星
            </Button>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body2" color="primary.light">
                {user?.username}
              </Typography>
              <Button size="small" startIcon={<LogoutIcon />} onClick={handleLogout} color="inherit">
                退出登录
              </Button>
            </Box>
          </Stack>
        </Box>

        {error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        ) : null}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(320px, 0.95fr) 1.55fr" },
            gap: 3,
          }}
        >
          <Box>
            {isLoading && activeStars.length === 0 ? (
              <Box
                sx={{
                  minHeight: 360,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <StarMapPanel
                stars={activeStars}
                selectedStarId={selectedStar?.id ?? null}
                onSelect={selectStar}
              />
            )}
          </Box>

          <Box>
            {selectedStar ? (
              <Stack spacing={3}>
                <StarFocusPanel star={selectedStar} />
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", xl: "1.35fr 0.95fr" },
                    gap: 3,
                  }}
                >
                  <Box>
                    <CheckInComposer star={selectedStar} />
                  </Box>
                  <Box>
                    <CompanionPanel
                      star={selectedStar}
                    />
                  </Box>
                </Box>
                <JourneyTimeline entries={selectedStar.checkIns} />
              </Stack>
            ) : (
              <Box
                sx={{
                  minHeight: 520,
                  borderRadius: 6,
                  p: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "radial-gradient(circle at top, rgba(245,211,87,0.1), rgba(11,13,23,0.82) 55%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Stack spacing={2} sx={{ maxWidth: 560 }}>
                  <Typography variant="h4">先点亮第一颗星</Typography>
                  <Typography variant="body1" color="text.secondary">
                    MVP 的第一件事不是收集任务，而是让一个重要项目重新有重心。创建一颗星后，你就能开始连续的 check-in 和旅程记录。
                  </Typography>
                  <Box>
                    <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
                      创建第一颗星
                    </Button>
                  </Box>
                </Stack>
              </Box>
            )}
          </Box>
        </Box>

        <Box mt={6}>
          <Typography variant="caption" color="text.secondary">
            外层社交信号本轮只保留氛围感，不做真实 feed。先把个人闭环做扎实。
          </Typography>
        </Box>

        <CreateStarDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </Container>
    </>
  );
}
