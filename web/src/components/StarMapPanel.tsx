import { Box, ButtonBase, Card, CardContent, Stack, Typography } from "@mui/material";
import type { Star } from "../types";

interface StarMapPanelProps {
  stars: Star[];
  selectedStarId: string | null;
  onSelect: (starId: string) => void;
}

function getScale(index: number) {
  return Math.max(0.72, 1 - index * 0.08);
}

export function StarMapPanel({
  stars,
  selectedStarId,
  onSelect,
}: StarMapPanelProps) {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="overline" color="primary.light">
              Star Map
            </Typography>
            <Typography variant="h5">你的近域宇宙</Typography>
          </Box>

          {stars.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  md: "repeat(3, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {stars.map((star, index) => {
                const isSelected = star.id === selectedStarId;

                return (
                  <ButtonBase
                    key={star.id}
                    onClick={() => onSelect(star.id)}
                    sx={{
                      display: "block",
                      borderRadius: 4,
                      textAlign: "left",
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        minHeight: 170,
                        borderRadius: 4,
                        border: isSelected
                          ? "1px solid rgba(245, 211, 87, 0.7)"
                          : "1px solid rgba(255,255,255,0.08)",
                        background:
                          "radial-gradient(circle at top, rgba(255,255,255,0.1), rgba(10,13,22,0.82))",
                        boxShadow: isSelected
                          ? "0 0 30px rgba(245, 211, 87, 0.18)"
                          : "none",
                      }}
                    >
                      <Box
                        sx={{
                          width: 28 + star.energy * 0.45,
                          height: 28 + star.energy * 0.45,
                          borderRadius: "50%",
                          background: `radial-gradient(circle, ${star.color}, rgba(255,255,255,0.08))`,
                          boxShadow: `0 0 30px ${star.color}66`,
                          transform: `scale(${getScale(index)})`,
                          mb: 2,
                        }}
                      />
                      <Typography variant="subtitle1" gutterBottom>
                        {star.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {star.nextStep}
                      </Typography>
                    </Box>
                  </ButtonBase>
                );
              })}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              还没有星星时，首页应该是安静的，不是空表格。先点亮第一颗星，再开始形成你的轨道。
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
