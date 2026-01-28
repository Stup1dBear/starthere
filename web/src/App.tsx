/**
 * App.tsx - 根组件
 *
 * React 核心概念：组件 (Component)
 * - 组件是 UI 的独立、可复用的单元
 * - 每个组件是一个函数，返回要显示的内容（JSX）
 * - 组件名必须大写开头（区分 HTML 标签）
 *
 * JSX 是什么？
 * - 一种语法糖，让你在 JS 中写类似 HTML 的代码
 * - <div>Hello</div> 会被编译成 React.createElement('div', null, 'Hello')
 * - 文件扩展名 .tsx = TypeScript + JSX
 */

import "./App.css";
import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

// 这是一个函数组件（Function Component）
// 函数名就是组件名，必须大写开头

function App() {
  // 目标列表和输入框状态
  const [goals, setGoals] = useState<string[]>([]);
  const [input, setInput] = useState("");

  // 添加目标
  const handleAddGoal = () => {
    if (input.trim()) {
      setGoals([input.trim(), ...goals]);
      setInput("");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        🌟 StartHere 目标管理
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        记录你的目标，迈出第一步！
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" gap={2}>
            <TextField
              label="新目标"
              variant="outlined"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddGoal();
              }}
            />
            <Button
              variant="contained"
              onClick={handleAddGoal}
              sx={{ minWidth: 100 }}
            >
              添加
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🎯 我的目标
          </Typography>
          {goals.length === 0 ? (
            <Typography color="text.secondary">
              暂无目标，快来添加一个吧！
            </Typography>
          ) : (
            <List>
              {goals.map((goal, idx) => (
                <ListItem key={idx} divider>
                  <ListItemText primary={goal} />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      <Box mt={4} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          🚀 Let's start here, and reach for the stars!
        </Typography>
      </Box>
    </Container>
  );
}

// 导出组件，让其他文件可以 import
export default App;
