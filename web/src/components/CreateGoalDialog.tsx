import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useGoalStore } from "../stores/goalStore";

interface CreateGoalDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateGoalDialog: React.FC<CreateGoalDialogProps> = ({
  open,
  onClose,
}) => {
  const addGoal = useGoalStore((state) => state.addGoal);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newMilestone, setNewMilestone] = useState("");
  const [milestones, setMilestones] = useState<string[]>([]);

  const handleAddMilestone = () => {
    if (newMilestone.trim()) {
      setMilestones([...milestones, newMilestone.trim()]);
      setNewMilestone("");
    }
  };

  const handleRemoveMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (title.trim()) {
      addGoal(title.trim(), description.trim(), milestones);
      handleClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setMilestones([]);
    setNewMilestone("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>✨ 发现一颗新星</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="星星的名字 (目标)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            autoFocus
          />
          <TextField
            label="星体描述 (备注)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={2}
          />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              规划轨道 (里程碑)
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                label="添加里程碑"
                value={newMilestone}
                onChange={(e) => setNewMilestone(e.target.value)}
                fullWidth
                size="small"
                onKeyDown={(e) => e.key === "Enter" && handleAddMilestone()}
              />
              <Button variant="outlined" onClick={handleAddMilestone}>
                <AddIcon />
              </Button>
            </Box>

            <List dense sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
              {milestones.map((m, index) => (
                <ListItem key={index}>
                  <ListItemText primary={m} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveMilestone(index)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              {milestones.length === 0 && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ p: 2 }}
                >
                  暂无里程碑，可以在此添加步骤...
                </Typography>
              )}
            </List>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!title.trim()}
        >
          点亮星星
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGoalDialog;
