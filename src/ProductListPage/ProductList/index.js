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
			console.log("products:", products)
			setCurrentProducts(products)
			dispatch(fetchProducts());
		}
		if(status === 'failed'){
			setCurrentProducts([{
				id: 1,
				title: "Ботинки мужские почти не ношенные",
				price: 9.99,
				description: "Продаю обувь, мужскую, использовались всего пару раз, на свадьбу и на похороны, владельцу больше не нужны",
				category: "closes",
				image: 'https://i.postimg.cc/1tFFBT0G/image.png'
			},{
				id: 2,
				title: "Шляпа",
				price: 14.88,
				description: "Кар раз",
				category: "closes",
				image: null,
			},{
				id: 3,
				title: "Жигули",
				price: 2025,
				description: `семейство советских и российских легковых автомобилей малого 
					класса Волжского автомобильного завода («АвтоВАЗ»), созданных на базе итальянского 
					автомобиля Fiat 124`,
				category: "card",
				image: null,
			},{
				id: 4,
				title: "Гараж",
				price: 200000,
				description: "Продам гараж 8 800 555 3535",
				category: "real estate",
				image: null
			}])
		}
  }, [status, dispatch]);

	useEffect(()=>{
		console.log("currentProducts", currentProducts);
	},[currentProducts])

	if (status === 'loading') {
    return <p>Loading products...</p>;
  }
	
	return (
		<div className="products-main-wrapper">
			{currentProducts.map((product, index) => (
				<ProductPreview 
					product = {product}
					index = {index}
				/>
			))}
		</div>
	)
}

export default ProductList;