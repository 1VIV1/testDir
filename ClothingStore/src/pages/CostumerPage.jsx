import { useState } from "react";
import { Box } from "@mui/material";
import Catalog from "../components/Catalog";
import Cart from "../components/Cart";
import CostumerBar from "../components/CostumerBar";

const CostumerPage = () => {
  const [selectedPage, setSelectedPage] = useState("Каталог");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CostumerBar setSelectedPage={setSelectedPage} />
      {selectedPage === "Каталог" ? <Catalog /> : <Cart />}
    </Box>
  );
};

export default CostumerPage;
