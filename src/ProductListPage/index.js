import React, {useState, useEffect, createContext} from "react";
import { useSelector, useDispatch } from 'react-redux';

import { fetchProducts, selectAllProducts} from '../features/products/productsSlice.js';
import ProductList from "./ProductList";
import ProductListMenu from "./ProductListMenu"
import "./index.css"

const ProductListPage = () => {
  const dispatch = useDispatch()
  const [showLiked, setShowLiked] = useState(false);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState(()=> {
    const localData = localStorage.getItem('likedProducts')
    return localData ? JSON.parse(localData) : [];
  })
  const products = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(()=> {
    if(showLiked){
      return setCurrentProducts(products.filter(product => likedProducts.includes(product.id)))
    }
    return setCurrentProducts(products)
  }, [products])

  useEffect(()=> {
    dispatch(fetchProducts())
  }, [showLiked])

  useEffect(() => {
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
  }, [likedProducts]);

  return(
    <ProductListPageContext.Provider value={{
      showLiked, setShowLiked, 
      currentProducts, setCurrentProducts,
      likedProducts, setLikedProducts
    }}>
      <div className="page-wrapper">
        <ProductListMenu />
        <ProductList/>
      </div>
    </ProductListPageContext.Provider>
  );
}

export const ProductListPageContext = createContext();
export default ProductListPage;