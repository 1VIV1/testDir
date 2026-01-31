import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { api } from "../api";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const ModalAdd = ({ openAddDialog, setOpenAddDialog }) => {
  const [newProductsBuffer, setNewProductsBuffer] = useState([]);
  const addNewProductRow = () => {
    setNewProductsBuffer([
      ...newProductsBuffer,
      {
        tempId: Date.now(),
        barcode: "",
        name: "",
        type: "",
        price: 0,
        quantity: 0,
      },
    ]);
  };

  const handleNewProductChange = (tempId, field, value) => {
    setNewProductsBuffer(
      newProductsBuffer.map((p) =>
        p.tempId === tempId ? { ...p, [field]: value } : p,
      ),
    );
  };
  const submitNewProducts = async () => {
    const toSend = newProductsBuffer.map(({ tempId, ...rest }) => rest);
    await api.post("/products/batch", toSend);
    setNewProductsBuffer([]);
    setOpenAddDialog(false);
    loadProducts();
    alert("Товары успешно добавлены!");
  };

  return (
    <Dialog
      open={openAddDialog}
      onClose={() => setOpenAddDialog(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Добавление товаров</DialogTitle>
      <DialogContent>
        <Button
          startIcon={<AddIcon />}
          onClick={addNewProductRow}
          sx={{ mb: 2 }}
        >
          Добавить строку
        </Button>
        {newProductsBuffer.map((np, index) => (
          <Box key={np.tempId} sx={{ display: "flex", gap: 1, mb: 1 }}>
            <TextField
              label="Штрихкод"
              size="small"
              value={np.barcode}
              onChange={(e) =>
                handleNewProductChange(np.tempId, "barcode", e.target.value)
              }
            />
            <TextField
              label="Название"
              size="small"
              value={np.name}
              onChange={(e) =>
                handleNewProductChange(np.tempId, "name", e.target.value)
              }
            />
            <TextField
              label="Тип"
              size="small"
              value={np.type}
              onChange={(e) =>
                handleNewProductChange(np.tempId, "type", e.target.value)
              }
            />
            <TextField
              label="Цвет"
              size="small"
              value={np.color}
              onChange={(e) =>
                handleNewProductChange(np.tempId, "color", e.target.value)
              }
            />
            <TextField
              label="Размер"
              size="small"
              value={np.size}
              onChange={(e) =>
                handleNewProductChange(np.tempId, "size", e.target.value)
              }
            />
            <TextField
              label="Цена"
              size="small"
              type="number"
              value={np.price}
              onChange={(e) =>
                handleNewProductChange(np.tempId, "price", e.target.value)
              }
            />
            <TextField
              label="Кол-во"
              size="small"
              type="number"
              value={np.quantity}
              onChange={(e) =>
                handleNewProductChange(np.tempId, "quantity", e.target.value)
              }
            />
            <IconButton
              color="error"
              onClick={() =>
                setNewProductsBuffer(
                  newProductsBuffer.filter((x) => x.tempId !== np.tempId),
                )
              }
            >
              <CloseIcon />
            </IconButton>
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenAddDialog(false)}>Отмена</Button>
        <Button
          onClick={() => {
            submitNewProducts();
            location.reload();
          }}
          variant="contained"
          disabled={newProductsBuffer.length === 0}
        >
          Добавить всё
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ModalAdd;
