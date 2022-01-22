import React from 'react';
import Modal from 'components/Modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { EyeOff } from 'react-feather';
import { Eye } from 'react-feather';

import './registration.scss';

const Registration = ({

	isRegistrationModalOpen,
	handleChangeRegistrationInputs,
	username,
	email,
	emailConfirm,
	password,
	passwordConfirm,
	handleRegister,
	errorMessage,
	handlePasswordVisibilityToggle,
	passwordVisibility,
}) => {
	return (
			<Modal 
			    isOpen={ isRegistrationModalOpen }
					title="Inscription"
					className="registrationModal"
					content={(
						<form onSubmit={handleRegister} className="inscriptionForm">
								<label htmlFor="username" className="inscriptionForm__label">Pseudo</label>
								<input onChange={ handleChangeRegistrationInputs } type="text" name="username" value={username} autoComplete="username" className="inscriptionForm__input" required/>

								<label htmlFor="email" className="inscriptionForm__label">Email</label>
								<input onChange={ handleChangeRegistrationInputs } type="email" name="email" value={email} autoComplete="email" className="inscriptionForm__input" required/>

								<label htmlFor="emailConfirmation" className="inscriptionForm__label">Confirmation de l'Email</label>
								<input onChange={ handleChangeRegistrationInputs } type="email" name="emailConfirm" value={emailConfirm} autoComplete="email" className="inscriptionForm__input" required/>


								<label htmlFor="password" className="inscriptionForm__label">Mot de passe</label>
								{passwordVisibility
								?
								<>
								<input onChange={ handleChangeRegistrationInputs } type="text" name="password" value={password} autoComplete="new-password" className="inscriptionForm__input" required/>
								<div className="inscriptionForm__passwordVisibilityToggler" onClick={handlePasswordVisibilityToggle}>
									<EyeOff className={"inscriptionForm__passwordVisibilityToggler__icon"}/>
								</div>
								</>
								:
								<>
								<input onChange={ handleChangeRegistrationInputs } type="password" name="password" value={password} autoComplete="new-password" className="inscriptionForm__input" required/>
								<div className="inscriptionForm__passwordVisibilityToggler" onClick={handlePasswordVisibilityToggle}>
									<Eye className={"inscriptionForm__passwordVisibilityToggler__icon"}/>
								</div>
								</>
								}
								<label htmlFor="passwordConfirmation" className="inscriptionForm__label">Confirmation du mot de passe</label>
								{passwordVisibility === true
								?
								<>
								<input onChange={ handleChangeRegistrationInputs } type="text" name="passwordConfirm" value={passwordConfirm} autoComplete="new-password" className="inscriptionForm__input" required/>
								<div className="inscriptionForm__passwordVisibilityToggler" onClick={handlePasswordVisibilityToggle}>
									<EyeOff className={"inscriptionForm__passwordVisibilityToggler__icon"}/>
								</div>
								</>
								:
								<>
								<input onChange={ handleChangeRegistrationInputs } type="password" name="passwordConfirm" value={passwordConfirm} autoComplete="new-password" className="inscriptionForm__input" required/>
								<div className="inscriptionForm__passwordVisibilityToggler" onClick={handlePasswordVisibilityToggle}>
									<Eye className={"inscriptionForm__passwordVisibilityToggler__icon"}/>
								</div>
								</>
								}
								{
									errorMessage ? <p className="inscriptionForm__errorMessage">{errorMessage}</p> : null
								}
								<button type="submit" className="inscriptionForm__submit">Valider</button>
						</form>
				)}
			/>
  );
};

Registration.propTypes = {
	handleChangeRegistrationInputs: PropTypes.func.isRequired,
	isRegistrationModalOpen: PropTypes.bool.isRequired,
  };

const mapStateToProps = (state) => ({
  isRegistrationModalOpen: state.user.registration.isRegistrationModalOpen,
  username: state.user.registration.username,
  email: state.user.registration.email,
  emailConfirm: state.user.registration.emailConfirm,
  password: state.user.registration.password,
  passwordConfirm: state.user.registration.passwordConfirm,
  errorMessage: state.user.registration.errorMessage,
  passwordVisibility: state.user.registration.passwordVisibility,
});

const mapDispatchToProps = (dispatch) => ({
	handleChangeRegistrationInputs: (event) => {
		dispatch({type: "CHANGE_REGISTRATION_INPUTS", newValue: event.target.value, inputName: event.target.name})
	},
	handleRegister: (event) => {
		event.preventDefault();
		dispatch({type:"SUBMIT_REGISTRATION_FORM"});
	},
	handlePasswordVisibilityToggle: () => {
		dispatch({type: "TOGGLE_PASSWORD_VISIBILITY"});
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
