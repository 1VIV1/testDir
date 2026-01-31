import { useEffect, useState } from "react";
import { api } from "../api";
import { Box } from "@mui/material";
import Categories from "./Categories";
import CostumerProducts from "./CostumerProducts";

const Catalog = () => {
  const [selectedCat, setSelectedCat] = useState("Все");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["Все"]);

  const fetchData = async () => {
    const typesRes = await api.get("/products/types");
    setCategories(["Все", ...typesRes.data]);
    const filter = selectedCat === "Все" ? "" : selectedCat;
    const prodRes = await api.get(`/products/report?type=${filter}`);
    setProducts(prodRes.data);
  };
  useEffect(() => {
    fetchData();
  }, [selectedCat]);

  return (
    <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
      <Categories
        categories={categories}
        selectedCat={selectedCat}
        setSelectedCat={setSelectedCat}
      />
      <CostumerProducts products={products} />
    </Box>
  );
};

export default Catalog;
