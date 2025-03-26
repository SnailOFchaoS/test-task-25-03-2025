import React, { useEffect, useRef, useState } from "react";
import imagePlaceholder from "../../../assets/image-placeholder.svg";

import "./index.scss"

const ProductPreview = ({product, index}) => {
  const [imageError, setImageError ] = useState(false)
  const [showGradient, setShowGradient] = useState(false);
  const descriptionRef = useRef(null)

  const checkImage = () => {
    return setImageError(true);
  }

  useEffect(() => {
    const checkTextHeight = () => {
      if (descriptionRef.current) {
        requestAnimationFrame(() => { 
          const textHeight = descriptionRef.current.offsetHeight;
          const maxHeight = 60;
          const shouldShowGradient = textHeight > maxHeight;
          setShowGradient(shouldShowGradient);
          console.log("offsetHeight:", textHeight, "showGradient:", shouldShowGradient);
        });
      }
    };

    const resizeObserver = new ResizeObserver(checkTextHeight);
    if (descriptionRef.current) {
      resizeObserver.observe(descriptionRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

	return (
		<div className="main-block-wrapper" key = {index}>
			<div className="image-wrapper">
        {imageError ? (
          <img src = {imagePlaceholder}
            alt="Placeholder" 
            className="image"
          />
        ) : (
          <img src = {product.image}
            alt={product.name} 
            onError={checkImage}
            className="image"
          />
        )}
			</div>
      <div className="info-wrapper">
        <p className="name-text-font">
          {product.name}
        </p>
        
      </div>
      <div className="info-wrapper">
        <span className="material-text-font">
          <span className="title-text-font">material: </span>{product.material}
        </span >
        <span className="price-text-font">
        <span className="title-text-font">price: </span> {product.price}
        </span>
      </div>
			<div className="description-wrapper">
        <span className={`description-text-font ${showGradient ? `has-gradient` : ``}`} ref={descriptionRef}>
          {product.description}
        </span >
      </div>
		</div>
	);
}

export default ProductPreview;