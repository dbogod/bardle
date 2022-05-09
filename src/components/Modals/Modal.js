import { useEffect, useContext } from 'react';
import { A11yDialog } from 'react-a11y-dialog';
import PropTypes from 'prop-types';

import style from '../../styles/Modal.module.scss';

import { ModalContext } from '../../context/Modal';
const Modal = ({ id, title, modalRef, children }) => {
  const { setCurrentModal } = useContext(ModalContext);
  
  useEffect(() => {
    const addModalCloseHandler = () => {
      const { current } = modalRef;
      if (current?.on) {
        current.on('show', () => setCurrentModal(id));
        current.on('hide', () => setCurrentModal(''));
      } else {
        setTimeout(addModalCloseHandler, 10);
      }
    };
    addModalCloseHandler();
  });
  
  return (
    <A11yDialog
      id={id}
      classNames={{
        container: style.container,
        overlay: style.overlay,
        dialog: style.content,
        title: style.title,
        closeButton: style.close,
      }}
      dialogRef={instance => (modalRef.current = instance)}
      title={title}>
      {children}
    </A11yDialog>
  );
};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  modalRef: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

export default Modal;