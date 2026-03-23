import { useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useStarMapStore } from "../stores/starMapStore";

interface CreateStarDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateStarDialog({ open, onClose }: CreateStarDialogProps) {
  const createStar = useStarMapStore((state) => state.createStar);
  const [title, setTitle] = useState("");
  const [vision, setVision] = useState("");
  const [whyItMatters, setWhyItMatters] = useState("");
  const [currentState, setCurrentState] = useState("");

  const isDisabled = useMemo(
    () =>
      !title.trim() ||
      !vision.trim() ||
      !whyItMatters.trim() ||
      !currentState.trim(),
    [currentState, title, vision, whyItMatters],
  );

  const handleClose = () => {
    setTitle("");
    setVision("");
    setWhyItMatters("");
    setCurrentState("");
    onClose();
  };

  const handleSubmit = () => {
    if (isDisabled) {
      return;
    }

    createStar({
      title,
      vision,
      whyItMatters,
      currentState,
    });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
        },
      }}
    >
      <DialogTitle>点亮一颗新的星</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            第一版不做复杂规划。我们只把这颗星为什么重要、你现在在哪里，先说清楚。
          </Typography>
          <TextField
            label="这颗星叫什么"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="比如：把 StartHere 做成一个真的会陪人返回的产品"
            autoFocus
            fullWidth
          />
          <TextField
            label="你想抵达什么样的画面"
            value={vision}
            onChange={(event) => setVision(event.target.value)}
            multiline
            minRows={2}
            fullWidth
          />
          <TextField
            label="为什么它对你重要"
            value={whyItMatters}
            onChange={(event) => setWhyItMatters(event.target.value)}
            multiline
            minRows={2}
            fullWidth
          />
          <TextField
            label="你现在的真实状态"
            value={currentState}
            onChange={(event) => setCurrentState(event.target.value)}
            multiline
            minRows={3}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} color="inherit">
          先放一放
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={isDisabled}>
          升起这颗星
        </Button>
      </DialogActions>
    </Dialog>
  );
}
