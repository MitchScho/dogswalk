/* eslint-disable react/prop-types */
import React from 'react';
import './Modal.scss';

function Modal({
  isOpen, onClose, children, modalHeader,
}) {
  const handleClose = () => {
    onClose();
    console.log('clicked on close', isOpen);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal_overlay">
      <div className="modal">
        <div className="header">
          <h2 className="modalHeader">{ modalHeader }</h2>
          <button type="button" className="modal_close" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="modal_content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
