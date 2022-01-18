import Footer from 'components/Footer';
import Header from 'components/Header';
import React from 'react';
import { connect } from 'react-redux';

import './forgotPasswordForm.scss';

const ForgotPaswordForm = ({
    emailValue,
    handleForgotPasswordInputChange,
    handleForgotPasswordSubmit,
    errorMessage,
    isMailSent,
}) => {

    return (

    <div className="forgotPassword">
        <Header />
        <main className="forgotPassword__body">
            <h2 className="forgotPassword__body__title">Mot de passe oublié</h2>
            <p className="forgotPassword__body__message" >Veuillez renseigner votre adresse email.</p>
            <form onSubmit={handleForgotPasswordSubmit} className="forgotPassword__body__form">
                <label htmlFor="email" required className="forgotPassword__body__form__label">Email</label>
                <input onChange={handleForgotPasswordInputChange} type="email" name="email" required value={emailValue} autoComplete="username" className="forgotPassword__body__form__input" />
                <p className="forgotPassword__body__message">Un email vous permettant de redéfinir votre mot de passe vous sera envoyé.</p>
                <button className="forgotPassword__body__form__submit" type="submit">Valider</button>
                {isMailSent ? <p className="forgotPassword__body__form__successMessage">Le mail a bien été envoyé.</p>: null}
                {errorMessage ? <p className="forgotPassword__body__form__errorMessage">{errorMessage}</p> : null}
            </form>
        </main>
        <Footer />
    </div>

)};

const mapStateToProps = (state) => ({
    emailValue: state.user.forgotPassword.email,
    errorMessage: state.user.forgotPassword.errorMessage,
    isMailSent: state.user.forgotPassword.isMailSent,
});

const mapDispatchToProps = (dispatch) => ({
    handleForgotPasswordInputChange: (event) => {
        dispatch({type:"CHANGE_FORGOT_PASSWORD_INPUT", newInputValue: event.target.value })
    },
    handleForgotPasswordSubmit: (event) => {
        event.preventDefault();
        dispatch({type:"SUBMIT_FORGOT_PASSWORD_FORM"});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPaswordForm);