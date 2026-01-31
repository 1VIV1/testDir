import { Box, Typography, Button, AppBar, Toolbar } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useColorMode } from "../App";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../contexts/AuthContext";

const AdminBar = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const { logout } = useAuth();
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Панель Администратора
        </Typography>
        <Box>
          <IconButton onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
        <Button startIcon={<Logout />} color="inherit" onClick={logout}>
          Выход
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminBar;
