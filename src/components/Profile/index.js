import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { EyeOff } from 'react-feather';
import { Eye } from 'react-feather';
import './profile.scss';

const Profile = ({
    handleModifyProfile,
    handleChangeProfileValue,
    modifying,
    usernameValue,
    emailValue,
    emailConfirmValue,
    passwordValue,
    passwordConfirmValue,
    showDeleteAccountModal,
    handleShowDeleteAccountModal,
    handleCloseModal,
    handleDeleteAccount,
    handleSubmitProfile,
    errorMessage,
    successMessage,
    handlePasswordVisibilityToggle,
    passwordVisibility,
    handleCancelModifying,
}) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: "GET_PROFILE_FROM_API" })
    }, []);

    return (
        <div className="profile">
            <Header />
            <main className="profile__body">
                <form className="profile__body__form">
                    {modifying
                    ?
                    <h2 className="profile__body__form__subtitle">Modification du profil</h2>
                    :
                    <h2 className="profile__body__form__subtitle">Mon profil</h2>
                    }

                    <label htmlFor="username" className="profile__body__form__label">Pseudo</label>
                    <input onChange={handleChangeProfileValue} type="text" name="username" className="profile__body__form__input" value={usernameValue} disabled={modifying ? "" : "disabled"} required />

                    <label htmlFor="email" className="profile__body__form__label">Email</label>
                    <input onChange={handleChangeProfileValue} type="email" name="email" className="profile__body__form__input" value={emailValue} disabled={modifying ? "" : "disabled"} required />
                    {modifying &&
                    <>
                        <label htmlFor="emailConfirm" className="profile__body__form__label">Confirmation de l'email</label>
                        <input onChange={handleChangeProfileValue} type="email" name="emailConfirm" className="profile__body__form__input" value={emailConfirmValue} disabled={modifying ? "" : "disabled"} required />
                    </>
                    }

                    <label htmlFor="password" className="profile__body__form__label">Mot de passe</label>
                    {passwordVisibility
					?
					<>
                        <input onChange={handleChangeProfileValue} type="password" name="password" className="profile__body__form__input" value={modifying ? passwordValue : "********"} disabled={modifying ? "" : "disabled"} placeholder="Nouveau mot de passe" />
                        {modifying &&
                        <>
                            <p className="profile__body__form__inputInfos">*A renseigner uniquement si vous souhaitez changer votre mot de passe</p>
                            <div className="profile__body__form__inputInfos__passwordVisibilityToggler" onClick={handlePasswordVisibilityToggle}>
                                <EyeOff className={"profile__body__form__inputInfos__passwordVisibilityToggler__icon"}/>
                            </div>
                        </>
                        }
                    </>
                    :
                    <>
                        <input onChange={handleChangeProfileValue} type="text" name="password" className="profile__body__form__input" value={modifying ? passwordValue : "********"} disabled={modifying ? "" : "disabled"} placeholder="Nouveau mot de passe" />
                        {modifying &&
                        <>
                            <p className="profile__body__form__inputInfos">*A renseigner uniquement si vous souhaitez changer votre mot de passe</p>
                            <div className="profile__body__form__inputInfos__passwordVisibilityToggler" onClick={handlePasswordVisibilityToggle}>
                                <Eye className={"profile__body__form__inputInfos__passwordVisibilityToggler__icon"}/>
                            </div>
                        </>
                        }
                    </>
                    }
                    {modifying &&
                    <>
                    <label htmlFor="passwordConfirm" className="profile__body__form__label">Confirmation du mot de passe</label>
                    {passwordVisibility
					?
					<>
                        <input onChange={handleChangeProfileValue} type="password" name="passwordConfirm" className="profile__body__form__input" value={passwordConfirmValue} disabled={modifying ? "" : "disabled"} placeholder="Nouveau mot de passe" />
                        <p className="profile__body__form__inputInfos">*A renseigner uniquement si vous souhaitez changer votre mot de passe</p>
                        <div className="profile__body__form__inputInfos__passwordVisibilityToggler" onClick={handlePasswordVisibilityToggle}>
                            <EyeOff className={"profile__body__form__inputInfos__passwordVisibilityToggler__icon"}/>
                        </div>
                    </>
                    :
                    <>
                        <input onChange={handleChangeProfileValue} type="text" name="passwordConfirm" className="profile__body__form__input" value={passwordConfirmValue} disabled={modifying ? "" : "disabled"} placeholder="Nouveau mot de passe" />
                        <p className="profile__body__form__inputInfos">*A renseigner uniquement si vous souhaitez changer votre mot de passe</p>
                        <div className="profile__body__form__inputInfos__passwordVisibilityToggler" onClick={handlePasswordVisibilityToggle}>
                            <Eye className={"profile__body__form__inputInfos__passwordVisibilityToggler__icon"}/>
                        </div>
                    </>
                    }
                    </>
                    }

                    <div className="profile__body__form__buttons">
                        <button type="submit" onClick={handleSubmitProfile} className={modifying ? "profile__body__form__buttons__button" : "profile__body__form__buttons__button invisible"}>Valider</button>
                        <button onClick={handleCancelModifying} className={modifying ? "profile__body__form__buttons__button" : "profile__body__form__buttons__button invisible"}>Annuler</button>
                    </div>
                    <button onClick={handleModifyProfile} className={!modifying ? "profile__body__form__buttons__button" : "profile__body__form__buttons__button invisible"}>Modifier mon profil</button>
                    <button
                        className="profile__body__form__delete"
                        onClick={handleShowDeleteAccountModal}
                    >
                        Supprimer mon compte
                    </button>
                    {errorMessage && <p className="profile__body__form__errorMsg">{errorMessage}</p>}
                    {successMessage && <p className="profile__body__form__successMsg">{successMessage}</p>}
                </form>
                <Modal
                    isOpen={showDeleteAccountModal}
                    title='Supprimer mon compte'
                    content={(
                        <div className="delete">
                            <p className="delete__confirm">
                                Voulez-vous vraiment supprimer votre compte ?
                            </p>
                            <br />
                            <p className="delete__confirm delete__confirm--alert">
                                Vos données seront définitivement supprimées.
                            </p>
                            <div className="delete__buttons">
                                <Link to='/'>
                                    <button
                                        type="submit"
                                        className="delete__buttons__button"
                                        onClick={handleDeleteAccount}
                                    >
                                        OK
                                    </button>
                                </Link>
                                <button
                                    className="delete__buttons__button"
                                    onClick={handleCloseModal}
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    )}
                />
            </main>
            <Footer />
        </div>
    );
}

