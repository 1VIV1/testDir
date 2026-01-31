import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { api } from "../api";
import Categories from "../components/Categories";
import AdminBar from "../components/AdminBar";
import AdminTools from "../components/AdminTools";
import ModalConfirm from "../components/ModalConfirm";
import ModalAdd from "../components/ModalAdd";
import AdminProducts from "../components/AdminProducts";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["Все"]);
  const [selectedCat, setSelectedCat] = useState("Все");
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [editedProducts, setEditedProducts] = useState({});
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const loadData = async () => {
    const typesRes = await api.get("/products/types");
    setCategories(["Все", ...typesRes.data]);
    const filter = selectedCat === "Все" ? "" : selectedCat;
    const res = await api.get(`/products/report?type=${filter}`);
    setProducts(res.data);
  };
  useEffect(() => {
    loadData();
  }, [selectedCat]);

  const loadProducts = async () => {
    const res = await api.get("/products/report");
    setProducts(res.data);
  };
  useEffect(() => {
    loadProducts();
  }, []);

  const saveChanges = async () => {
    const productsToUpdate = Object.values(editedProducts);
    if (productsToUpdate.length === 0) return;
    await api.put("/products/batch-update", productsToUpdate);
    setEditMode(false);
    setEditedProducts({});
    loadProducts();
    setOpenConfirmDialog(false);
    location.reload();
  };

  const deleteSelected = async () => {
    await api.post("/products/batch-delete", Array.from(selectedIds));
    setDeleteMode(false);
    setSelectedIds(new Set());
    loadProducts();
    setOpenConfirmDialog(false);
    location.reload();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AdminBar />
      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        <Categories
          categories={categories}
          selectedCat={selectedCat}
          setSelectedCat={setSelectedCat}
        />
        <Box
          sx={{ flexGrow: 1, p: 2, display: "flex", flexDirection: "column" }}
        >
          <AdminTools
            editMode={editMode}
            deleteMode={deleteMode}
            selectedIds={selectedIds}
            setOpenAddDialog={setOpenAddDialog}
            setConfirmAction={setConfirmAction}
            setOpenConfirmDialog={setOpenConfirmDialog}
            setEditMode={setEditMode}
            setDeleteMode={setDeleteMode}
          />
          <AdminProducts
            products={products}
            deleteMode={deleteMode}
            editMode={editMode}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            editedProducts={editedProducts}
            setEditedProducts={setEditedProducts}
          />
        </Box>
      </Box>

      <ModalConfirm
        openConfirmDialog={openConfirmDialog}
        setOpenConfirmDialog={setOpenConfirmDialog}
        confirmAction={confirmAction}
        deleteSelected={deleteSelected}
        saveChanges={saveChanges}
      />

      <ModalAdd
        openAddDialog={openAddDialog}
        setOpenAddDialog={setOpenAddDialog}
      />
    </Box>
  );
};

export default AdminPage;
