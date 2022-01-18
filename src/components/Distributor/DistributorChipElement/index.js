import React from 'react';
import { connect } from 'react-redux';
import { Trash2 } from 'react-feather';
import PropTypes from 'prop-types';

//style
import './distributorChipElement.scss';

const DistributorChipElement = ({
    color,
    value,
    quantity,
    handleDistributorFormInput,
    chipColor,
    handleRemoveChip,
}) => (
    <li className="chipElement">

        <svg className="chipElement__img" fill={chipColor} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 296.477 296.477" style={{ enableBackground: 'new 0 0 296.477 296.477' }} xmlSpace="preserve">
            <g>
                <path d="M244.63,35.621c-21.771-18.635-47.382-29.855-73.767-33.902C121.871-5.797,70.223,11.421,35.622,51.847
		c-53.236,62.198-45.972,155.773,16.226,209.01c21.771,18.634,47.381,29.853,73.766,33.901
		c48.991,7.517,100.641-9.703,135.241-50.13C314.091,182.431,306.826,88.856,244.63,35.621z M273.361,191.241l-45.305-15.618
		c6.102-17.803,6.028-37.107,0.014-54.724l45.257-15.575c3.577,10.453,5.862,21.429,6.74,32.741
		C281.489,156.374,279.152,174.388,273.361,191.241z M275.905,104.058c0-0.003,0-0.005,0-0.008
		C275.905,104.053,275.905,104.055,275.905,104.058z M247.935,61.472l-36.069,31.332c-2.669-3.055-5.579-5.961-8.752-8.677
		c-11.467-9.814-24.81-15.995-38.637-18.692l9.095-46.741c22.33,4.33,43.21,14.294,60.635,29.209
		C239.147,52.131,243.728,56.669,247.935,61.472z M103.251,23.983c6.428-2.315,13.021-4.109,19.71-5.388l9.087,46.843
		c-17.789,3.467-34.584,12.651-47.393,27.341L48.55,61.38C63.334,44.416,82.206,31.568,103.251,23.983z M23.124,105.236
		l45.297,15.617c-6.102,17.803-6.028,37.105-0.015,54.723l-45.295,15.588c-3.562-10.441-5.837-21.4-6.713-32.688
		C14.976,140.151,17.32,122.11,23.124,105.236z M48.467,235.066l36.145-31.395c2.669,3.056,5.58,5.964,8.754,8.68
		c11.466,9.814,24.808,15.993,38.634,18.691l-9.143,46.997c-22.325-4.348-43.185-14.422-60.604-29.333
		C57.288,244.458,52.689,239.898,48.467,235.066z M193.203,272.635c-6.409,2.309-12.986,4.11-19.658,5.403l-9.117-47
		c17.789-3.467,34.585-12.651,47.394-27.342l36.121,31.409C233.154,252.087,214.257,265.047,193.203,272.635z" />
                <circle cx="93.372" cy="53.498" r={8} />
                <circle cx="38.758" cy="148.382" r={8} />
                <circle cx="93.623" cy="243.123" r={8} />
                <circle cx="203.105" cy="242.977" r="8.001" />
                <circle cx="257.717" cy="148.091" r={8} />
                <circle cx="202.853" cy="53.351" r={8} />
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
        </svg>

        <div className="chipElement__field">
            <label className="chipElement__field__label">Couleur</label>
            <input onChange={handleDistributorFormInput} type="color" name="color" className="chipElement__field__inputColor" value={color} required />
        </div>

        <div className="chipElement__field">
            <label className="chipElement__field__label">Valeur</label>
            <input onChange={handleDistributorFormInput} type="number" name="value" className="chipElement__field__inputNumber"
                min={0} onWheel={(e) => e.target.blur()}
                value={value} required />
        </div>

        <div className="chipElement__field">
            <label className="chipElement__field__label">Nombre</label>
            <input onChange={handleDistributorFormInput} type="number" name="quantity" className="chipElement__field__inputNumber"
                min={0} onWheel={(e) => e.target.blur()}
                value={quantity} required />
        </div>
        <Trash2 onClick={handleRemoveChip} className="chipElement__field__logo" />
    </li>
)

DistributorChipElement.propTypes = {
    color: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    handleDistributorFormInput: PropTypes.func.isRequired,
    chipColor: PropTypes.string.isRequired,
    handleRemoveChip: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownprops) => {
    return {
        color: state.distributor.chips[ownprops.index].color,
        value: parseInt(state.distributor.chips[ownprops.index].value, 10),
        quantity: parseInt(state.distributor.chips[ownprops.index].quantity, 10),
        chipColor: state.distributor.chips[ownprops.index].color,
    }
}
const mapDispatchToProps = (dispatch, ownprops) => {
    return {
        handleDistributorFormInput: (event) => {
            dispatch({ type: "CHANGE_DISTRIBUTOR_INPUTS", newValue: event.target.value, inputName: event.target.name, index: ownprops.index })
        },
        handleRemoveChip: (event) => {
            event.preventDefault()
            dispatch({ type: "REMOVE_CHIP", index: ownprops.index })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DistributorChipElement);
