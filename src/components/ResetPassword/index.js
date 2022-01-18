import Footer from 'components/Footer';
import Header from 'components/Header';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import './resetPassword.scss';

const ResetPassword = ({
    passwordValue,
    passwordConfirmValue,
    handleChangeResetPasswordInput,
    handleResetPasswordFormSubmit,
    code,
    errorMessage,
    isPasswordReset,
}) => {

    code = useParams().forgotPasswordCode;

    return(
    <div className="resetPassword">
        <Header />
        <main className="resetPassword__body">
            <h2 className="resetPassword__body__title">Redéfinition du mot passe</h2>
            <form onSubmit={handleResetPasswordFormSubmit} className="resetPassword__body__form" data-code={code}>
                <label className="resetPassword__body__form__label" htmlFor="password" name="password">Mot de passe</label>
                <input onChange={handleChangeResetPasswordInput} className="resetPassword__body__form__input" id="password" name="password" type="password" value={passwordValue} autoComplete="new-password" required/>
                <label className="resetPassword__body__form__label" htmlFor="confirmPassword" name="confirmPassword">Confirmation du mot de passe</label>
                <input onChange={handleChangeResetPasswordInput} className="resetPassword__body__form__input" id="confirmPassword"  name="passwordConfirm" type="password" value={passwordConfirmValue} autoComplete="new-password" required/>
                <button className="resetPassword__body__form__submit" type="submit">Valider</button>
                {errorMessage ? <p className="resetPassword__body__form__errorMessage">{errorMessage}</p>: null}
                {isPasswordReset ? <p className="resetPassword__body__form__successMessage">Votre mot de passe a bien été réinitialisé, vous pouvez vous connecter.</p>: null}
            </form>
        </main>
        <Footer />
    </div>
)}

const mapStateToProps = (state) => ({
    passwordValue: state.user.resetPassword.password,
    passwordConfirmValue: state.user.resetPassword.passwordConfirm,
    errorMessage: state.user.resetPassword.errorMessage,
    isPasswordReset: state.user.resetPassword.isPasswordReset,
});

const mapDispatchToProps = (dispatch, props) => ({
    handleChangeResetPasswordInput: (event) => {
        dispatch({type:"CHANGE_RESET_PASSWORD_INPUTS", newInputValue: event.target.value, inputName: event.target.name});
    },
    handleResetPasswordFormSubmit: (event) => {
        event.preventDefault();
        const forgotPasswordCode = event.target.dataset.code;
        dispatch({type:"SUBMIT_RESET_PASSWORD_FORM", forgotPasswordCode});
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);