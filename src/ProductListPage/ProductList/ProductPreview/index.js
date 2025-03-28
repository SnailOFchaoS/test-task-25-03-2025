import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { ReactComponent as ImagePlaceholder } from '../../../assets/image-placeholder.svg';
import { ReactComponent as TrashBinImage } from '../../../assets/trash-bin.svg';
import { ReactComponent as LikeImage } from '../../../assets/like.svg';

import "./index.scss"

const ProductPreview = ({product, index}) => {
  const [imageError, setImageError ] = useState(false)
  const [showGradient, setShowGradient] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const descriptionRef = useRef(null)
	const trashButtonRef  = useRef(null)
  const likeButtonRef  = useRef(null)

  const checkImage = () => {
    return setImageError(true);
  }

  const onTrashButtonMouseEnter = () => {
    if(!trashButtonRef.current)
      return ;

    trashButtonRef.current.querySelectorAll('.image *').forEach(path => {
      path.style.fill = 'red';
    });
  }

  const onTrashButtonMouseLeave = () => {
    if(!trashButtonRef.current)
      return ;
  
    trashButtonRef.current.querySelectorAll('.image *').forEach(path => {
      path.style.fill = 'grey';
    });
  }

  const onLikeButtonClicked = () => {
    setIsLiked(!isLiked);
    gsap.fromTo(likeButtonRef.current, {
			y: 0,
		},{
			y: -20,
			duration: 0.3,
			ease: "power2.inOut",
			repeat: 1,
			yoyo: true,
		})
  }

	const onTrashButtonClicked = () => {
    return console.log("Delete!");
	}

  const checkTextHeight = () => {
    if (descriptionRef.current) {
      requestAnimationFrame(() => { 
        const textHeight = descriptionRef.current.offsetHeight;
        const maxHeight = 60;
        const shouldShowGradient = textHeight > maxHeight;
        setShowGradient(shouldShowGradient);
      });
    }
  };

  useEffect(() => { 

    const resizeObserver = new ResizeObserver(checkTextHeight);
    if (descriptionRef.current) {
      resizeObserver.observe(descriptionRef.current);
    }
    if(likeButtonRef.current){
      likeButtonRef.current.querySelectorAll('.image *').forEach(path => {
        path.style.fill = !isLiked ? 'grey' : 'red';
      });
    }
    if(trashButtonRef.current){
      trashButtonRef.current.querySelectorAll('.image *').forEach(path => {
        path.style.fill = 'grey';
      });
    }
  }, []);

  useEffect(() => {
    likeButtonRef.current.querySelectorAll('.image *').forEach(path => {
      path.style.fill = !isLiked ? 'grey' : 'red';
    });
  }, [isLiked])

	return (
		<div className="main-block-wrapper" key = {index}>
			<div className="image-wrapper">
        {imageError ? (
          <ImagePlaceholder className = "image"/>
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
      <div className="trash-bin-button" 
        ref={trashButtonRef} 
        onClick = {onTrashButtonClicked}
        onMouseEnter = {onTrashButtonMouseEnter}
        onMouseLeave={onTrashButtonMouseLeave}
      >
        <TrashBinImage className="image"/>
      </div>

      <div className="trash-bin-button" 
        ref={trashButtonRef} 
        onClick = {onTrashButtonClicked}
        onMouseEnter = {onTrashButtonMouseEnter}
        onMouseLeave={onTrashButtonMouseLeave}
      >
        <TrashBinImage className="image"/>
      </div>
			<div className="like-button"
        ref={likeButtonRef}
        onClick={onLikeButtonClicked}
      >
        <LikeImage className="image"/>
      </div>
		</div>
	);
}

export default ProductPreview;