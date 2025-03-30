import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as TurnBackImage } from '../../assets/turn-back.svg';
import "./index.scss"

const TurnBackButton = () => {
  const navigate = useNavigate();
  const buttonRef = useRef()

  const turnBack =()=> {
    navigate(-1)
  }

  return (
    <div 
      className="turn-back-button-wrapper"
      onClick={turnBack}
      ref = {buttonRef}
    >
      <TurnBackImage className ="my-button-image" />
    </div>
  )
}

export default TurnBackButton;