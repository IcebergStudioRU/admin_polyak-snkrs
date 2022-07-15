import React, { useState } from "react";
import "./CatalogEditForm.css";
import { addProduct, deleteProduct } from "../../../utils/firebase";

const CatalogEditForm = ({ editProduct, setCatalogForms }) => {
  const [formState, setFormState] = useState(editProduct);
  const [imagesInputNumber, setImagesInputNumber] = useState([0]);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    deleteProduct(editProduct.id);
    addProduct(formState);
  };

  const onHandleChange = (e) => {
    const { value, name } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    console.log(formState);
  };

  const onHandleChangeImage = (e) => {
    const { value, id } = e.target;
    setFormState((prev) => {
      const newImages = [...prev.images];
      newImages[id] = value;
      return { ...prev, images: newImages };
    });
  };

  const onModalBack = () => {
    setCatalogForms({
      add: false,
      edit: false,
    });
  };

  const addImageInput = () => {
    setImagesInputNumber((prev) => [...prev, prev.length]);
  };

  const deleteImageInput = () => {
    if (imagesInputNumber.length > 1) {
      setImagesInputNumber((prev) => [...prev.slice(0, -1)]);
    }
  };
  return (
    <div className="catalogAddForm_overlay">
      <div className="container catalogAddForm_container">
        <button
          onClick={onModalBack}
          className="catalogAddForm_backBtn"
          type="button"
        >
          ❮ Назад
        </button>
        <form className="catalogAddForm_form" onSubmit={onHandleSubmit}>
          <label className="catalogAddForm_label" htmlFor="name">
            Name:
            <input
              className="catalogAddForm_input"
              onChange={onHandleChange}
              value={formState.name}
              name="name"
              type="text"
              required
            />
          </label>
          <label className="catalogAddForm_label" htmlFor="brand">
            Brand:
            <input
              className="catalogAddForm_input"
              onChange={onHandleChange}
              value={formState.brand}
              name="brand"
              type="text"
              required
            />
          </label>
          <label className="catalogAddForm_label" htmlFor="model">
            Model:
            <input
              className="catalogAddForm_input"
              onChange={onHandleChange}
              value={formState.model}
              name="model"
              type="text"
              required
            />
          </label>
          <label className="catalogAddForm_label" htmlFor="price">
            Price:
            <input
              className="catalogAddForm_input"
              onChange={onHandleChange}
              value={formState.price}
              name="price"
              type="number"
              required
            />
          </label>
          <label className="catalogAddForm_label" htmlFor="catalogImage">
            Catalog Image:
            <input
              className="catalogAddForm_input"
              onChange={onHandleChange}
              value={formState.catalogImage}
              name="catalogImage"
              type="text"
            />
          </label>
          {imagesInputNumber.map((number) => (
            <>
              <label className="catalogAddForm_label" htmlFor="images">
                Images:
                <input
                  className="catalogAddForm_input"
                  id={number}
                  onChange={onHandleChangeImage}
                  value={formState.images[number]}
                  name="images"
                  type="text"
                  required
                />
              </label>
            </>
          ))}

          <button
            className="catalogAddForm_button"
            onClick={addImageInput}
            type="button"
          >
            Добавить еще одно изображение
          </button>
          <button
            className="catalogAddForm_button"
            onClick={deleteImageInput}
            type="button"
          >
            Удалить поле ввода для изображения
          </button>

          <label className="catalogAddForm_label" htmlFor="description">
            Описание товара
            <textarea
              className="catalogAddForm_textarea"
              onChange={onHandleChange}
              placeholder="Введите описание товара"
              name="description"
              value={formState.description}
              required
            ></textarea>
          </label>
          <button className="catalogAddForm_button" type="submit">
            Edit product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CatalogEditForm;
