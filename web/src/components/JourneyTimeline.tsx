import { Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import type { CheckInEntry } from "../types";

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(timestamp);
}

interface JourneyTimelineProps {
  entries: CheckInEntry[];
}

export function JourneyTimeline({ entries }: JourneyTimelineProps) {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="overline" color="primary.light">
              Journey Log
            </Typography>
            <Typography variant="h5">最近的探索片段</Typography>
          </Box>

          {entries.length > 0 ? (
            <Stack divider={<Divider flexItem />} spacing={2}>
              {entries.slice(0, 5).map((entry) => (
                <Box key={entry.id}>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(entry.createdAt)}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                    {entry.update}
                  </Typography>
                  {entry.blocker ? (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                      阻力: {entry.blocker}
                    </Typography>
                  ) : null}
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    下一步: {entry.nextStep}
                  </Typography>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary">
              这里会积累你的返回、推进、卡住和重新出发。第一版先让这些片段真实可见，不强行做成任务流水账。
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
