import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Typography,
  Paper,
  Alert,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchCart, removeFromCart, checkout } from "../api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [status, setStatus] = useState(null);
  const loadCart = async () => {
    const response = await fetchCart();
    setCartItems(response.data);
  };
  useEffect(() => {
    loadCart();
  }, []);
  const handleRemove = async (productId) => {
    await removeFromCart(productId);
    loadCart();
  };
  const handleCheckout = async () => {
    try {
      const response = await checkout();
      setStatus({
        type: "success",
        msg: `Успешно! Списано: ${response.data.totalPaid} ₽`,
      });
      setCartItems([]);
    } catch (error) {
      setStatus({
        type: "error",
        msg: error.response?.data || "Ошибка оплаты",
      });
    }
  };
  const totalSum = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Paper sx={{ p: 3 }}>
        {status && (
          <Alert severity={status.type} sx={{ mb: 2 }}>
            {status.msg}
          </Alert>
        )}
        {cartItems.length === 0 ? (
          <Typography>Корзина пуста</Typography>
        ) : (
          <>
            <List>
              {cartItems.map((item) => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemove(item.productId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={`${item.product.name} (x${item.quantity})`}
                    secondary={`Цена: ${item.product.price * item.quantity} ₽`}
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
              Итого: {totalSum} ₽
            </Typography>
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={handleCheckout}
            >
              Купить
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Cart;
