import { Box, Card, Grid } from "@mui/material";
import CartButton from "../components/CartButton";
import { useCart } from "../contexts/CartContext";
import CardInfo from "./CardInfo";

const CostumerProducts = ({ products }) => {
  const { getItemQuantity, addToCartCtx, decreaseInCartCtx } = useCart();
  return (
    <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Card
            sx={{
              p: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
            key={product.id}
          >
            <CardInfo product={product} />
            <CartButton
              quantity={getItemQuantity(product.id)}
              onAdd={() => addToCartCtx(product.id)}
              onRemove={() => decreaseInCartCtx(product.id)}
            />
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default CostumerProducts;
