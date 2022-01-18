const initialState = {

	connection: {
		isConnectionModalOpen: false,
		isUnauthorizedModalOpen: false,
		isLogged: false,
		email: '',
		password: '',
		errorMessage: '',
		isFirstConnection: false,
	},
	registration: {
		isRegistrationModalOpen: false,
		username: '',
		email: '',
		emailConfirm: '',
		password: '',
		passwordConfirm: '',
		errorMessage: '',
		isConfirmationModalOpen: false,
		passwordVisibility: false,
	},
	forgotPassword: {
		email: '',
		errorMessage: '',
		isMailSent: false,
	},
	resetPassword: {
		password: '',
		passwordConfirm: '',
		errorMessage: '',
		isPasswordReset: false,
	},
	profile: {
		modifying: false,
		username: "",
		email: "",
		password: "",
		passwordConfirm: "",
		showDeleteAccountModal: false,
		errorMessage: "",
	}



}

const reducer = (state = initialState, action = {}) => {
	switch (action.type) {

		case "CLOSE_MODALS":
			return {
				...state,
				connection: {
					...state.connection,
					isConnectionModalOpen: false,
					isUnauthorizedModalOpen: false,
					email: '',
					password: '',
					errorMessage: '',
				},
				registration: {
					...state.registration,
					isRegistrationModalOpen: false,
					isConfirmationModalOpen: false,
					username: '',
					email: '',
					emailConfirm: '',
					password: '',
					passwordConfirm: '',
					errorMessage: '',
					passwordVisibility: false,
				}
			}

		case "OPEN_CONNECTION_MODAL":
			return {
				...state,
				connection: {
					...state.connection,
					isConnectionModalOpen: true,
				}
			}

		case "OPEN_UNAUTHORIZED_MODAL":
			return {
				...state,
				connection: {
					...state.connection,
					isUnauthorizedModalOpen: true,
				}
			}

		case "CHANGE_CONNECTION_INPUTS":
			return {
				...state,
				connection: {
					...state.connection,
					[action.inputName]: action.newValue,
				}
			}

		case "OPEN_REGISTRATION_MODAL":
			return {
				...state,
				registration: {
					...state.registration,
					isRegistrationModalOpen: true,
				}
			}

		case "CHANGE_REGISTRATION_INPUTS":
			return {
				...state,
				registration: {
					...state.registration,
					[action.inputName]: action.newValue,
				}
			}

		case "LOG_IN_SUCCESS":
			return {
				...state,
				connection: {
					...state.connection,
					isLogged: true,
					errorMessage: '',
					isFirstConnection: false,
				}
			}
		case "LOG_OUT":
			localStorage.clear();
			return{
				...state,
				connection: {
					...state.connection,
					isLogged: false,
				}
			}
		case "LOG_IN_FAILED":
			return{
				...state,
				connection: {
					...state.connection,
					errorMessage: action.message,
				}
			}
		case "REGISTRATION_FAILED":
			return{
				...state,
				registration: {
					...state.registration,
					errorMessage: action.message,
				}
			}
		
		case "OPEN_CONFIRMATION_MODAL":
			return{
				...state,
				registration: {
					...state.registration,
					isConfirmationModalOpen: true,
				}
			}

		case "CONFIRM_REGISTRATION__SUCCESS":
			return {
				...state,
				connection: {
					...state.connection,
					isFirstConnection: true,
				}
			}
		case "CHANGE_FORGOT_PASSWORD_INPUT":
			return{
				...state,
				forgotPassword: {
					...state.forgotPassword,
					email: action.newInputValue,
				}
			}
		case "FORGOT_PASSWORD_FAILED":
			return {
				...state,
				forgotPassword: {
					...state.forgotPassword,
					errorMessage: action.message,
					isMailSent: false,
				}
			}
		case "SUBMIT_FORGOT_PASSWORD_FORM_SUCCESS":
			return{
				...state,
				forgotPassword: {
					...state.forgotPassword,
					errorMessage: '',
					isMailSent: true,
				},
				resetPassword: {
					...state.resetPassword,
				}

			}
		case "CHANGE_RESET_PASSWORD_INPUTS":
			return{
				...state,
				resetPassword: {
					...state.resetPassword,
					[action.inputName]: action.newInputValue,
				}
			}
		case "SUBMIT_RESET_PASSWORD_FORM_SUCCESS":
			return{
				...state,
				resetPassword: {
					...state.resetPassword,
					errorMessage: '',
					isPasswordReset: true,
				}
			}
		case "SUBMIT_RESET_PASSWORD_FORM_FAILED":
			return{
				...state,
				resetPassword: {
					...state.resetPassword,
					errorMessage: action.message,
				}
			}
		case "HIDE_RESET_PASSWORD_SUCCESS_MESSAGE":
			return{
				...state,
				resetPassword: {
					...state.resetPassword,
					isPasswordReset: false,
				}
			}
		
		case "TOGGLE_PASSWORD_VISIBILITY":
			return {
				...state,
				registration: {
					...state.registration,
					passwordVisibility: !state.registration.passwordVisibility,
				}
			}

		case "GET_PROFIL_FROM_API_SUCCESS":
			return {
				...state,
				profile: {
					...state.profile,
					username: action.payload.username,
					email: action.payload.email,
					password: ""
				}
			}

		case "MODIFY_PROFIL":
			return {
				...state,
				profile: {
					...state.profile,
					modifying: true,
				}
			}

		case "CHANGE_PROFIL_VALUE":
			return {
				...state,
				profile: {
					...state.profile,
					[action.inputName]: action.newValue,
				}
			}

		default:
			return state;
	}
};

export default reducer;
