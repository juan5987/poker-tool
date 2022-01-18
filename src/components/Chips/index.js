import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

//style
import './chips.scss';

//components
import ChipsChipElement from './ChipsChipElement';
import Footer from 'components/Footer';
import Header from 'components/Header';

const Chips = ({
    handleAddChipInChips,
    chips,
    handleSaveChips,
    errorMessage,
    successMessage,
}) => {

    const dispatch = useDispatch();
    useEffect(() => {       
        dispatch({type: "GET_CHIPS_FROM_API"}); 
    }, []);

    let children = [];

    for (let i = 0; i < chips.length; i++) {
        children.push(<ChipsChipElement key={i} index={i} />)
    }

    return (
        <div className="distributor">
            <Header />

            <main className="distributor__body">
                <div className="distributor__body__container">
                    <form className={ "distributor__body__form" } onSubmit={handleSaveChips}>            
                        <h2 className="distributor__body__title">Mes jetons</h2>
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
                                Lorsque vous avez terminé, cliquez sur le bouton "Enregistrer" pour sauvegarder vos jetons.
                                <br />
                            </p>
                            :
                            null
                        }
                        </div>

                        <button onClick={handleAddChipInChips} className="distributor__body__form__addChip">Ajouter un jeton</button>
                        <div className="distributor__body__form__infos">
                            <p className="distributor__body__form__infos__paragraph">
                                Les jetons enregistrés dans "mes jetons" pourront être importés dans le répartiteur de jetons.
                            </p>
                        </div>

                        <button type="submit" className="distributor__body__form__calculate">Enregistrer</button>
                        {errorMessage &&
                            <p className="distributor__body__form__errorMessage">{errorMessage}</p>
                        }
                        {successMessage &&
                            <p className="distributor__body__form__successMessage">{successMessage}</p>
                        }
                    </form>
                </div>
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
    chips: state.chip.chips,
    errorMessage: state.chip.errorMessage,
    successMessage: state.chip.successMessage,
})

const mapDispatchToProps = (dispatch) => ({
    handleAddChipInChips: (event) => {
        event.preventDefault()
        dispatch({ type: "ADD_CHIP_CHIPS" });
    },
    handleSaveChips: (event) => {
        event.preventDefault();
        //sauvegarde en BDD
        dispatch({type: "SAVE_CHIPS"})
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Chips);

