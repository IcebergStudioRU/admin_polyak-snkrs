import React, { useState } from "react";
import {
  addProduct,
  addProductPhoto,
  deleteProductPhoto,
} from "../../../utils/firebase";
import "./CatalogAddForm.css";

const initialState = {
  name: "",
  brand: "",
  model: "",
  price: "",
  catalogImage: "",
  images: [""],
  description: "",
};

const CatalogAddForm = ({ setCatalogForms }) => {
  const [formState, setFormState] = useState(initialState);
  const [imagesInputNumber, setImagesInputNumber] = useState([0]);
  const [imageUpload, setImageUpload] = useState([""]);
  const [fileReader, setFileReader] = useState([""]);
  // console.log(fileReader);
  // console.log(imageUpload);
  console.log(formState);

  const uploadImage = (e) => {
    if (
      imageUpload === null ||
      formState.brand === "" ||
      formState.model === ""
    )
      return alert("Заполните все поля");
    const uploadImageNumber = e.target.id;
    if (formState.images[uploadImageNumber] === "") {
      addProductPhoto(formState, imageUpload, uploadImageNumber).then(
        (response) => {
          setFormState((prev) => {
            const newImages = [...prev.images];
            newImages[uploadImageNumber] = response;
            return { ...prev, images: newImages };
          });
        }
      );
    }
    if (formState.images[uploadImageNumber] !== "") {
      deleteProductPhoto(formState, imageUpload[uploadImageNumber]);
      setFormState((prev) => {
        const newImages = [...prev.images];
        newImages[uploadImageNumber] = "";
        return { ...prev, images: newImages };
      });
    }
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    addProduct({ ...formState, price: parseInt(formState.price, 0) });
    // setFormState({ ...initialState,  });
    // setImagesInputNumber([]);
    // setImagesInputNumber([0])
    // setFileReader([""])
    // setImageUpload([""])
    // window.location.reload(false)
    alert("Товар успешно добавлен");
    onModalBack();
  };

  const onHandleChange = (e) => {
    const { value, name } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const onModalBack = () => {
    setCatalogForms({
      add: false,
      edit: false,
    });
  };
  const stylee = {}
  const onInputUpload = (e) => {
    const file = e.target.files[0];
    const number = e.target.id;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileReader((prev) => {
        const newImages = [...prev];
        newImages[number] = reader.result;
        return newImages;
      });
    };
    setImageUpload((prev) => {
      const newImages = [...prev];
      newImages[number] = file;
      return newImages;
    });
  };

  const addImageInput = () => {
    setImagesInputNumber((prev) => [...prev, prev.length]);
    setFileReader((prev) => [...prev, ""]);
    setImageUpload((prev) => [...prev, ""]);
    setFormState((prev) => {
      const newImages = [...prev.images, ""];
      return { ...prev, images: newImages };
    });
  };

  const deleteImageInput = () => {
    if (imagesInputNumber.length > 1) {
      setImagesInputNumber((prev) => [...prev.slice(0, -1)]);
      setImageUpload((prev) => [...prev.slice(0, -1)]);
      setFileReader((prev) => [...prev.slice(0, -1)]);
      setFormState((prev) => {
        const newImages = [...prev.images.slice(0, -1)];
        return { ...prev, images: newImages };
      });
    }
    deleteProductPhoto(formState, imageUpload[imageUpload.length - 1]);
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
              required
            />
          </label>
          {imagesInputNumber.map((number) => (
          <div className="catalogAddForm_container">
            
              <input
                id={number}
                type="file"
                onChange={onInputUpload}
                required
                name="file"
                className="catalogAddForm_file-input"/>
              <button id={number} type="button" onClick={uploadImage} className="catalogAddForm_addedInData-btn">
                {formState.images[number]
                  ? "Удалить из хранилища"
                  : "Добавить в хранилище"}
              </button>
              <img src={fileReader[number]} alt="" className="catalogAddForm_product-img"/>
              </div>
          ))}

          <button
            className="catalogAddForm_button"
            onClick={addImageInput}
            type="button"
          >
            Добавить изображение
          </button>
          <button
            className="catalogAddForm_button"
            onClick={deleteImageInput}
            type="button"
          >
            Отменить добавление
          </button>

          <label className="catalogAddForm_label" for="description">
            <span className="catalogAddFrom_descriptionTitle">Описание товара</span>
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
            Add a new product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CatalogAddForm;
// <label
//   key={number}
//   className="catalogAddForm_label"
//   htmlFor="images"
// >
//   Images:
//   <input
//     className="catalogAddForm_input"
//     id={number}
//     onChange={onHandleChangeImage}
//     value={formState.images[number]}
//     name="images"
//     type="text"
//     required
//   />
// </label>

// const onHandleChangeImage = (e) => {
//   const { value, id } = e.target;
//   setFormState((prev) => {
//     const newImages = [...prev.images];
//     newImages[id] = value;
//     return { ...prev, images: newImages };
//   });
// };
