import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts,
    selectAllProducts,
    selectProductsStatus,
    selectProductsError} from '../../features/products/productsSlice.js';

import ProductPreview from "./ProductPreview";
import "./index.css"

const ProductList = () => {
	const dispatch = useDispatch();
	const [currentProducts, setCurrentProducts] = useState([])
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchProducts());
		}
    if(status === 'succeeded'){
      setCurrentProducts(products)
    }
  }, [status, dispatch]);

	if (status === 'loading') {
    return <p>Loading products...</p>;
  }

  if (status === 'failed') {
    return <p>Server Error</p>;
  }
	
	return (
		<div className="products-main-wrapper">
			{currentProducts.map((product, index) => (
				<ProductPreview 
          key = {product.id}
					product = {product}
					index = {product.id}
				/>
			))}
		</div>
	)
}

export default ProductList;