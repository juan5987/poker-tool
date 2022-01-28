import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { EyeOff } from 'react-feather';
import { Eye } from 'react-feather';

//components
import Modal from 'components/Modal';

//style
import './header.scss';

//assets
import logo from 'assets/images/logo_blanc.svg';

const Header = ({
    isLogged,
    handleOpenUnauthorizedModal,
    isConnectionModalOpen,
    handleOpenConnectionModal,
    emailValue,
    passwordValue,
    isUnauthorizedModalOpen,
    handleChangeConnectionInputs,
    handleOpenRegistrationModal,
    handleLogin,
    handleLogout,
    errorMessage,
    isFirstConnection,
    handleCloseModals,
    handlePasswordVisibilityToggle,
	passwordVisibility,
}) => {

    const [isMenuOpen, setIsMenuopen] = useState(false);   

    return (
        <>
            <header className="header">

                <NavLink
                    to="/"
                    exact
                    className="header__logo"
                    activeClassName="header__logo"
                >
                    {/* En attente du logo */}
                    <img className="header__logo__img" src={logo} alt="Logo" />
                    <span className="header__logo__title">Poker Tool</span>
                </NavLink>

                <div onClick={() => setIsMenuopen(!isMenuOpen)} className={isMenuOpen ? "header__hamburgerIcon header__hamburgerIcon--open" : "header__hamburgerIcon"}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <nav className="header__navbar">
                    <NavLink
                        to="/"
                        exact
                        className="header__navbar__element"
                        activeClassName="header__navbar__element--selected"
                    >Accueil</NavLink>
                    <NavLink
                        to="/tournaments"
                        className="header__navbar__element"
                        activeClassName="header__navbar__element--selected"
                        onMouseDown={!isLogged ? handleOpenUnauthorizedModal : undefined}
                    >Mes tournois</NavLink>
                    <NavLink
                        to="/chip"
                        className="header__navbar__element"
                        activeClassName="header__navbar__element--selected"
                        onMouseDown={!isLogged ? handleOpenUnauthorizedModal : undefined}
                    >Mes jetons</NavLink>
                    <NavLink
                        to="/distributor"
                        className="header__navbar__element"
                        activeClassName="header__navbar__element--selected"
                    >Répartiteur</NavLink>
                    <NavLink
                        to="/profile"
                        className="header__navbar__element"
                        activeClassName="header__navbar__element--selected"
                        onMouseDown={!isLogged ? handleOpenUnauthorizedModal : undefined}
                    >Mon profil</NavLink>
                </nav>

                <nav className={isMenuOpen ? "header__responsiveNavbar header__responsiveNavbar--open" : "header__responsiveNavbar"}>
                    <NavLink
                        to="/"
                        exact
                        className="header__responsiveNavbar__element"
                        activeClassName="header__responsiveNavbar__element--selected"
                    >Accueil</NavLink>
                    <NavLink
                        to="/tournaments"
                        className="header__responsiveNavbar__element"
                        activeClassName="header__responsiveNavbar__element--selected"
                        onMouseDown={!isLogged ? handleOpenUnauthorizedModal : undefined}
                    >Mes tournois</NavLink>
                    <NavLink
                        to="/chip"
                        className="header__responsiveNavbar__element"
                        activeClassName="header__responsiveNavbar__element--selected"
                        onMouseDown={!isLogged ? handleOpenUnauthorizedModal : undefined}
                    >Mes jetons</NavLink>
                    <NavLink
                        to="/distributor"
                        className="header__responsiveNavbar__element"
                        activeClassName="header__responsiveNavbar__element--selected"
                    >Répartiteur</NavLink>
                    <NavLink
                        to="/profile"
                        className="header__responsiveNavbar__element"
                        activeClassName="header__responsiveNavbar__element--selected"
                        onMouseDown={!isLogged ? handleOpenUnauthorizedModal : undefined}
                    >Mon profil</NavLink>
                    {
                        !isLogged
                        ?
                        <button onClick={() => {setIsMenuopen(false); handleOpenConnectionModal()}} type="button" className={isLogged ? "header__connexion__button invisible" : "header__responsiveNavbar__connexion"}>
                        Connexion
                        </button>
                        :
                        <button
                            onClick={handleLogout}
                            type="button"
                            className={!isLogged ? "header__connexion__button invisible" : "header__responsiveNavbar__connexion"}>
                            Déconnexion
                        </button>
                    }         
                    
                </nav>

                <div className="header__connexion">
                    <button onClick={handleOpenConnectionModal} type="button" className={isLogged ? "header__connexion__button invisible" : "header__connexion__button"}>
                        Connexion
                    </button>
                    <NavLink
                        to="/">
                        <button
                            onClick={handleLogout}
                            type="button"
                            className={!isLogged ? "header__connexion__button invisible" : "header__connexion__button"}
                        >
                            Déconnexion
                        </button>
                    </NavLink>
                </div>
                <Modal 
                isOpen={isConnectionModalOpen}
                title="Connexion"
                content={(
                    <form onSubmit={handleLogin} className="connexionForm">
                        <label htmlFor="email" className="connexionForm__label">Email</label>
                        <input onChange={handleChangeConnectionInputs} type="email" name="email" value={emailValue} autoComplete="username" className="connexionForm__input" required/>
                        <label htmlFor="password" className="connexionForm__label">Mot de passe</label>

                        {passwordVisibility
                        ?
                        <>
                        <input onChange={handleChangeConnectionInputs} type="text" name="password" value={passwordValue} autoComplete="current-password" className="connexionForm__input" required/>
                        <div className="connexionForm__passwordVisibilityToggler" onClick={handlePasswordVisibilityToggle}>
							<EyeOff className={"connexionForm__passwordVisibilityToggler__icon"}/>
						</div>
                        </>
                        :
                        <>
                        <input onChange={handleChangeConnectionInputs} type="password" name="password" value={passwordValue} autoComplete="current-password" className="connexionForm__input" required/>
                        <div className="connexionForm__passwordVisibilityToggler" onClick={handlePasswordVisibilityToggle}>
							<Eye className={"connexionForm__passwordVisibilityToggler__icon"}/>
						</div>
                        </>
                        }
                        <NavLink onClick={handleCloseModals} to="/forgot-password" className="connexionForm__forgotPassword">Mot de passe oublié ?</NavLink>
                        {errorMessage ? <p className="connexionForm__errorMessage" >{errorMessage}</p> : null}
                        {isFirstConnection ? <p className="connexionForm__firstConnectionMessage" >Votre compte est validé. Vous pouvez vous connecter.</p> : null}
                        {<button type="submit" className="connexionForm__submit">Se connecter</button>}
                    </form>
                )}
                />
                <Modal
                isOpen={isUnauthorizedModalOpen}
                title="Contenu inaccessible"
                content={(
                    <div className="modalUnauthorized">
                        <p className="modalUnauthorized__paragraph">Vous devez être connecté pour accéder à ce contenu.</p>
                        <p className="modalUnauthorized__paragraph">Déjà inscrit ? <button onClick={handleOpenConnectionModal} className="modalUnauthorized__button">Me connecter</button></p>
                        <p className="modalUnauthorized__paragraph">Pas encore inscrit ? <NavLink to="/" onClick={ handleOpenRegistrationModal } className="modalUnauthorized__button">Créer un compte</NavLink></p>
                    </div>
                )}
            />
            </header >
        </>
    )
}