Profile.propTypes = {
    handleModifyProfile: PropTypes.func.isRequired,
    handleChangeProfileValue: PropTypes.func.isRequired,
    modifying: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    modifying: state.user.profile.modifying,
    usernameValue: state.user.profile.username,
    emailValue: state.user.profile.email,
    emailConfirmValue: state.user.profile.emailConfirm,
    passwordValue: state.user.profile.password,
    passwordConfirmValue: state.user.profile.passwordConfirm,
    showDeleteAccountModal: state.user.profile.showDeleteAccountModal,
    errorMessage: state.user.profile.errorMessage,
    successMessage: state.user.profile.successMessage,
    passwordVisibility: state.user.registration.passwordVisibility,
});

const mapDispatchToProps = (dispatch) => ({
    handleModifyProfile: (event) => {
        event.preventDefault();
        dispatch({ type: "MODIFY_PROFILE" });
    },
    handleChangeProfileValue: (event) => {
        dispatch({ type: "CHANGE_PROFILE_VALUE", newInputValue: event.target.value, inputName: event.target.name });
    },
    handleShowDeleteAccountModal: (event) => {
        event.preventDefault();
        dispatch({ type: "SHOW_DELETE_ACCOUNT_MODAL" });
    },
    handleCloseModal: () => {
        dispatch({ type: "CLOSE_MODALS" });
    },
    handleDeleteAccount: () => {
        dispatch({ type: "DELETE_USER_ACCOUNT" });
    },
    handleSubmitProfile: (event) => {
        event.preventDefault();
        dispatch({ type: "SUBMIT_PROFILE" });
    },
    handlePasswordVisibilityToggle: () => {
		dispatch({type: "TOGGLE_PASSWORD_VISIBILITY"});
	},
    handleCancelModifying: (event) => {
        event.preventDefault();
        dispatch({type: "CANCEL_MODIFYING_PROFILE"});
        dispatch({type: "GET_PROFILE_FROM_API"});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
