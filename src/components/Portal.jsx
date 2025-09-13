import { createPortal } from "react-dom";

export const Portal = ({ children, isOpen }) => {
  if (!isOpen) return null;
  
 
  const modalRoot = document.getElementById('modal-root') || document.body;
  
  return createPortal(children, modalRoot);
};