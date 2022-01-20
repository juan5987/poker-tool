import { connect } from "react-redux"
import { Edit, Eye, Trash2 } from 'react-feather';
import "./tournament.scss";
import { useState } from "react";

const Tournament = ({
    tournament,
}) => {

    const [showModifyButtonInfo, setShowModifyButtonInfo] = useState(false);
    const [showDetailsButtonInfo, setShowDetailsButtonInfo] = useState(false);
    const [showDeleteButtonInfo, setShowDeleteButtonInfo] = useState(false);

    return (
        <div className="tournament">
            <h3 className="tournament__name">{tournament.name}</h3>
            <div className="tournament__element">
                <p className="tournament__element__name">Date : </p>
                <p className="tournament__element__value">{tournament.date}</p>
            </div>
            <div className="tournament__element">
                <p className="tournament__element__name">Lieux : </p>
                <p className="tournament__element__value">{tournament.location}</p>
            </div>
            <div className="tournament__element">
                <p className="tournament__element__name">Status : </p>
                <p className="tournament__element__value">{tournament.status}</p>
            </div>
            <div className="tournament__buttons">
                <button onMouseOver={() => setShowModifyButtonInfo(true) } onMouseLeave={() => setShowModifyButtonInfo(false) } className="tournament__buttons__button"><Edit /></button>
                {
                showModifyButtonInfo && 
                    <span className="tournament__buttons__bubble">Modifier le tournoi</span>
                }
                <button onMouseOver={() => setShowDetailsButtonInfo(true) } onMouseLeave={() => setShowDetailsButtonInfo(false) }className="tournament__buttons__button"><Eye /></button>
                {
                    showDetailsButtonInfo &&
                    <span className="tournament__buttons__bubble">Voir les détails du tournoi</span>

                }
                <button onMouseOver={() => setShowDeleteButtonInfo(true) } onMouseLeave={() => setShowDeleteButtonInfo(false) }className="tournament__buttons__button"><Trash2 /></button>
                {
                    showDeleteButtonInfo &&
                    <span className="tournament__buttons__bubble">Supprimer le tournoi</span>

                }
            </div>
            <div className="tournament__launch">
                <button className="tournament__launch__button">Lancer le tournoi</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Tournament);