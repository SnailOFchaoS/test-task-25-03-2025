import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';

import { fetchProduct, selectProduct, selectProductsStatus} from '../features/products/productsSlice.js';
import { ReactComponent as ImagePlaceholder } from '../assets/image-placeholder.svg';
import { ReactComponent as LikeImage } from '../assets/like.svg';
import { ReactComponent as EditImage } from '../assets/edit.svg';
import TurnBackButton from '../common/TurnBackButton'

import "./index.scss"

const ProductPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const dispatch = useDispatch()
  const product = useSelector(selectProduct);
  const status = useSelector(selectProductsStatus);
  const [imageError, setImageError] = useState(false);
  const editButtonRef = useRef()
  const isLiked = JSON.parse(localStorage.getItem('likedProducts').includes(id))

  useEffect(() => {
    dispatch(fetchProduct(id))
  }, [])

  const checkImage = () => {
    setImageError(true)
  }

  const onEditButtonMouseEnter = () => {
    if(!editButtonRef.current)
      return ;

    editButtonRef.current.querySelectorAll('.photo-image *').forEach(path => {
      if (path.hasAttribute('stroke')) {
        path.style.stroke = 'aqua';
      }
    });
  }

  const onEditButtonMouseLeave = () => {
    if(!editButtonRef.current)
      return ;

    editButtonRef.current.querySelectorAll('.photo-image *').forEach(path => {
      if (path.hasAttribute('stroke')) {
        path.style.stroke = 'black';
      }
    });
  }

  const onEditButtonCliked = () => {
    navigate(`/products/edit/${id}`)
  }

  if(status === 'loading'){
    return (<p>Loading product...</p>)
  }

  return(
    <div className="page-main-wrapper">
      <div className="product-name-text">
        <div className="turn-back-button-wrapper">
          <TurnBackButton />
        </div>
        {product?.name}
        {isLiked ? (
          <div className="like-image-wrapper">
            <LikeImage className="photo-image"/>
          </div>) : (<></>)}
        <div 
          className="edit-image-wrapper"
          ref = {editButtonRef}
          onMouseEnter={onEditButtonMouseEnter}
          onMouseLeave={onEditButtonMouseLeave}
          onClick={onEditButtonCliked}
        >
          <EditImage 
            className="photo-image"/>
        </div>
      </div>
      <div className="main-info-wrapper">
        <div className="image-wrapper">
          {imageError ? (
            <ImagePlaceholder className="photo-image"/>
          ) : (
            <img src = {product?.image}
              alt={product?.name} 
              onError={checkImage}
              className="photo-image"
            />
          )}
        </div>
        <div className="main-info-text-wrapper">
          <span className="price-text">{product?.price} $</span>
          <div className="country-info-wrapper">
            exporting country: 
            <span className="country-info-text">{product?.country}</span>
          </div>
          <div className="material-info-wrapper">
            material: 
            <span className="material-info-text">{product?.material}</span>
          </div>
        </div>
      </div>
      <div className="description-text-wrapper">
        <span className="description-info-text"> {product?.description} </span>
      </div>
    </div>
  )
}

export default ProductPage;