import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { CheckInSignal, Star, StarMood } from "../types";
import { useStarMapStore } from "../stores/starMapStore";

const moodOptions: Array<{ value: StarMood; label: string }> = [
  { value: "clear", label: "清晰" },
  { value: "hopeful", label: "有希望" },
  { value: "foggy", label: "有点雾" },
  { value: "stuck", label: "卡住了" },
  { value: "tired", label: "有点累" },
  { value: "energized", label: "有推进感" },
];

const signalOptions: Array<{ value: CheckInSignal; label: string }> = [
  { value: "progress", label: "我推进了一点" },
  { value: "blocked", label: "我被卡住了" },
  { value: "drift", label: "我偏离了一阵子" },
  { value: "returning", label: "我准备回来" },
];

interface CheckInComposerProps {
  star: Star;
}

export function CheckInComposer({ star }: CheckInComposerProps) {
  const submitCheckIn = useStarMapStore((state) => state.submitCheckIn);
  const [mood, setMood] = useState<StarMood>("hopeful");
  const [signal, setSignal] = useState<CheckInSignal>("returning");
  const [update, setUpdate] = useState("");
  const [blocker, setBlocker] = useState("");

  const isDisabled = useMemo(() => !update.trim(), [update]);

  const handleSubmit = async () => {
    if (isDisabled) {
      return;
    }

    const submitted = await submitCheckIn({
      starId: star.id,
      mood,
      signal,
      update,
      blocker,
    });
    if (submitted) {
      setUpdate("");
      setBlocker("");
      setSignal("progress");
      setMood("clear");
    }
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2.5}>
          <Box>
            <Typography variant="overline" color="primary.light">
              Daily Check-in
            </Typography>
            <Typography variant="h5">告诉我，这颗星最近发生了什么</Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              你现在更像是哪种状态
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {signalOptions.map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  color={signal === option.value ? "primary" : "default"}
                  onClick={() => setSignal(option.value)}
                  variant={signal === option.value ? "filled" : "outlined"}
                />
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              此刻的感受
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {moodOptions.map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  color={mood === option.value ? "secondary" : "default"}
                  onClick={() => setMood(option.value)}
                  variant={mood === option.value ? "filled" : "outlined"}
                />
              ))}
            </Stack>
          </Box>

          <TextField
            label="这次更新"
            multiline
            minRows={4}
            value={update}
            onChange={(event) => setUpdate(event.target.value)}
            placeholder="最近推进了什么，或者你停在哪一步了？"
            fullWidth
          />

          <TextField
            label="真正的阻力"
            multiline
            minRows={2}
            value={blocker}
            onChange={(event) => setBlocker(event.target.value)}
            placeholder="如果有个地方一直让你绕不过去，把它说小一点。"
            fullWidth
          />

          <Button
            variant="contained"
            size="large"
            onClick={() => void handleSubmit()}
            disabled={isDisabled}
          >
            记录这次探索
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
