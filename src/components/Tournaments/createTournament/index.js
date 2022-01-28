import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import Modal from "components/Modal";
import "./createTournament.scss";
import PrizePoolInput from "./PrizePoolInput";

const CreateTournament = ({
    name,
    date,
    location,
    nbPlayer,
    speed,
    startingStack,
    buyIn,
    small_blind,
    chips_user,
    comment,
    errorMessage,
    redirectToTournamentsPage,
    openPrizePoolModal,
    prizePool,
    handleChangeCreateTournamentInputs,
    handleSubmitCreateTournamentForm,
    handleOpenPrizePoolModal,
    handleCloseModal,
    handleAddPrizePoolInput,
    handleResetPrizePoolInputs,
}) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const inputsContainer = React.createRef();
    const inputScroll = () => {
        inputsContainer.current.scrollIntoView();
    };

    useEffect(() => {
        if (redirectToTournamentsPage) {
            history.push("/tournaments");
            dispatch({ type: "CANCEL_REDIRECT" });
        }
    });

    return (
        <div className="createTournament">
            <Header />
            <main className="createTournament__body">
                <h2 className="createTournament__title">Création d'un tournoi</h2>
                <form onSubmit={handleSubmitCreateTournamentForm} className="createTournament__form">
                    <div className="createTournament__form__container">
                        <div className="createTournament__form__left">
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="name" className="createTournament__form__inputContainer__label">Nom du tournoi</label>
                                <input onChange={handleChangeCreateTournamentInputs} name="name" className="createTournament__form__inputContainer__input" type="text" value={name} required />
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="date" className="createTournament__form__inputContainer__label">Date tournoi</label>
                                <input onChange={handleChangeCreateTournamentInputs} name="date" className="createTournament__form__inputContainer__input" type="date" value={date} required />
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="location" className="createTournament__form__inputContainer__label">Lieux du tournoi</label>
                                <input onChange={handleChangeCreateTournamentInputs} name="location" className="createTournament__form__inputContainer__input" type="text" value={location} required />
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="nbPlayer" className="createTournament__form__inputContainer__label">Nombre de joueurs</label>
                                <input onChange={handleChangeCreateTournamentInputs} name="nbPlayer" className="createTournament__form__inputContainer__input" type="number" min={2} value={nbPlayer} required />
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="speed" className="createTournament__form__inputContainer__label">Durée des étapes (en minutes)</label>
                                <input onChange={handleChangeCreateTournamentInputs} name="speed" className="createTournament__form__inputContainer__input" type="number" min={1} value={speed} required />
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="startingStack" className="createTournament__form__inputContainer__label">Tapis de départ</label>
                                <input onChange={handleChangeCreateTournamentInputs} name="startingStack" className="createTournament__form__inputContainer__input" type="number" min={1} value={startingStack} required />
                            </div>
                        </div>
                        <div className="createTournament__form__right">
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="buyIn" className="createTournament__form__inputContainer__label">Buy-in</label>
                                <input onChange={handleChangeCreateTournamentInputs} name="buyIn" className="createTournament__form__inputContainer__input" type="number" min={1} value={buyIn} required />
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="smallBlind" className="createTournament__form__inputContainer__label">Valeur de la petite blind</label>
                                <input onChange={handleChangeCreateTournamentInputs} name="small_blind" className="createTournament__form__inputContainer__input" type="number" min={1} value={small_blind} required />
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="rebuy" className="createTournament__form__inputContainer__label">Rebuy </label>
                                <select onChange={handleChangeCreateTournamentInputs} name="rebuy" id="rebuy" className="createTournament__form__inputContainer__input">
                                    <option value="">Pas de rebuy </option>
                                    <option value="0h30">0h30</option>
                                    <option value="1H00">1H00</option>
                                    <option value="1H30">1H30</option>
                                    <option value="2H00">2H00</option>
                                    <option value="2H30">2H30</option>
                                    <option value="3H00">3H00</option>
                                    <option value="3H30">3H30</option>
                                    <option value="4H00">4H00</option>
                                </select>
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="chipsUser" className="createTournament__form__inputContainer__label">Utiliser vos jetons ? </label>
                                <input onChange={handleChangeCreateTournamentInputs} name="chips_user" className="createTournament__form__inputContainer__input" type="checkbox" checked={chips_user} />
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="comment" className="createTournament__form__inputContainer__label">Commentaire (facultatif)</label>
                                <textarea onChange={handleChangeCreateTournamentInputs} rows={3} name="comment" className="createTournament__form__inputContainer__input" value={comment} />
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="addPrizePool" className="createTournament__form__inputContainer__label">Prize Pool</label>
                                <button onClick={handleOpenPrizePoolModal} name="addPrizePool" className="createTournament__form__inputContainer__addPrizePool">Définir les places payées</button>
                            </div>
                        </div>
                    </div>
                    <div className="createTournament__form__buttons">
                        <button type="submit" className="createTournament__form__buttons__button">Créer le tournoi</button>
                        <Link onClick={handleResetPrizePoolInputs} to="/tournaments" className="createTournament__form__buttons__button" type="submit">Annuler</Link>
                    </div>
                    {
                        errorMessage && <p className="createTournament__form__errorMsg">{errorMessage}</p>
                    }
                </form>
            </main>
            <Footer />
            <Modal
                isOpen={openPrizePoolModal}
                title="Prize Pool"
                content={(
                    <div className="prizePoolModal">
                        <div className="prizePoolModal__inputs">
                        {
                            prizePool && prizePool.map((price, i) => <PrizePoolInput index={i} key={i} />)
                        }
                        <div className="prizePoolModal__inputs__scroll" ref={inputsContainer}></div>
                        </div>
                        <button onClick={handleAddPrizePoolInput} onMouseUp={inputScroll} className="prizePoolModal__addPrice">Ajouter une place payée</button>
                        <div className="prizePoolModal__buttons">
                            <button onClick={handleCloseModal} className="prizePoolModal__buttons__button">Enregistrer</button>
                            <button onClick={handleResetPrizePoolInputs} className="prizePoolModal__buttons__button">Annuler</button>
                        </div>
                    </div>
                )}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    name: state.tournament.createTournament.name,
    date: state.tournament.createTournament.date,
    location: state.tournament.createTournament.location,
    nbPlayer: state.tournament.createTournament.nbPlayer,
    speed: state.tournament.createTournament.speed,
    startingStack: state.tournament.createTournament.startingStack,
    buyIn: state.tournament.createTournament.buyIn,
    status: state.tournament.createTournament.status,
    small_blind: state.tournament.createTournament.small_blind,
    chips_user: state.tournament.createTournament.chips_user,
    comment: state.tournament.createTournament.comment,
    errorMessage: state.tournament.errorMessage,
    redirectToTournamentsPage: state.tournament.redirectToTournamentsPage,
    openPrizePoolModal: state.tournament.openPrizePoolModal,
    prizePool: state.tournament.createTournament.prizePool,
});

const mapDispatchToProps = (dispatch) => ({
    handleChangeCreateTournamentInputs: (event) => {
        dispatch({ type: "CHANGE_CREATE_TOURNAMENT_INPUTS", inputName: event.target.name, newValue: event.target.type === 'checkbox' ? event.target.checked : event.target.value });
    },
    handleSubmitCreateTournamentForm: (event) => {
        event.preventDefault();
        dispatch({ type: "SUBMIT_CREATE_TOURNAMENT_FORM" });
    },
    handleOpenPrizePoolModal: (event) => {
        event.preventDefault();
        dispatch({ type: "OPEN_PRIZE_POOL_MODAL" });
    },
    handleCloseModal: (event) => {
        event.preventDefault();
        dispatch({ type: "CLOSE_MODALS" });
    },
    handleAddPrizePoolInput: (event) => {
        event.preventDefault();
        dispatch({ type: "ADD_PRIZE_POOL_MODAL" });
    },
    handleResetPrizePoolInputs: () => {
        dispatch({type:"CLOSE_MODALS"});
        dispatch({type:"RESET_PRIZE_POOL_INPUTS"});
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTournament);