import { connect } from "react-redux";
import Footer from 'components/Footer';
import Header from 'components/Header';
import Tournament from './Tournament';

import "./tournaments.scss";

const Tournaments = ({
    tournaments,
}) => {
    return (
        <div className="tournaments">
            <Header />
            <main className="tournaments__body">
                <h2 className="tournaments__body__title">Mes tournois</h2>
                <button className="tournaments__body__create">Créer un tournoi</button>
                <h3 className="tournaments__body__subtitle">Tournois prévus</h3>
                <div className="tournaments__body__container">
                    {
                        tournaments.map(element => {
                            return <Tournament tournament={element} />
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
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Tournaments);