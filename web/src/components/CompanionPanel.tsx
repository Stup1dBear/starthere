import { Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import type { AssistantReply, Star } from "../types";

interface CompanionPanelProps {
  star: Star;
  reply?: AssistantReply;
}

export function CompanionPanel({ star, reply }: CompanionPanelProps) {
  const latestReply = reply ?? star.checkIns[0]?.companionReply;

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="overline" color="secondary.light">
              Companion
            </Typography>
            <Typography variant="h5">
              {latestReply ? latestReply.title : "先做一次 check-in"}
            </Typography>
          </Box>

          {latestReply ? (
            <>
              <Typography variant="body1">{latestReply.message}</Typography>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  我注意到的事
                </Typography>
                <Typography variant="body2">{latestReply.reflection}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  更小、更可靠的下一步
                </Typography>
                <Typography variant="body2">{latestReply.nextStep}</Typography>
              </Box>
            </>
          ) : (
            <Typography variant="body2" color="text.secondary">
              这颗星已经升起来了。现在只差一次真实更新，我们就能开始形成连续的探索轨迹。
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
