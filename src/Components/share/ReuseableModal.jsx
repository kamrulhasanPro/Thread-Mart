import React from "react";

const ReuseableModal = ({ modalRef, children }) => {
  return (
    <>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-secondary">
          {children}
        </div>
      </dialog>
    </>
  );
};

export default ReuseableModal;
