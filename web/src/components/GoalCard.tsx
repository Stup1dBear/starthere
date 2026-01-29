import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Collapse,
  LinearProgress,
  Checkbox,
  TextField,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import { Goal } from "../types";
import { useGoalStore } from "../stores/goalStore";

interface GoalCardProps {
  goal: Goal;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Edit Goal State
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [editTitle, setEditTitle] = useState(goal.title);
  const [editDescription, setEditDescription] = useState(
    goal.description || "",
  );

  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const [isEditingMilestone, setIsEditingMilestone] = useState<string | null>(
    null,
  );
  const [editingMilestoneTitle, setEditingMilestoneTitle] = useState("");

  const {
    removeGoal,
    updateGoal,
    toggleGoalStatus,
    addMilestone,
    removeMilestone,
    toggleMilestone,
    updateMilestone,
  } = useGoalStore();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setIsEditingGoal(true);
    setEditTitle(goal.title);
    setEditDescription(goal.description || "");
    handleMenuClose();
    setExpanded(true); // Expand to see description field
  };

  const handleSaveGoal = () => {
    if (editTitle.trim()) {
      updateGoal(goal.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });
      setIsEditingGoal(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingGoal(false);
    setEditTitle(goal.title);
    setEditDescription(goal.description || "");
  };

  const handleDelete = () => {
    removeGoal(goal.id);
    handleMenuClose();
  };

  const handleAddMilestone = () => {
    if (newMilestoneTitle.trim()) {
      addMilestone(goal.id, newMilestoneTitle.trim());
      setNewMilestoneTitle("");
    }
  };

  const handleStartEditMilestone = (id: string, currentTitle: string) => {
    setIsEditingMilestone(id);
    setEditingMilestoneTitle(currentTitle);
  };

  const handleSaveEditMilestone = (id: string) => {
    if (editingMilestoneTitle.trim()) {
      updateMilestone(goal.id, id, editingMilestoneTitle.trim());
      setIsEditingMilestone(null);
    }
  };

  const completedMilestones = goal.milestones.filter(
    (m) => m.isCompleted,
  ).length;
  const totalMilestones = goal.milestones.length;
  const progress =
    totalMilestones === 0 ? 0 : (completedMilestones / totalMilestones) * 100;

  return (
    <Card
      sx={{
        mb: 2,
        position: "relative",
        overflow: "visible",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 0 20px ${goal.color}40`,
        },
        borderLeft: `4px solid ${goal.color}`,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={2} flex={1}>
            <IconButton
              onClick={() => toggleGoalStatus(goal.id)}
              sx={{
                color:
                  goal.status === "completed" ? goal.color : "text.disabled",
                transition: "all 0.3s",
                transform:
                  goal.status === "completed" ? "scale(1.2)" : "scale(1)",
              }}
            >
              <StarIcon fontSize="large" />
            </IconButton>

            {isEditingGoal ? (
              <Box flex={1} display="flex" flexDirection="column" gap={1}>
                <TextField
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  size="small"
                  fullWidth
                  placeholder="星星的名字"
                  autoFocus
                />
                <TextField
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  size="small"
                  fullWidth
                  multiline
                  placeholder="描述..."
                />
                <Box display="flex" gap={1}>
                  <IconButton
                    size="small"
                    onClick={handleSaveGoal}
                    color="primary"
                  >
                    <SaveIcon />
                  </IconButton>
                  <IconButton size="small" onClick={handleCancelEdit}>
                    <CancelIcon />
                  </IconButton>
                </Box>
              </Box>
            ) : (
              <Box
                onClick={() => setExpanded(!expanded)}
                sx={{ cursor: "pointer", flex: 1 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textDecoration:
                      goal.status === "completed" ? "line-through" : "none",
                    color:
                      goal.status === "completed"
                        ? "text.secondary"
                        : "text.primary",
                  }}
                >
                  {goal.title}
                </Typography>
                {goal.description && (
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {goal.description}
                  </Typography>
                )}
              </Box>
            )}
          </Box>

          <Box display="flex" alignItems="center">
            {totalMilestones > 0 && !isEditingGoal && (
              <Box mr={2} display="flex" alignItems="center" gap={1}>
                <Chip
                  label={`${Math.round(progress)}%`}
                  size="small"
                  sx={{
                    bgcolor: `${goal.color}20`,
                    color: goal.color,
                    fontWeight: "bold",
                  }}
                />
              </Box>
            )}
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditClick}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            重塑星体 (编辑)
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            销毁这颗星 (删除)
          </MenuItem>
        </Menu>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box mt={2}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                mb: 2,
                height: 6,
                borderRadius: 3,
                bgcolor: "rgba(255,255,255,0.1)",
                "& .MuiLinearProgress-bar": {
                  bgcolor: goal.color,
                },
              }}
            />

            <Box display="flex" flexDirection="column" gap={1}>
              {goal.milestones.map((milestone) => (
                <Box
                  key={milestone.id}
                  display="flex"
                  alignItems="center"
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: "rgba(255,255,255,0.03)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
                  }}
                >
                  <Checkbox
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon sx={{ color: goal.color }} />}
                    checked={milestone.isCompleted}
                    onChange={() => toggleMilestone(goal.id, milestone.id)}
                  />

                  {isEditingMilestone === milestone.id ? (
                    <TextField
                      value={editingMilestoneTitle}
                      onChange={(e) => setEditingMilestoneTitle(e.target.value)}
                      onBlur={() => handleSaveEditMilestone(milestone.id)}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        handleSaveEditMilestone(milestone.id)
                      }
                      fullWidth
                      size="small"
                      autoFocus
                    />
                  ) : (
                    <Typography
                      sx={{
                        flex: 1,
                        textDecoration: milestone.isCompleted
                          ? "line-through"
                          : "none",
                        color: milestone.isCompleted
                          ? "text.secondary"
                          : "text.primary",
                        cursor: "text",
                      }}
                      onClick={() =>
                        handleStartEditMilestone(milestone.id, milestone.title)
                      }
                    >
                      {milestone.title}
                    </Typography>
                  )}

                  <IconButton
                    size="small"
                    onClick={() => removeMilestone(goal.id, milestone.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}

              <Box display="flex" alignItems="center" mt={1} gap={1}>
                <TextField
                  placeholder="添加新里程碑..."
                  size="small"
                  fullWidth
                  value={newMilestoneTitle}
                  onChange={(e) => setNewMilestoneTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddMilestone()}
                />
                <IconButton onClick={handleAddMilestone} color="primary">
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default GoalCard;
