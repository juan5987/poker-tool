import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import dateFormat from "dateformat";
import Footer from "components/Footer";
import Header from "components/Header";
import Modal from "components/Modal";
import PrizePoolInput from "../CreateTournament/PrizePoolInput";
import "./modifyTournament.scss";

const ModifyTournament = ({
    tournaments,
    modifyTournament,
    errorMessage,
    redirectToTournamentsPage,
    openPrizePoolModal,
    prizePool,
    handleChangeModifyTournamentInputs,
    handleSubmitModifyTournamentForm,
    handleAddPrizePoolInputInModify,
    handleCloseModal,
    handleResetPrizePoolInputsModify,
    handleOpenPrizePoolModal,
}) => {

    const tournamentId = useParams().id;
    const tournament = tournaments.find(tournament => parseInt(tournament.id) === parseInt(tournamentId));

    const history = useHistory();
    const dispatch = useDispatch();

    const inputsContainer = React.createRef();
    const inputScroll = () => {
        inputsContainer.current.scrollIntoView();
    };
    
    useEffect(() => {
        if(redirectToTournamentsPage){
            history.push("/tournaments");
            dispatch({type: "CANCEL_REDIRECT"});
        }
    });

    useEffect(() => {
        if(tournament) dispatch({type: "ADD_MODIFY_TOURNAMENT", tournament: tournament });
    }, []);

    if(tournament){
    return (
        <div className="createTournament">
            <Header />
            <main className="createTournament__body">
                <h2 className="createTournament__title">Modification d'un tournoi</h2>
                <form onSubmit={handleSubmitModifyTournamentForm} className="createTournament__form" data-tournamentid={tournamentId}>
                    <div className="createTournament__form__container">
                        <div className="createTournament__form__left">
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="name" className="createTournament__form__inputContainer__label">Nom du tournoi</label>
                                <input 
                                onChange={handleChangeModifyTournamentInputs} 
                                name="name" className="createTournament__form__inputContainer__input" type="text" value={modifyTournament.name} required/>
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="date" className="createTournament__form__inputContainer__label">Date tournoi</label>
                                <input 
                                onChange={handleChangeModifyTournamentInputs} 
                                name="date" className="createTournament__form__inputContainer__input" type="date" value={dateFormat(modifyTournament.date, 'yyyy-mm-dd')} required/>
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="location" className="createTournament__form__inputContainer__label">Lieux du tournoi</label>
                                <input 
                                onChange={handleChangeModifyTournamentInputs} 
                                name="location" className="createTournament__form__inputContainer__input" type="text" value={modifyTournament.location} required/>
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="nbPlayer" className="createTournament__form__inputContainer__label">Nombre de joueurs</label>
                                <input 
                                onChange={handleChangeModifyTournamentInputs} 
                                name="nbPlayer" className="createTournament__form__inputContainer__input" type="number" min={2} value={modifyTournament.nbPlayer} required/>
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="speed" className="createTournament__form__inputContainer__label">Durée des étapes (en minutes)</label>
                                <input 
                                onChange={handleChangeModifyTournamentInputs} 
                                name="speed" className="createTournament__form__inputContainer__input" type="number" min={1} value={modifyTournament.speed} required/>
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="startingStack" className="createTournament__form__inputContainer__label">Tapis de départ</label>
                                <input 
                                onChange={handleChangeModifyTournamentInputs} 
                                name="startingStack" className="createTournament__form__inputContainer__input" type="number" min={1} value={modifyTournament.startingStack} required/>
                            </div>
                        </div>
                        <div className="createTournament__form__right">
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="buyIn" className="createTournament__form__inputContainer__label">Buy-in</label>
                                <input 
                                onChange={handleChangeModifyTournamentInputs} 
                                name="buyIn" className="createTournament__form__inputContainer__input" type="number" min={1} value={modifyTournament.buyIn} required/>
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="smallBlind" className="createTournament__form__inputContainer__label">Valeur de la petite blind</label>
                                <input 
                                onChange={handleChangeModifyTournamentInputs} 
                                name="small_blind" className="createTournament__form__inputContainer__input" type="number" min={1} value={modifyTournament.small_blind} required/>
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="rebuy" className="createTournament__form__inputContainer__label">Rebuy </label>
                                <select onChange={handleChangeModifyTournamentInputs} name="rebuy" id="rebuy" className="createTournament__form__inputContainer__input" value={modifyTournament.rebuy}>
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
                                <input 
                                onChange={handleChangeModifyTournamentInputs} 
                                name="chips_user" className="createTournament__form__inputContainer__input" type="checkbox" checked={modifyTournament.chips_user} />
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="comment" className="createTournament__form__inputContainer__label">Commentaire (facultatif)</label>
                                <textarea 
                                onChange={handleChangeModifyTournamentInputs} 
                                rows={3} name="comment" className="createTournament__form__inputContainer__input" value={modifyTournament.comment}/>
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="addPrizePool" className="createTournament__form__inputContainer__label">Prize Pool</label>
                                <button onClick={handleOpenPrizePoolModal} name="addPrizePool" className="createTournament__form__inputContainer__addPrizePool" data-tournamentid={tournamentId}>Modifier les places payées</button>
                            </div>
                        </div>
                    </div>
                    <div className="createTournament__form__buttons">
                        <button type="submit" className="createTournament__form__buttons__button">Modifier le tournoi</button>
                        <Link to="/tournaments" className="createTournament__form__buttons__button" type="submit">Annuler</Link>
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
                            prizePool && prizePool.filter(el => parseInt(el.tournament_id) === parseInt(tournamentId)).map((price, i) => <PrizePoolInput tournamentId={tournamentId} index={i} key={i} />)
                        }
                        <div className="prizePoolModal__inputs__scroll" ref={inputsContainer}></div>
                        </div>
                        <button onClick={handleAddPrizePoolInputInModify} onMouseUp={inputScroll} className="prizePoolModal__addPrice" data-tournamentid={tournamentId}>Ajouter une place payée</button>
                        <div className="prizePoolModal__buttons">
                            <button onClick={handleCloseModal} className="prizePoolModal__buttons__button">Enregistrer</button>
                            <button onClick={handleResetPrizePoolInputsModify} className="prizePoolModal__buttons__button" data-tournamentid={tournamentId}>Annuler</button>
                        </div>
                    </div>
                )}
            />
        </div>
    )
    } else {
        history.push("/tournaments")
        return null;
    }
}

