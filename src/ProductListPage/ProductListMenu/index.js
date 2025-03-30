import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";

import {ProductListPageContext} from "../index.js"
import "./index.scss"

const ProductListMenu = () => {
  const { showLiked, setShowLiked, currentProducts } = useContext(ProductListPageContext);
  const navigate = useNavigate();

  const onCheckboxClicked = () => {
    setShowLiked(!showLiked)
  }

  const onAddButtonClicked = () => {
    return navigate(`create`);
  }

  return (
    <div className="main-menu-wrapper">
      <div className="checkbox-wrapper">
        Show favorites
        <input className="checkbox-point"
          type="checkbox" 
          name="showLiked" 
          defaultChecked={showLiked} 
          onClick={onCheckboxClicked}/>
      </div>
      <div 
        className="add-product-button" 
        onClick={onAddButtonClicked}
      >
        Add product
      </div>
    </div>
  )
}

export default ProductListMenu;