import { A11yDialog } from 'react-a11y-dialog';
import PropTypes from 'prop-types';
import style from '../../styles/Modal.module.scss';

const Modal = ({ id, title, modalRef, children }) => {
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