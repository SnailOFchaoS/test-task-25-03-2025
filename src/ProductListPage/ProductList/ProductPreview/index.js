import React, { useEffect, useRef, useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import {ProductListPageContext} from "../../index";
import DeleteProductModal from "../DeleteProductModal";
import { ReactComponent as ImagePlaceholder } from '../../../assets/image-placeholder.svg';
import { ReactComponent as TrashBinImage } from '../../../assets/trash-bin.svg';
import { ReactComponent as LikeImage } from '../../../assets/like.svg';

import "./index.scss"

const ProductPreview = ({product, setCheckIsModalOpen}) => {
  const {likedProducts, setLikedProducts} = useContext(ProductListPageContext);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError ] = useState(false)
  const [showGradient, setShowGradient] = useState(false);
  const [isLiked, setIsLiked] = useState(()=> {
    const localData = JSON.parse(localStorage.getItem('likedProducts'))
    return localData.includes(product.id);
  });

  const descriptionRef = useRef(null)
	const trashButtonRef  = useRef(null)
  const likeButtonRef  = useRef(null)

  const openModal = () => {
    setCheckIsModalOpen(true)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCheckIsModalOpen(false)
    setIsModalOpen(false);
  };

  const checkImage = () => {
    return setImageError(true);
  }

  const onTrashButtonMouseEnter = () => {
    if(!trashButtonRef.current)
      return ;

    trashButtonRef.current.querySelectorAll('.button-image *').forEach(path => {
      path.style.fill = 'red';
    });
  }

  const onTrashButtonMouseLeave = () => {
    if(!trashButtonRef.current)
      return ;
  
    trashButtonRef.current.querySelectorAll('.button-image *').forEach(path => {
      path.style.fill = 'grey';
    });
  }

  const onLikeButtonClicked = () => {
    setIsLiked(!isLiked);
    setLikedProducts(likedProducts.includes(product.id) ? 
      likedProducts.filter(id => id !== product.id) : [...likedProducts, product.id]
    )

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
    return openModal();
	}

  const onBlockCliked = (event) => {
    if (
      !event.target.classList.contains('like-button') &&
      !event.target.classList.contains('trash-bin-button')
    ) {
      return navigate(`${product.id}`);
    }
    return ;
  }

  const checkTextHeight = () => {
    if (descriptionRef.current) {
      requestAnimationFrame(() => { 
        const textHeight = descriptionRef?.current?.offsetHeight;
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
      likeButtonRef.current.querySelectorAll('.button-image *').forEach(path => {
        path.style.fill = !isLiked ? 'grey' : 'red';
      });
    }
    if(trashButtonRef.current){
      trashButtonRef.current.querySelectorAll('.button-image *').forEach(path => {
        path.style.fill = 'grey';
      });
    }
  }, []);

  useEffect(() => {
    likeButtonRef.current.querySelectorAll('.button-image *').forEach(path => {
      path.style.fill = !isLiked ? 'grey' : 'red';
    });
  }, [isLiked])

	return (
    <ProductPreviewContext.Provider value = {{
      product, 
      isModalOpen,
      closeModal
    }}>
      <div className="main-block-wrapper" 
        onClick={onBlockCliked} 
      >
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
          <TrashBinImage className="button-image"/>
        </div>
        <div className="like-button"
          ref={likeButtonRef}
          onClick={onLikeButtonClicked}
        >
          <LikeImage className="button-image"/>
        </div>
        <DeleteProductModal/>
      </div>
    </ProductPreviewContext.Provider>
	);
}

export const ProductPreviewContext = createContext()

export default ProductPreview;