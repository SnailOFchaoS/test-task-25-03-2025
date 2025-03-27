import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { ReactComponent as ImagePlaceholder } from '../../../assets/image-placeholder.svg';
import { ReactComponent as TrashBinImage } from '../../../assets/image-placeholder.svg';
import likeImage from "../../../assets/like.svg";
// import trashBinImage from "../../../assets/trash-bin.svg"


import "./index.scss"

const ProductPreview = ({product, index}) => {
  const [imageError, setImageError ] = useState(false)
  const [showGradient, setShowGradient] = useState(false);
  const descriptionRef = useRef(null)
	const trashButtonRef  = useRef(null)

  const checkImage = () => {
    return setImageError(true);
  }

	const onTrashButtonClicked = () => {
		return gsap.fromTo(trashButtonRef.current, {
			y: 0,
		},{
			y: -20,
			duration: 0.3,
			ease: "power2.inOut",
			repeat: 1,
			yoyo: true,
		})
	}

  useEffect(() => {

		console.log("ImagePlaceholder", ImagePlaceholder)
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

	// useEffect(() => {
	// 	trashButtonRef.current.setProperty('--trash-bin-image', `url(${trashBinImage})`)
	// }, [trashBinImage])

	return (
		<div className="main-block-wrapper" key = {index}>
			<div className="image-wrapper">
        {imageError ? (
          <ImagePlaceholder/>
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
			<TrashBinImage  
				className="trash-bin-button"
				ref={trashButtonRef} 
				onClick = {onTrashButtonClicked}/>
		</div>
	);
}

export default ProductPreview;