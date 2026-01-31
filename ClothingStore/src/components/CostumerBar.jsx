import { Box, Typography, Button, AppBar, Toolbar } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useColorMode } from "../App";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../contexts/AuthContext";

const CostumerBar = ({ setSelectedPage }) => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const { logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Магазин
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
        <Button
          color="inherit"
          onClick={() => {
            setSelectedPage("Каталог");
            location.reload();
          }}
        >
          Каталог
        </Button>
        <Button color="inherit" onClick={() => setSelectedPage("Корзина")}>
          Корзина
        </Button>
        <Button startIcon={<Logout />} color="inherit" onClick={logout}>
          Выход
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default CostumerBar;
