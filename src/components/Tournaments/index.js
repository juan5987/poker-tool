import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Footer from 'components/Footer';
import Header from 'components/Header';
import Tournament from './Tournament';
import "./tournaments.scss";



const Tournaments = ({
    tournaments,
}) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: "GET_TOURNAMENTS_FROM_API" });
        dispatch({type: "GET_CHIPS_FROM_API"}); 
    }, []);

    return (
        <div className="tournaments">
            <Header />
            <main className="tournaments__body">
                <h2 className="tournaments__body__title">Mes tournois</h2>
                <Link to="tournaments/create" className="tournaments__body__create">Créer un tournoi</Link>
                <h3 className="tournaments__body__subtitle">Tous les tournois</h3>
                <div className="tournaments__body__container">
                    {   tournaments.length === 0 
                        ?
                        <p className="tournaments__body__container__noTournament">Aucun tournoi trouvé.</p>
                        :
                        tournaments.map((element, i) => {
                            return <Tournament key={i} tournament={element} />
                        })
                    }
                </div>
            </main>
            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => ({
    tournaments: state.tournament.tournaments,
    showCreateTournamentModal: state.tournament.showCreateTournamentModal,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Tournaments);