import { Box, Card, CardContent, Chip, LinearProgress, Stack, Typography } from "@mui/material";
import type { Star } from "../types";

const momentumLabel: Record<Star["momentum"], string> = {
  forming: "还在寻找抓手",
  steady: "正在稳步推进",
  drifting: "有些漂移",
  renewing: "正在重新点亮",
};

interface StarFocusPanelProps {
  star: Star;
}

export function StarFocusPanel({ star }: StarFocusPanelProps) {
  return (
    <Card
      sx={{
        background:
          `radial-gradient(circle at top left, ${star.color}26, rgba(14, 19, 31, 0.92) 55%)`,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="overline" color="primary.light">
              Current Focus
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5 }}>
              {star.title}
            </Typography>
          </Box>

          <Typography variant="body1">{star.vision}</Typography>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Chip label={momentumLabel[star.momentum]} color="primary" variant="outlined" />
            <Chip label={`能量 ${star.energy}`} color="secondary" variant="outlined" />
            <Chip
              label={star.lastCheckInAt ? "有最近记录" : "等待第一次记录"}
              variant="outlined"
            />
          </Stack>

          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              为什么它重要
            </Typography>
            <Typography variant="body2">{star.whyItMatters}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              你现在站在哪里
            </Typography>
            <Typography variant="body2">{star.currentState}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              当前下一步
            </Typography>
            <Typography variant="body2">{star.nextStep}</Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              连续性热度
            </Typography>
            <LinearProgress
              variant="determinate"
              value={star.energy}
              sx={{
                mt: 1,
                height: 10,
                borderRadius: 999,
              }}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