const mapStateToProps = (state) => ({
    tournaments: state.tournament.tournaments,
    modifyTournament: state.tournament.modifyTournament,
    errorMessage: state.tournament.errorMessage,
    redirectToTournamentsPage: state.tournament.redirectToTournamentsPage,
    openPrizePoolModal: state.tournament.openPrizePoolModal,
    prizePool: state.tournament.prizePool,
});

const mapDispatchToProps = (dispatch) => ({
    handleChangeModifyTournamentInputs: (event) => {
        dispatch({type: "CHANGE_MODIFY_TOURNAMENT_INPUTS", inputName: event.target.name, newValue: event.target.type === 'checkbox' ? event.target.checked : event.target.value});
    },
    handleSubmitModifyTournamentForm: (event) => {
        event.preventDefault();
        const tournamentId = event.target.dataset.tournamentid;
        dispatch({type: "SUBMIT_MODIFY_TOURNAMENT_FORM", tournamentId: tournamentId });
    },
    handleAddPrizePoolInputInModify: (event) => {
        event.preventDefault();
        dispatch({ type: "ADD_PRIZE_POOL_MODAL_IN_MODIFY", tournamentId: event.target.dataset.tournamentid });
    },
    handleCloseModal: () => {
        dispatch({type:"CLOSE_MODALS"});
    },
    handleResetPrizePoolInputsModify: (event) => {
        dispatch({type:"CLOSE_MODALS"});
        dispatch({type:"GET_PRIZE_POOL", tournamentId: event.target.dataset.tournamentid});
    },
    handleOpenPrizePoolModal: (event) => {
        event.preventDefault();
        dispatch({ type: "OPEN_PRIZE_POOL_MODAL" });
        dispatch({type:"GET_PRIZE_POOL", tournamentId: event.target.dataset.tournamentid});
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyTournament);