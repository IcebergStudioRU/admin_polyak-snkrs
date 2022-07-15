import React, { useState } from "react";
import Catalog from "./catalog/Catalog";
import Header from "./header/Header";

const App = () => {
  const [page, setPage] = useState("catalog");

  return (
    <>
      <Header />
      <Catalog />
    </>
  );
};

export default App;
