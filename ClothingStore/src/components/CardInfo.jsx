import { Typography } from "@mui/material";

const CardInfo = ({ product }) => {
  return (
    <>
      <Typography variant="caption">#{product.barcode}</Typography>
      <Typography variant="h6">{product.name}</Typography>
      <Typography color="text.secondary">
        {product.type} | {product.color} | {product.size}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Цена: {product.price} ₽
      </Typography>
      <Typography
        variant="body2"
        color={product.quantity > 0 ? "success.main" : "error"}
      >
        В наличии: {product.quantity}
      </Typography>
    </>
  );
};

export default CardInfo;
