import React, {useContext, useState} from "react";
import { useSelector } from 'react-redux';
import {selectProductsStatus } from '../../features/products/productsSlice.js';

import ProductPreview from "./ProductPreview";
import {ProductListPageContext} from "../index.js"
import "./index.scss"

const ProductList = () => {
  const status = useSelector(selectProductsStatus);
  const [checkIsModalOpen, setCheckIsModalOpen] = useState(false);

  const {currentProducts} = useContext(ProductListPageContext)

	if (status === 'loading') {
    return <p>Loading products...</p>;
  }

  if (status === 'failed') {
    return <p>Server Error</p>;
  }
	return (
		<div className={`products-main-wrapper ${checkIsModalOpen ? 'modal-is-opened' : ''}`}>
			{currentProducts.map((product) => (
				<ProductPreview 
          key = {product.id}
					product = {product}
          setCheckIsModalOpen = {setCheckIsModalOpen}
				/>
			))}
		</div>
	)
}

export default ProductList;