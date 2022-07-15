import React, { useState, useEffect } from "react";
import "./Catalog.css";
import { getProducts, deleteProduct } from "../../utils/firebase";
import CatalogAddForm from "./catalogAddForm/CatalogAddForm";
import CatalogEditForm from "./catalogEditForm/CatalogEditForm";

const initialForm = {
  add: false,
  edit: false,
};

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [catalogForms, setCatalogForms] = useState({ ...initialForm });
  const [editProduct, setEditProduct] = useState({});

  useEffect(() => {
    getProducts().then((response) => setProducts([...response]));
  }, []);

  const openForm = (form, product) => {
    setCatalogForms({ [form]: true });
    if (form === "edit") {
      setEditProduct({ ...product });
    }
  };

  const onDeleteProduct = (id) => {
    deleteProduct(id);
  };

  return (
    <>
      <div className="container catalog_container">
        <ul className="catalog_products-container ">
          {products.map((product) => (
            <li
              
              className="catalog_product-container"
              key={product.id}
            >
              <button
                onClick={() => onDeleteProduct(product.id)}
                className="catalog_delete-btn"
                type="button"
              >
                ×
              </button>
              <div className="productList_image_container">
                <img
                  className="productList_image"
                  alt="sneakers"
                  src={product.catalogImage}
                />
              </div>
              <p className="productList_name_product">
                <span>{product.brand}</span>
                <span>{product.model}</span>
              </p>
              <p className="productList_price_product">{product.price} ₽</p>
              <button type="button" onClick={() => openForm("edit", product)}>Edit Product</button>
            </li>
          ))}
          <li
            onClick={() => openForm("add")}
            className="catalog_addNewProduct-container"
          >
            <p className="catalog_addNewProduct-p">+</p>
          </li>
        </ul>
      </div>
      {catalogForms.add && <CatalogAddForm setCatalogForms={setCatalogForms} />}
      {catalogForms.edit && (
        <CatalogEditForm
          setCatalogForms={setCatalogForms}
          editProduct={editProduct}
        />
      )}
    </>
  );
};

export default Catalog;
