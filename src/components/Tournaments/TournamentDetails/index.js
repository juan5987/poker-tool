import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import dateFormat from "dateformat";
import Footer from "components/Footer";
import Header from "components/Header";
import "./tournamentDetails.scss";

const TournamentDetails = ({
tournaments,
prizePools,
}) => {
    const history = useHistory();
    const { id } = useParams();
    const tournament = tournaments.find(tournament => parseInt(tournament.id) === parseInt(id));
    const prizePool = prizePools.filter(price => price.tournament_id === (parseInt(tournament.id)));

    if(tournament){
        return (
            <div className="tournamentDetails">
                <Header />
                <main className="tournamentDetails__body">
                    <h2 className="tournamentDetails__body__title">Détails du tournoi</h2>
                    <div className="tournamentDetails__body__left">
                        <div className="tournamentDetails__body__left__element">
                            <span className="tournamentDetails__body__left__element__name">Nom :</span>
                            <span className="tournamentDetails__body__left__element__value">{tournament.name}</span>
                        </div>
                        <div className="tournamentDetails__body__left__element">
                            <span className="tournamentDetails__body__left__element__name">Date :</span>
                            <span className="tournamentDetails__body__left__element__value">{dateFormat(tournament.date, 'dd/mm/yyyy')}</span>
                        </div>
                        <div className="tournamentDetails__body__left__element">
                            <span className="tournamentDetails__body__left__element__name">Lieux :</span>
                            <span className="tournamentDetails__body__left__element__value">{tournament.location}</span>
                        </div>
                        <div className="tournamentDetails__body__left__element">
                            <span className="tournamentDetails__body__left__element__name">Nombre de joueurs :</span>
                            <span className="tournamentDetails__body__left__element__value">{tournament.nb_players}</span>
                        </div>
                        <div className="tournamentDetails__body__left__element">
                            <span className="tournamentDetails__body__left__element__name">Durée des étapes:</span>
                            <span className="tournamentDetails__body__left__element__value">{tournament.speed + " min"}</span>
                        </div>
                        <div className="tournamentDetails__body__left__element">
                            <span className="tournamentDetails__body__left__element__name">Tapis de départ:</span>
                            <span className="tournamentDetails__body__left__element__value">{tournament.starting_stack + " jetons"}</span>
                        </div>
                        <div className="tournamentDetails__body__left__element">
                            <span className="tournamentDetails__body__left__element__name">Buy-in: </span>
                            <span className="tournamentDetails__body__left__element__value">{tournament.buy_in + " €"}</span>
                        </div>
                        <div className="tournamentDetails__body__left__element">
                            <span className="tournamentDetails__body__left__element__name">Petite Blind: </span>
                            <span className="tournamentDetails__body__left__element__value">{tournament.small_blind}</span>
                        </div>
                        <div className="tournamentDetails__body__left__element">
                            <span className="tournamentDetails__body__left__element__name">Prize pool: </span>
                            {
                                prizePool.map((price, i )=> <span className="tournamentDetails__body__left__element__value" key={price.position+price.amount*i}>{price.position + `${price.position === 1 ? "er: ": "ème: "}` + price.amount + " € " }</span>)
                            }
                        </div>
                        <div className="tournamentDetails__body__left__element">
                            <span className="tournamentDetails__body__left__element__name">J'utilise mes jetons: </span>
                            <span className="tournamentDetails__body__left__element__value">{tournament.chips_user ? "oui" : "non"}</span>
                        </div>
                        <div className="tournamentDetails__body__left__element">
                            <span className="tournamentDetails__body__left__element__name">Commentaire :</span>
                            <span className="tournamentDetails__body__left__element__value--comment">{tournament.comments ? tournament.comments : "pas de commentaire"}</span>
                        </div>
                        <div className="tournamentDetails__body__left__element">
                            <span className="tournamentDetails__body__left__element__name">Status :</span>
                            <span className="tournamentDetails__body__left__element__value">{tournament.status}</span>
                        </div>
                    </div>
                    <div className="tournamentDetails__body__buttons">
                        <Link className="tournamentDetails__body__buttons__button" to="/tournaments">Retour</Link>
                        <Link className="tournamentDetails__body__buttons__button" to={`/tournament/modify/${tournament.id}`}>Modifier</Link>
                    </div>
                </main>
                <Footer />
            </div>
        )
    } else {
        history.push("/tournaments")
        return null;
    }
}

const mapStateToProps = (state) => ({
    tournaments: state.tournament.tournaments,
    prizePools: state.tournament.prizePool,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TournamentDetails);