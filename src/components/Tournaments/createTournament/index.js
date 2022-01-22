import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "components/Footer";
import Header from "components/Header";
import "./createTournament.scss";

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
    handleChangeCreateTournamentInputs,
    handleSubmitCreateTournamentForm,
}) => {

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
                                <input onChange={handleChangeCreateTournamentInputs} name="name" className="createTournament__form__inputContainer__input" type="text" value={name} required/>
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="date" className="createTournament__form__inputContainer__label">Date tournoi</label>
                                <input onChange={handleChangeCreateTournamentInputs} name="date" className="createTournament__form__inputContainer__input" type="date" value={date} required/>
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="location" className="createTournament__form__inputContainer__label">Lieux du tournoi</label>
                                <input onChange={handleChangeCreateTournamentInputs} name="location" className="createTournament__form__inputContainer__input" type="text" value={location} required/>
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="nbPlayer" className="createTournament__form__inputContainer__label">Nombre de joueurs</label>
                                <input onChange={handleChangeCreateTournamentInputs} name="nbPlayer" className="createTournament__form__inputContainer__input" type="number" min={2} value={nbPlayer} required/>
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="speed" className="createTournament__form__inputContainer__label">Durée des étapes (en minutes)</label>
                                <input onChange={handleChangeCreateTournamentInputs} name="speed" className="createTournament__form__inputContainer__input" type="number" min={1} value={speed} required/>
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="startingStack" className="createTournament__form__inputContainer__label">Tapis de départ</label>
                                <input onChange={handleChangeCreateTournamentInputs} name="startingStack" className="createTournament__form__inputContainer__input" type="number" min={1} value={startingStack} required/>
                            </div>
                        </div>
                        <div className="createTournament__form__right">
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="buyIn" className="createTournament__form__inputContainer__label">Buy-in</label>
                                <input onChange={handleChangeCreateTournamentInputs} name="buyIn" className="createTournament__form__inputContainer__input" type="number" min={1} value={buyIn} required/>
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="smallBlind" className="createTournament__form__inputContainer__label">Valeur de la petite blind</label>
                                <input onChange={handleChangeCreateTournamentInputs} name="small_blind" className="createTournament__form__inputContainer__input" type="number" min={1} value={small_blind} required/>
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="chipsUser" className="createTournament__form__inputContainer__label">Utiliser vos jetons ? </label>
                                <input onChange={handleChangeCreateTournamentInputs} name="chips_user" className="createTournament__form__inputContainer__input" type="checkbox" checked={chips_user} />
                            </div>
                            <div className="createTournament__form__inputContainer">
                                <label htmlFor="comment" className="createTournament__form__inputContainer__label">Commentaire (facultatif)</label>
                                <textarea onChange={handleChangeCreateTournamentInputs} rows={5} name="comment" className="createTournament__form__inputContainer__input" value={comment}/>
                            </div>
                        </div>
                    </div>
                    <div className="createTournament__form__buttons">
                        <button type="submit" className="createTournament__form__buttons__button">Créer le tournoi</button>
                        <Link to="/tournaments" className="createTournament__form__buttons__button" type="submit">Annuler</Link>
                    </div>
                    {
                        errorMessage && <p className="createTournament__form__errorMsg">{errorMessage}</p>
                    }
                </form>
            </main>
            <Footer />
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
});

const mapDispatchToProps = (dispatch) => ({
    handleChangeCreateTournamentInputs: (event) => {
        dispatch({type: "CHANGE_CREATE_TOURNAMENT_INPUTS", inputName: event.target.name, newValue: event.target.type === 'checkbox' ? event.target.checked : event.target.value});
    },
    handleSubmitCreateTournamentForm: (event) => {
        event.preventDefault();
        dispatch({type: "SUBMIT_CREATE_TOURNAMENT_FORM"});
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTournament);