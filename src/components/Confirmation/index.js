import React from 'react';
import { connect } from 'react-redux';

//components
import Modal from 'components/Modal';

import './confirmation.scss';

const Confirmation = ({isConfirmationModalOpen}) => (
    <Modal 
        isOpen={ isConfirmationModalOpen }
            title="Confirmation d'inscription"
            className="confirmationModal"
            content={(
                <>
                    <p className="confirmationModal__text" >Votre inscription a bien été prise en compte. 
                    <br/> Afin d'activer votre compte, vous devez confirmer votre adresse mail en cliquant sur le lien qui figure dans l'email que nous vous avons envoyé. 
                    <br/> Veuillez consulter votre boite mail.</p>
                </>
        )}
    />
)

const mapStateToProps = (state) => ({
    isConfirmationModalOpen: state.user.registration.isConfirmationModalOpen,
  });
  
export default connect(mapStateToProps)(Confirmation);