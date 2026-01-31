import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
const Categories = ({ categories, selectedCat, setSelectedCat }) => {
  return (
    <Paper
      square
      sx={{ width: 250, borderRight: "1px solid #444", overflowY: "auto" }}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        Категории
      </Typography>
      <List>
        {categories.map((cat) => (
          <ListItem key={cat} disablePadding>
            <ListItemButton
              selected={selectedCat === cat}
              onClick={() => setSelectedCat(cat)}
            >
              <ListItemText primary={cat} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Categories;
