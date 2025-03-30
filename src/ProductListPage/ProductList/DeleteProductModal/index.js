import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import ModalWindow from "../../../common/ModalWindow";
import {ProductPreviewContext} from "../ProductPreview"
import { deleteProduct, fetchProducts, selectProductsStatus } from '../../../features/products/productsSlice';
import "./index.scss"

const DeleteProductModal = ({}) => {
  const dispatch = useDispatch();
  const {product, isModalOpen, closeModal} = useContext(ProductPreviewContext);
  const [likedProducts, setLikedProducts] = useState(()=> {
    const localData = localStorage.getItem('likedProducts')
    return localData ? JSON.parse(localData) : [];
  })
  const status = useSelector(selectProductsStatus)

  const onDeleteButtonClicked = () => {
    dispatch(deleteProduct(product.id))
    .then(() => dispatch(fetchProducts()))
    .then(() => {
      const newArray = likedProducts.filter(likedProduct => likedProduct !== product.id)
      localStorage.setItem('likedProducts', JSON.stringify(newArray));
      closeModal();
    });
  }

  return (
    <ModalWindow isOpen={isModalOpen} onClose={closeModal}>
      <div className='delete-modal'>
        <div className="name-text-font">
          Are you sure, you want to delete product "{product.name}"
        </div>
        <div 
          className={status === 'loading' ? 'disabled-delete-product-button' : 'delete-product-button'}
          onClick={onDeleteButtonClicked}
        >
          Delete product
        </div>
      </div>
      
    </ModalWindow>
  )
}

export default DeleteProductModal;