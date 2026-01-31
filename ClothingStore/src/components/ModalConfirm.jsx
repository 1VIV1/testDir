import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const ModalConfirm = ({
  openConfirmDialog,
  setOpenConfirmDialog,
  confirmAction,
  deleteSelected,
  saveChanges,
}) => {
  return (
    <Dialog
      open={openConfirmDialog}
      onClose={() => setOpenConfirmDialog(false)}
    >
      <DialogTitle>Подтверждение действия</DialogTitle>
      <DialogContent>
        Вы уверены, что хотите{" "}
        {confirmAction === "delete"
          ? "удалить выбранные товары"
          : "сохранить изменения"}
        ?
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenConfirmDialog(false)}>Нет</Button>
        <Button
          onClick={confirmAction === "delete" ? deleteSelected : saveChanges}
          autoFocus
        >
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirm;
