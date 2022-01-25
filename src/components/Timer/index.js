import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import dateFormat from "dateformat";
import { i18n } from '../../utils/dateformat';
import {
    Play,
    Pause,
    RotateCcw,
    Rewind,
    FastForward,
    SkipBack,
    SkipForward,
} from 'react-feather';
import './timer.scss'


const Timer = ({
    minute,
    seconde,
    stage,
    isLaunch,
    handleLaunchTimer,
    handleResetTimer,
    handlePreviousStage,
    handleNextStage,
    handleSkipBack,
    handleSkipForward,
    handleStopTimer,
    timeHour,
    timeMinute,
    chips,
    tournament,
    previousSB,
    previousBB,
    smallBlind,
    bigBlind,
    nextSB,
    nextBB,
    rebuyHour,
    rebuyMinute,
    prizePool,
}) => {

    const currentTime = timeHour + " : " + timeMinute;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "REFRESH_TIME" });
    }, [])

    return (
        <div className="timer">
            <div className="timer__header">
                <h2 className="timer__header__title">{tournament.name}</h2>
                <span className="timer__header__date">{dateFormat(tournament.date, 'dd mmmm yyyy')}</span>
                <span className="timer__header__time">{currentTime}</span>
            </div>
            <div className="timer__main">
                <div className="timer__main__prizepool">
                    <h2 className="timer__main__prizepool__title">Prize Pool</h2>
                    <ul className="timer__main__prizepool__container">
                        {/* BOUCLE SUR PRIZE POOL */}
                        <li className="timer__main__prizepool__container__element">
                            <div className="timer__main__prizepool__container__element__name">Total :</div>
                            <div className="timer__main__prizepool__container__element__value"> 120€</div>
                        </li>
                        {prizePool.map((price, i) => (
                            <li className="timer__main__prizepool__container__element" key={price.position+price.amount}>
                                <div className="timer__main__prizepool__container__element__name">{i === 0 ? `${price.position}er :` : `${price.position}ème :`}</div>
                                <div className="timer__main__prizepool__container__element__value">{price.amount + " €"}</div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="timer__main__timer">
                    <div onClick={handleResetTimer} className="timer__main__timer__reset"><RotateCcw size={50} className="timer__icon" /></div>
                    <div className="timer__main__timer__stage">
                        <div onClick={handlePreviousStage} className="timer__main__timer__stage__previous"><SkipBack size={50} className="timer__icon" /></div>
                        <div className="timer__main__timer__stage__text">{`Étape ${stage}`}</div>
                        <div onClick={handleNextStage} className="timer__main__timer__stage__next"><SkipForward size={50} className="timer__icon" /></div>
                    </div>
                    <div className="timer__main__timer__numbers">
                        <div className="timer__main__timer__numbers__minute">
                            {minute < 10 ? "0" + minute : minute}
                        </div>
                        <div className="timer__main__timer__numbers__separator">
                            :
                        </div>
                        <div className="timer__main__timer__numbers__seconde">
                            {seconde < 10 && seconde >= 0 ? "0" + seconde : seconde}
                        </div>
                    </div>
                    <div className="timer__main__timer__navigation">
                        <div onClick={handleSkipBack} className={isLaunch ? "invisible" : "timer__main__timer__navigation__previous"}><Rewind size={50} className="timer__icon" /></div>
                        {
                            isLaunch ?
                                <div onClick={handleStopTimer} className="timer__main__timer__navigation__play"><Pause size={80} className="timer__icon" /></div>
                                :
                                <div onClick={handleLaunchTimer} className="timer__main__timer__navigation__play"><Play size={80} className="timer__icon" /></div>
                        }
                        <div onClick={handleSkipForward} className={isLaunch ? "invisible" : "timer__main__timer__navigation__next"}><FastForward size={50} className="timer__icon" /></div>
                    </div>
                </div>
                <div className="timer__main__info">
                    <h2 className="timer__main__info__title">Infos du tournoi</h2>
                    <div className="timer__main__info__container">
                        <div className="timer__main__info__container__element">
                            <div className="timer__main__info__container__element__name">Jetons total :</div>
                            <div className="timer__main__info__container__element__value">{tournament.startingStack * tournament.nbPlayer}</div>
                        </div>
                        <div className="timer__main__info__container__element">
                            <div className="timer__main__info__container__element__name">Tapis de départ :</div>
                            <div className="timer__main__info__container__element__value">{tournament.startingStack}</div>
                        </div>
                        <div className="timer__main__info__container__element">
                            <div className="timer__main__info__container__element__name">Nombre de joueurs :</div>
                            <div className="timer__main__info__container__element__value">{tournament.nbPlayer}</div>
                        </div>
                        <div className="timer__main__info__container__element">
                            <div className="timer__main__info__container__element__name">Durée re-buy :</div>
                            <div className="timer__main__info__container__element__value">{"0" + rebuyHour + "H" + (rebuyMinute > 9 ? rebuyMinute : "0" + rebuyMinute)}</div>
                        </div>
                        <div className="timer__main__info__container__element">
                            <div className="timer__main__info__container__element__name">Buy-in :</div>
                            <div className="timer__main__info__container__element__value">{tournament.buyIn + " €"}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="timer__blinds">
                <div className="timer__blinds__previous">
                    <span className="timer__blinds__previous__text">précédentes</span>
                    <span className="timer__blinds__previous__numbers">{previousSB ? previousSB : "-"} / {previousBB ? previousBB : "-"}</span>
                </div>
                <div className="timer__blinds__actual">
                    <span className="timer__blinds__actual__text">Blinds</span>
                    <span className="timer__blinds__actual__numbers">{smallBlind ? smallBlind : "-"} / {bigBlind ? bigBlind : "-"}</span>
                </div>
                <div className="timer__blinds__next">
                    <span className="timer__blinds__next__text">suivantes</span>
                    <span className="timer__blinds__next__numbers">{nextSB ? nextSB : "-"} / {nextBB ? nextBB : "-"}</span>
                </div>
            </div>
            <div className="timer__footer">
                {chips.map(chip => (
                    <div className="timer__footer__chip">
                        <svg className="timer__footer__chip__img" fill={chip.color} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 296.477 296.477" style={{ enableBackground: 'new 0 0 296.477 296.477' }} xmlSpace="preserve">
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
                        </svg>
                        <div className="timer__footer__chip__value">{chip.value}</div>
                    </div>
                ))}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    timeHour: state.timer.currentTime.hour,
    timeMinute: state.timer.currentTime.minute,
    chips: state.timer.currentChips,
    tournament: state.timer.currentTournament,
    stage: state.timer.currentValues.stage,
    minute: state.timer.currentValues.minute,
    seconde: state.timer.currentValues.seconde,
    previousSB: state.timer.currentValues.previousSB,
    previousBB: state.timer.currentValues.previousBB,
    smallBlind: state.timer.currentValues.smallBlind,
    bigBlind: state.timer.currentValues.bigBlind,
    nextSB: state.timer.currentValues.nextSB,
    nextBB: state.timer.currentValues.nextBB,
    isLaunch: state.timer.isLaunch,
    rebuyHour: state.timer.currentValues.rebuyHour,
    rebuyMinute: state.timer.currentValues.rebuyMinute,
    prizePool: state.timer.prizePool,
});

const mapDispatchToProps = (dispatch) => ({
    handleLaunchTimer: () => {
        dispatch({ type: "LAUNCH_TIMER" });
    },
    handleStopTimer: () => {
        setTimeout(() => {
            dispatch({ type: "STOP_TIMER" });
        }, 1000)
    },
    handleResetTimer: () => {
        dispatch({ type: "RESET_TIMER" });
    },
    handlePreviousStage: () => {
        dispatch({ type: "GO_TO_PREVIOUS_STAGE" });
    },
    handleNextStage: () => {
        dispatch({ type: "GO_TO_NEXT_STAGE" });
    },
    handleSkipBack: () => {
        dispatch({ type: "SKIP_BACK" });
    },
    handleSkipForward: () => {
        dispatch({ type: "SKIP_FORWARD" });;
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);