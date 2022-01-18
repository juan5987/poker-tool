import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//style
import './modal.scss';

const Modal = ({
    isOpen,
    title,
    content,
    handleCloseConnectionModal,
}) => {


    return (
        <div className={isOpen ? 'modal show' : 'modal'} onMouseDown={handleCloseConnectionModal}>
            <div className="modal__content" onMouseDown={e => e.stopPropagation()}>

                <div className="modal__content__header">
                    <span onClick={handleCloseConnectionModal} className="modal__content__header__close">X</span>
                    <h2 className="modal__content__header__title">{title}</h2>
                </div>

                <div className="modal__content__body">
                    {content}
                </div>

            </div>
        </div>
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
    handleCloseConnectionModal: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    handleCloseConnectionModal: () => {
        dispatch({type: "CLOSE_MODALS"});
    }
})

export default connect(null, mapDispatchToProps)(Modal);
