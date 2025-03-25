import React from "react";

import "./index.css"

const ProductPreview = ({product, index}) => {
	return (
		<div className="main-block-wrapper" key = {index}>
			<div className="image-wrapper">
				<img src = {product.image}
					className="image"
				/>
			</div>
			
		</div>
	);
}

export default ProductPreview;