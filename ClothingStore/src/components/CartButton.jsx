import { Button, Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartButton = ({ quantity, onAdd, onRemove }) => {
  if (quantity === 0) {
    return (
      <Button variant="contained" onClick={onAdd} fullWidth>
        В корзину
      </Button>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #ccc",
        borderRadius: 1,
      }}
    >
      <IconButton size="small" onClick={onRemove}>
        <RemoveIcon />
      </IconButton>
      <Typography sx={{ mx: 2 }}>{quantity}</Typography>
      <IconButton size="small" onClick={onAdd}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default CartButton;
