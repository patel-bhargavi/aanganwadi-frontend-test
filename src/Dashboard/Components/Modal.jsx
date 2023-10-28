import React from 'react';

// Modal component
function Modal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Settings</h2>
        {/* Add your settings content here */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
