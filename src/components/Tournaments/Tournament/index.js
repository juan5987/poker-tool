import { connect } from "react-redux"
import { Edit, Eye, Trash2 } from 'react-feather';
import { useState } from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { shortName } from '../../../utils/shortenString';
import "./tournament.scss";

const Tournament = ({
    tournament,
    handleDeleteTournament,
    handleLaunchTournament,
}) => {

    const [showModifyButtonInfo, setShowModifyButtonInfo] = useState(false);
    const [showDetailsButtonInfo, setShowDetailsButtonInfo] = useState(false);
    const [showDeleteButtonInfo, setShowDeleteButtonInfo] = useState(false);

    const formattedDate = dateFormat(tournament.date, 'dd/mm/yyyy');

    return (
        <div className="tournament">
            <div className="tournament__elements">
            <div className="tournament__elements__element">
                <p className="tournament__elements__element__name">Nom :</p>
                <p className="tournament__elements__element__value">{shortName(tournament.name)}</p>
            </div>
            <div className="tournament__elements__element">
                <p className="tournament__elements__element__name">Date : </p>
                <p className="tournament__elements__element__value">{formattedDate}</p>
            </div>
            <div className="tournament__elements__element">
                <p className="tournament__elements__element__name">Lieux : </p>
                <p className="tournament__elements__element__value">{shortName(tournament.location)}</p>
            </div>
            <div className="tournament__elements__element">
                <p className="tournament__elements__element__name">Status : </p>
                <p className="tournament__elements__element__value">{tournament.status}</p>
            </div>
            </div>
            <div className="tournament__buttons">
                <Link 
                to={`/tournament/modify/${tournament.id}`}
                onMouseOver={() => setShowModifyButtonInfo(true) } 
                onMouseLeave={() => setShowModifyButtonInfo(false) } className="tournament__buttons__button" data-tournamentid={tournament.id}>
                    <Edit className="tournament__buttons__button__svg" data-tournamentid={tournament.id}/>
                </Link>
                {
                showModifyButtonInfo && 
                    <span className="tournament__buttons__bubble">Modifier le tournoi</span>
                }
                <Link 
                to={`/tournament/${tournament.id}`}
                onMouseOver={() => setShowDetailsButtonInfo(true) } 
                onMouseLeave={() => setShowDetailsButtonInfo(false) }className="tournament__buttons__button" data-tournamentid={tournament.id}>
                    <Eye className="tournament__buttons__button__svg" data-tournamentid={tournament.id}/>
                </Link>
                {
                    showDetailsButtonInfo &&
                    <span className="tournament__buttons__bubble">Voir les détails du tournoi</span>

                }
                <button 
                onMouseOver={() => setShowDeleteButtonInfo(true) } 
                onMouseLeave={() => setShowDeleteButtonInfo(false) } 
                onClick={handleDeleteTournament} className="tournament__buttons__button" data-tournamentid={tournament.id}>
                    <Trash2 data-tournamentid={tournament.id}/>
                </button>
                {
                    showDeleteButtonInfo &&
                    <span className="tournament__buttons__bubble">Supprimer le tournoi</span>

                }
                <Link 
                to={`/timer/${tournament.id}`}
                onClick={handleLaunchTournament} className="tournament__buttons__launch">Lancer le tournoi
                </Link>
            </div>
        </div >
    )
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    handleDeleteTournament: (event) => {
        const tournamentId = event.target.dataset.tournamentid;
        dispatch({type: "DELETE_TOURNAMENT", tournamentId: tournamentId});
    },
    handleLaunchTournament: () => {
        dispatch({type: "LAUNCH_TOURNAMENT"});
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tournament);