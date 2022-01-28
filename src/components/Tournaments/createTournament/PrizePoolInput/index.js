import React, { useEffect } from 'react';
import  { connect } from 'react-redux';
import './prizePoolInput.scss';

const PrizePoolInput = ({
    position,
    amount,
    handlePrizePoolInputChange,
    handleDeletePrizePoolInputModify,
    tournamentId,
    prizePool,
  }) => {

  return (
      <div className="prizePoolInput">
          <span onClick={handleDeletePrizePoolInputModify} className='prizePoolInput__quit'>X</span>
          <label className="prizePoolInput__label">Classement du joueur</label>
          <input onChange={handlePrizePoolInputChange} name="position" className="prizePoolInput__input" type="number" value={position} />
          <label className="prizePoolInput__label">Montant remporté (€)</label>
          <input onChange={handlePrizePoolInputChange} name="amount" className="prizePoolInput__input" type="number" value={amount} required min={0}/>
      </div>
  );
};

const mapStateToProps = (state, ownprops) => ({
    prizePool: state.tournament.prizePool,
    position: ownprops.tournamentId
    ?
    state.tournament.prizePool.filter(el => parseInt(el.tournament_id) === parseInt(ownprops.tournamentId))[ownprops.index].position
    :
    state.tournament.createTournament.prizePool[ownprops.index].position,
    amount: ownprops.tournamentId
    ?
    state.tournament.prizePool.filter(el => parseInt(el.tournament_id) === parseInt(ownprops.tournamentId))[ownprops.index].amount
    :
    state.tournament.createTournament.prizePool[ownprops.index].amount,
});

const mapDispatchToProps = (dispatch, ownprops) => {
    
    return ({
    handlePrizePoolInputChange: (event) => {
        ownprops.tournamentId ?
        dispatch({type: "PRIZE_POOL_INPUT_CHANGE_MODIFY", inputName: event.target.name, newValue: event.target.value, index: ownprops.index, tournamentId: ownprops.tournamentId})
        :
        dispatch({type: "PRIZE_POOL_INPUT_CHANGE", inputName: event.target.name, newValue: event.target.value, index: ownprops.index})
    },
    handleDeletePrizePoolInputModify: () => {
        dispatch({type: "DELETE_PRIZE_POOL_INPUT_MODIFY", index: ownprops.index});
    },
})}

export default connect(mapStateToProps, mapDispatchToProps)(PrizePoolInput);
