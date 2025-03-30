import React, { useState } from 'react';
import './index.scss';

function ModalWindow({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  const handleModalClick = (event) => {
    event.stopPropagation(); 
};

  return (
    <div className="modal-overlay">
      <div className="modal" onClick={handleModalClick}>
        <div className="modal-header">
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default ModalWindow;