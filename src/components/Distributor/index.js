import React from 'react';
import { connect } from 'react-redux';

//style
import './distributor.scss';

//components
import DistributorChipElement from './DistributorChipElement';
import DistributorResultElement from './DistributorResultElement';
import Footer from 'components/Footer';
import Header from 'components/Header';

const Distributor = ({
    handleAddChip,
    chips,
    isResult,
    handleChangeTournamentInfos,
    startingStack,
    nbPlayer,
    result,
    handleImportChips,
    handleCalculateDistribution,
    handleResetDistributor,
}) => {

    let children = [];

    for (let i = 0; i < chips.length; i++) {
        children.push(<DistributorChipElement key={i} index={i} />)
    }

    return (
        <div className="distributor">
            <Header />

            <main className="distributor__body">
                    <form className={!isResult ? "distributor__body__form" : "distributor__body__form invisible" } onSubmit={handleCalculateDistribution}>            
                        <h2 className="distributor__body__title">Répartiteur de jetons</h2>
                        <button onClick={handleImportChips} type="button" className="distributor__body__importChips">Importer mes jetons</button>
                        <div className="distributor__body__form__chips">
                            {
                                children.map(chip => chip)
                            }
                            {
                            chips.length === 0 ?
                            <p className="distributor__body__form__chips__text">
                                Virtualisez vos jetons en cliquant sur le bouton "ajouter un jeton" puis définissez sa couleur, sa valeur et la quantité que vous possédez pour chaque jeton.
                                <br />
                                <br />
                                Lorsque vous avez terminé, cliquez sur le bouton "Calculer" pour obtenir la répartition.
                                <br />
                                <br />
                                Vous pouvez directement importer vos jetons si vous les avez déjà virtualisés.
                            </p>
                            :
                            null
                        }
                        </div>

                        <button onClick={handleAddChip} className="distributor__body__form__addChip">Ajouter un jeton</button>

                        <div className="distributor__body__form__tournamentInfos">
                            <div className="distributor__body__form__tournamentInfos__element">
                                <label className="distributor__body__form__tournamentInfos__element__label">Joueurs</label>
                                <input onChange={handleChangeTournamentInfos} value={nbPlayer} type="number" name="nbPlayer" className="distributor__body__form__tournamentInfos__element__input" min={0} onWheel={(e) => e.target.blur()} required/>
                            </div>
                            <div className="distributor__body__form__tournamentInfos__element">
                                <label className="distributor__body__form__tournamentInfos__element__label">Tapis de départ</label>
                                <input onChange={handleChangeTournamentInfos} value={startingStack} type="number" name="startingStack" className="distributor__body__form__tournamentInfos__element__input" min={0} onWheel={(e) => e.target.blur()} required/>
                            </div>
                        </div >

                        <button type="submit" className="distributor__body__form__calculate">Calculer</button>
                    </form>

                    {
                    isResult &&
                    <div className="distributor__body__result">
                            <h2 className="distributor__body__result__title">Résultat</h2>
                            {!result.error && <p className="distributor__body__result__text">Jetons à distribuer à chaque joueur</p>}

                            <div className="distributor__body__result__chips">
                                {!result.error
                                    ?
                                    result.map((chip, i) => <DistributorResultElement key={i} chipColor={chip.color} quantity={chip.quantity} />)
                                    :
                                    <>
                                        <h3 className="distributor__body__result__chips__errorTitle">CALCUL IMPOSSIBLE</h3>
                                        <p className="distributor__body__result__chips__error">{result.error}</p>
                                    </>
                                }
                            </div>
                            <button onClick={handleResetDistributor} className="distributor__body__result__button">Retourner au formulaire</button>
                    </div>
                    }
            </main>
            <Footer />
        </div>
    )
}

// Distributor.propTypes = {
//     nbChips: PropTypes.number.isRequired,
//     handleAddChip: PropTypes.func.isRequired,
//     chips: PropTypes.arrayOf(PropTypes.shape({
//         color: PropTypes.string.isRequired,
//         value: PropTypes.number.isRequired,
//         number: PropTypes.number.isRequired
//     }).isRequired).isRequired,
// }

const mapStateToProps = (state) => ({
    chips: state.distributor.chips,
    isResult: state.distributor.isResult,
    startingStack: state.distributor.startingStack,
    nbPlayer: state.distributor.nbPlayer,
    result: state.distributor.result,
})

const mapDispatchToProps = (dispatch, ownprops) => ({
    handleAddChip: (event) => {
        event.preventDefault()
        dispatch({ type: "ADD_CHIP" });
    },
    handleLaunchDistributor: (event) => {
        event.preventDefault()
        dispatch({ type: "LAUNCH_DISTRIBUTOR" });
    },
    handleChangeTournamentInfos: (event) => {
        dispatch({ type: "CHANGE_TOURNAMENT_INFOS", newValue: event.target.value, inputName: event.target.name });
    },
    handleImportChips: (event) => {
        event.preventDefault();
        dispatch({ type: "IMPORT_CHIPS" });
    },
    handleCalculateDistribution: (event) => {
        event.preventDefault();
        dispatch({type: "CALCULATE_DISTRIBUTION"});
    },
    handleResetDistributor: () => {
        dispatch({type: "RESET_DISTRIBUTOR"});
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Distributor);