//proptypes
Header.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    handleOpenUnauthorizedModal: PropTypes.func.isRequired,
    isConnectionModalOpen: PropTypes.bool.isRequired,
    handleOpenConnectionModal: PropTypes.func.isRequired,
    isUnauthorizedModalOpen: PropTypes.bool.isRequired,
    handleChangeConnectionInputs: PropTypes.func.isRequired,
    emailValue: PropTypes.string,
    passwordValue: PropTypes.string,
    handleOpenRegistrationModal: PropTypes.func.isRequired,
}

//mapStateToProps
const mapStateToProps = (state) => ({
    isConnectionModalOpen: state.user.connection.isConnectionModalOpen,
    isUnauthorizedModalOpen: state.user.connection.isUnauthorizedModalOpen,
    isLogged: state.user.connection.isLogged,
    emailValue: state.user.connection.email,
    passwordValue: state.user.connection.password,
    errorMessage: state.user.connection.errorMessage,
    isFirstConnection: state.user.connection.isFirstConnection,
    passwordVisibility: state.user.registration.passwordVisibility,
})

//mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
    handleOpenConnectionModal: () => {
        dispatch({type: "CLOSE_MODALS"});
        dispatch({type: "OPEN_CONNECTION_MODAL"});
    },
    handleOpenUnauthorizedModal: () => {
        dispatch({type: "OPEN_UNAUTHORIZED_MODAL"});
    },
    handleChangeConnectionInputs: (event) => {
        dispatch({type: "CHANGE_CONNECTION_INPUTS", newValue: event.target.value, inputName: event.target.name})
    },
    handleOpenRegistrationModal: () => {
        dispatch({type: "CLOSE_MODALS"});
		dispatch({ type: "OPEN_REGISTRATION_MODAL" })
	},
    handleLogin: (event) => {
        event.preventDefault();
        dispatch({type: "LOG_IN"});
    },
    handleLogout: () => {
        dispatch({type:"LOG_OUT"});
        localStorage.clear();
    },
    handleCloseModals: () => {
        dispatch({type:"CLOSE_MODALS"});
    },
    handlePasswordVisibilityToggle: () => {
        dispatch({type:"TOGGLE_PASSWORD_VISIBILITY"})
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
