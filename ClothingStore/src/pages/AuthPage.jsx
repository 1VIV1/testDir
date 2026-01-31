import { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useColorMode } from "../App";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Buyer");

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  const handleCloseNotify = () =>
    setNotification({ ...notification, open: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setNotification({
        open: true,
        message: "Заполните все поля",
        severity: "warning",
      });
      return;
    }

    let success;

    if (isLogin) {
      success = await login(email, password);
      if (success) {
        navigate("/");
      } else {
        setNotification({
          open: true,
          message: "Неверный логин или пароль",
          severity: "error",
        });
      }
    } else {
      success = await register(email, password, role);

      if (success) {
        setNotification({
          open: true,
          message: "Регистрация успешна! Входим...",
          severity: "success",
        });
        setTimeout(() => navigate("/"), 1000);
      } else {
        setNotification({
          open: true,
          message: "Ошибка регистрации (возможно email занят)",
          severity: "error",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        bgcolor: "background.default",
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <IconButton onClick={toggleColorMode} color="inherit">
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>

      <Paper elevation={6} sx={{ p: 4, width: 450, borderRadius: 2 }}>
        <Tabs
          value={isLogin ? 0 : 1}
          onChange={(_, v) => setIsLogin(v === 0)}
          centered
          sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Вход" />
          <Tab label="Регистрация" />
        </Tabs>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isLogin && (
            <FormControl component="fieldset" sx={{ mt: 1 }}>
              <FormLabel component="legend">Выберите роль:</FormLabel>
              <RadioGroup
                row
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <FormControlLabel
                  value="Buyer"
                  control={<Radio />}
                  label="Покупатель"
                />
                <FormControlLabel
                  value="Admin"
                  control={<Radio color="error" />}
                  label="Администратор"
                />
              </RadioGroup>
            </FormControl>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ py: 1.5, fontSize: "1rem" }}
          >
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotify}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotify}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AuthPage;
