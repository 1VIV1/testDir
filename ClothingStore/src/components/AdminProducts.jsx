import { Box, Grid, Card, TextField, Checkbox } from "@mui/material";
import CardInfo from "../components/CardInfo";

const AdminProducts = ({
  products,
  deleteMode,
  editMode,
  selectedIds,
  setSelectedIds,
  editedProducts,
  setEditedProducts,
}) => {
  const handleEditChange = (id, field, value) => {
    const product = editedProducts[id] || products.find((p) => p.id === id);
    setEditedProducts({
      ...editedProducts,
      [id]: { ...product, [field]: value },
    });
  };

  const toggleSelect = (id) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  return (
    <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
      <Grid container spacing={2}>
        {products.map((product) => {
          const currentData = editedProducts[product.id] || product;
          return (
            <Card
              sx={{
                p: 2,
                height: "100%",
                gap: 0.5,
                border:
                  deleteMode && selectedIds.has(product.id)
                    ? "2px solid red"
                    : "1px solid #444",
                bgcolor: "background.paper",
                color: "text.primary",
              }}
              key={product.id}
            >
              {deleteMode && (
                <Checkbox
                  checked={selectedIds.has(product.id)}
                  onChange={() => {
                    toggleSelect(product.id);
                  }}
                />
              )}

              {editMode ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                  }}
                >
                  <TextField
                    label="Штрихкод"
                    size="small"
                    value={currentData.barcode}
                    onChange={(e) =>
                      handleEditChange(product.id, "barcode", e.target.value)
                    }
                  />
                  <TextField
                    label="Название"
                    size="small"
                    value={currentData.name}
                    onChange={(e) =>
                      handleEditChange(product.id, "name", e.target.value)
                    }
                  />
                  <TextField
                    label="Тип"
                    size="small"
                    value={currentData.type}
                    onChange={(e) =>
                      handleEditChange(product.id, "type", e.target.value)
                    }
                  />
                  <TextField
                    label="Цвет"
                    size="small"
                    value={currentData.color}
                    onChange={(e) =>
                      handleEditChange(product.id, "color", e.target.value)
                    }
                  />
                  <TextField
                    label="Размер"
                    size="small"
                    value={currentData.size}
                    onChange={(e) =>
                      handleEditChange(product.id, "size", e.target.value)
                    }
                  />
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <TextField
                      label="Цена"
                      type="number"
                      size="small"
                      value={currentData.price}
                      onChange={(e) =>
                        handleEditChange(product.id, "price", e.target.value)
                      }
                    />
                    <TextField
                      label="Остаток"
                      type="number"
                      size="small"
                      value={currentData.quantity}
                      onChange={(e) =>
                        handleEditChange(product.id, "quantity", e.target.value)
                      }
                    />
                  </Box>
                </Box>
              ) : (
                <CardInfo product={product} />
              )}
            </Card>
          );
        })}
      </Grid>
    </Box>
  );
};
export default AdminProducts;
