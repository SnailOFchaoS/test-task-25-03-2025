import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TurnBackButton from '../common/TurnBackButton'
import ImageUploader from "../common/ImageUploader";
import {addProduct, fetchProduct, editProduct, selectProduct, fetchProducts} from "../features/products/productsSlice.js"

import "./index.scss"


const ProductAddPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [exportingCountry, setExportingCountry] = useState('')
  const [productMaterial, setProductMaterial] = useState('')
  const [productDescription, setProductDescription] = useState('')

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(null)

  const product = useSelector(selectProduct)

  const changeProductName = (event) => {
    setProductName(event.target.value)
  }

  useEffect(() => {
    if(id){
      dispatch(fetchProduct(id))
    }
    return ;
  }, [id])

  useEffect(() => {
    if(id && product){
      setProductName(product.name);
      setProductPrice(product.price);
      setExportingCountry(product.country);
      setProductMaterial(product.material);
      setProductDescription(product.description);
      setCurrentImageUrl(product.image);
    }
    return ;
  }, [product])

  const changeProductPrice = (event) => {
    const value = event.target.value;
    let cleanedValue = value.replace(/[^\d.]/g, '');
    const parts = cleanedValue.split('.');
    if (parts.length > 2) {
      cleanedValue = parts.slice(0, -1).join('') + '.' + parts.slice(-1);
    }
    if (cleanedValue.startsWith('.')) {
      cleanedValue = '0' + cleanedValue;
    }
    setProductPrice(cleanedValue);
  }

  const changeExportingCountry = (event) => {
    let newValue = event.target.value.replace(/[^а-яА-Яa-zA-Z]/g, '');
    setExportingCountry(newValue)
  }

  const changeProductMaterial = (event) => {
    setProductMaterial(event.target.value)
  }

  const changeProductDescription = (event) => {
    setProductDescription(event.target.value)
  }

  const isAddable = () => {
    return !loading && productName.length > 0 && productPrice.length > 0;
  }

  const currentRequest = () => {
    if(id && product){
      return dispatch(editProduct({
        productId: id, 
        productData:{name: productName,
          country: exportingCountry,
          price: productPrice,
          description: productDescription,
          material: productMaterial,
          image: imageUrl ? imageUrl : currentImageUrl ? currentImageUrl : '',
      }}))
    }
    return dispatch(addProduct({
      id: crypto.randomUUID(),
      name: productName,
      country: exportingCountry,
      price: productPrice,
      description: productDescription,
      material: productMaterial,
      image: imageUrl ? imageUrl : '',
    }))
  }

  const onAddButtonClicked = () => {
    if(!loading && selectedImage){
      setUploadImage(true)
    }
    else if(!loading && !selectedImage && isAddable())
    {
      currentRequest().then(
        () => dispatch(fetchProducts())).then(() => navigate("/"));
    }
  }

  useEffect(() => {
    if(imageUrl && imageUrl !=="" && isAddable()){
      currentRequest().then(
        () => fetchProducts()).then(() => navigate("/"));
    }
    return ;
  }, [imageUrl])

  return(
    <div className="add-page-main-wrapper">
      <TurnBackButton />
      <div className="main-info-wrapper">
        <div className="image-wrapper">
          <ImageUploader 
            selectedImage = {selectedImage}
            setSelectedImage = {setSelectedImage}
            imageUrl = {imageUrl}
            setImageUrl = {setImageUrl}
            loading = {loading}
            setLoading = {setLoading}
            uploadImage = {uploadImage}
            currentImageUrl = {currentImageUrl}
          />
        </div>
        <div className="main-info-text-wrapper">
          <div className="input-field-name-wrapper">
            <div className="default-text">
              product name <div className="red-text">*</div>
            </div>
            <input 
              type="text" 
              id="productName"
              className="input-one-line"
              value={productName}
              onChange={changeProductName}
            />
          </div>
          <div className="input-field-name-wrapper">
            <div className="default-text">
              product price <div className="red-text">*</div>
            </div>
            <input 
              type="text" 
              id="productPrice"
              className="input-one-line"
              value={productPrice}
              onChange={changeProductPrice}
            />
          </div>
          <div className="input-field-name-wrapper">
            exporting country
            <input 
              type="text" 
              id="productExportingCountry"
              className="input-one-line"
              value={exportingCountry}
              onChange={changeExportingCountry}
            />
          </div>
          <div className="input-field-name-wrapper">
            product material
            <input 
              type="text" 
              id="productMaterial"
              className="input-one-line"
              value={productMaterial}
              onChange={changeProductMaterial}
            />
          </div>
          <div className="input-field-name-wrapper">
            product description
            <textarea 
              type="text" 
              id="productDescription"
              className="description-line"
              value={productDescription}
              onChange={changeProductDescription}
            />
          </div>
          <div 
            className={isAddable() ? "add-product-button" : "disabled-add-product-button"}
            onClick={isAddable() ? onAddButtonClicked : undefined}
          >
            {id ? 'Edit product' : 'Add product'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductAddPage;