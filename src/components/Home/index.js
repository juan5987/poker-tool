import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//components
import Cards from 'components/Cards';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Registration from 'components/Registration';
import Confirmation from 'components/Confirmation';

//style
import './home.scss';



const Home = ({

	isLogged,
	handleOpenRegistrationModal,

}) => {
	return (
		<div className='home'>
			<div className="home__header">
				<Header />
			</div>

			<div className="home__body">
				<h1 className="home__body__title">Gérez facilement vos tournois de poker entre amis</h1>
				<div className="home__cards">
					<Cards />
				</div>
				<div className="home__body__signup">
					{!isLogged && <button
						className="home__body__signup__button"
						onClick={handleOpenRegistrationModal
						}
					>
						S'inscrire
					</button>
					}
				</div>
			</div>

			<div className="home__footer">
				<Footer />
			</div>

			<Registration />
			<Confirmation />
		</div>
	);
};

//proptypes
Home.propTypes = {
	isLogged: PropTypes.bool.isRequired,
	handleOpenRegistrationModal: PropTypes.func.isRequired,
}

//mapStateToProps
const mapStateToProps = (state) => ({
	isLogged: state.user.connection.isLogged,
	isRegistrationModalOpen: state.user.registration.isRegistrationModalOpen,
})

//mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
	handleOpenRegistrationModal: () => {
		dispatch({ type: "OPEN_REGISTRATION_MODAL" })
	}

})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
