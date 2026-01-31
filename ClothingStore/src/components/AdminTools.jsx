import { Box, Button } from "@mui/material";
import { Delete, Edit, Save, Add } from "@mui/icons-material";

const AdminTools = ({
  editMode,
  deleteMode,
  selectedIds,
  setOpenAddDialog,
  setConfirmAction,
  setOpenConfirmDialog,
  setEditMode,
  setDeleteMode,
}) => {
  return (
    <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => setOpenAddDialog(true)}
      >
        Добавить
      </Button>

      {editMode ? (
        <Button
          variant="contained"
          color="success"
          startIcon={<Save />}
          onClick={() => {
            setConfirmAction("update");
            setOpenConfirmDialog(true);
            saveChanges;
          }}
        >
          Сохранить
        </Button>
      ) : (
        <Button
          variant="outlined"
          startIcon={<Edit />}
          onClick={() => setEditMode(true)}
        >
          Режим правки
        </Button>
      )}

      {deleteMode ? (
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setConfirmAction("delete");
            setOpenConfirmDialog(true);
            deleteSelected;
          }}
        >
          Удалить ({selectedIds.size})
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="error"
          startIcon={<Delete />}
          onClick={() => setDeleteMode(true)}
        >
          Режим удаления
        </Button>
      )}

      {(editMode || deleteMode) && (
        <Button
          onClick={() => {
            setEditMode(false);
            setDeleteMode(false);
          }}
        >
          Отмена
        </Button>
      )}
    </Box>
  );
};

export default AdminTools;
