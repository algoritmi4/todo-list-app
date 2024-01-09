import { ReactNode, useEffect } from "react";

function Popup({
  isOpen,
  handleClose,
  children
}: {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);

    return document.removeEventListener('keydown', handleEscClose);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  function handleEscClose(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      handleClose();
    }
  }

  return (
    <div className={`fixed inset-y-0 inset-x-0 flex flex-col items-center justify-center z-20 duration-300 box-border ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
      <span className="absolute inset-y-0 inset-x-0 z-10 bg-black opacity-50" onClick={handleClose}></span>
      <div className="z-20 relative mx-auto">
        <button type="button" onClick={handleClose} className="absolute border-none bg-cross bg-transparent bg-no-repeat bg-cover bg-center w-11 h-11 cursor-pointer top-[-42px] right-[-42px] hover:opacity-70 duration-100"></button>
        {children}
      </div>
    </div>
  );
}

export default Popup;